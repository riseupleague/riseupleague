import Stripe from "stripe";
import mongoose from "mongoose";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/Team";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
	await connectToDatabase();

	let event: Stripe.Event;

	try {
		// 1. Retrieve the event by verifying the signature using the raw body and secret
		const body = await req.text();
		// const signature = headers().get("Stripe-Signature") ?? "";
		const signature = req.headers.get("Stripe-Signature");
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET || ""
		);
	} catch (err) {
		return new Response(
			`Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
			{ status: 400 }
		);
	}

	// 2. Handle event type (add business logic here)
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;
		const metadata = JSON.parse(session.metadata.formObject);

		if (metadata.status === "freeAgent") {
			const newPlayer = new Player({
				season: metadata.season,
				status: metadata.status,
				division: metadata.division,
				registrationName: metadata.registrationName,
				birthDate: metadata.birthDate,
				email: metadata.email,
				instagram: metadata.instagram,
				phoneNumber: metadata.phoneNumber,
				position: metadata.position,
				height: metadata.height,
				jerseyOne: metadata.jerseyOne,
				jerseySize: metadata.jerseySize,
				shortSize: metadata.shortSize, // Add this line to include shortSize
			});

			await newPlayer.save();

			if (metadata.payment === "four") {
				let schedule = await stripe.subscriptionSchedules.create({
					from_subscription: session.subscription as string,
				});

				const phases = schedule.phases.map((phase) => ({
					start_date: phase.start_date,
					end_date: phase.end_date,
					items: phase.items,
				}));

				const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] = [
					...phases.map((phase) => ({
						...phase,
						items: phase.items.map((item) => ({
							price: "price_1Nt9mGHl6U3lbfQtazXBOL79",
							quantity: 1,
						})),
					})),
					{
						items: [
							{
								price: "price_1Nt9mGHl6U3lbfQtazXBOL79",
								quantity: 1,
							} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
						],
						iterations: 1,
					},
				];

				schedule = await stripe.subscriptionSchedules.update(schedule.id, {
					end_behavior: "cancel",
					phases: updatedPhases,
				});
			}
		}

		if (metadata.status === "createTeam") {
			// Update player
			const updatedPlayer = await Player.findOneAndUpdate(
				{ _id: metadata.playerId },
				{ $set: { paid: true, customerId: session.customer } }, // Set the 'paid' field to true
				{ new: true } // Return the modified document
			);

			// Update team
			const updatedTeam = await Team.findOneAndUpdate(
				{ _id: metadata.team },
				{ $set: { paid: true } }, // Set the 'paid' field to true
				{ new: true } // Return the modified document
			);

			if (metadata.payment === "four") {
				let schedule = await stripe.subscriptionSchedules.create({
					from_subscription: session.subscription as string,
				});

				const phases = schedule.phases.map((phase) => ({
					start_date: phase.start_date,
					end_date: phase.end_date,
					items: phase.items,
				}));

				const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] = [
					...phases.map((phase) => ({
						...phase,
						items: phase.items.map((item) => ({
							price: metadata.itemPriceId,
							quantity: 1,
						})),
					})),
					{
						items: [
							{
								price: metadata.itemPriceId,
								quantity: 1,
							} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
						],
						iterations: 1,
					},
				];

				schedule = await stripe.subscriptionSchedules.update(schedule.id, {
					end_behavior: "cancel",
					phases: updatedPhases,
				});
			}
		}

		if (metadata.status === "joinTeam") {
			// Update player
			const updatedPlayer = await Player.findOneAndUpdate(
				{ _id: metadata.playerId },
				{ $set: { paid: true, customerId: session.customer } }, // Set the 'paid' field to true
				{ new: true } // Return the modified document
			);

			if (metadata.payment === "four") {
				let schedule = await stripe.subscriptionSchedules.create({
					from_subscription: session.subscription as string,
				});

				const phases = schedule.phases.map((phase) => ({
					start_date: phase.start_date,
					end_date: phase.end_date,
					items: phase.items,
				}));

				const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] = [
					...phases.map((phase) => ({
						...phase,
						items: phase.items.map((item) => ({
							price: metadata.itemPriceId,
							quantity: 1,
						})),
					})),
					{
						items: [
							{
								price: metadata.itemPriceId,
								quantity: 1,
							} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
						],
						iterations: 1,
					},
				];

				schedule = await stripe.subscriptionSchedules.update(schedule.id, {
					end_behavior: "cancel",
					phases: updatedPhases,
				});
			}
		}
	} else if (event.type === "invoice.payment_failed") {
		const session = event.data.object;

		if (session.billing_reason === "subscription_cycle") {
			// // Find the RegisterPlayer based on the customer's email
			// const registeredPlayer = await RegisterPlayer.findOne({
			// 	email: session.customer_email,
			// });
			// // Check if the customer with the same invoice ID exists
			// const existingCustomer = await Customer.findOne({
			// 	invoiceId: session.id,
			// });
			// if (existingCustomer) {
			// 	// Customer with the same invoice ID found, update attempt count
			// 	existingCustomer.attempt_count = session.attempt_count;
			// 	// Save the updated customer data to MongoDB
			// 	try {
			// 		await existingCustomer.save();
			// 		console.log("Customer data updated in MongoDB:", existingCustomer);
			// 	} catch (err) {
			// 		console.error("Error updating customer data:", err);
			// 	}
			// } else {
			// 	const periodEnd = new Date(session.period_end * 1000); // Convert timestamp to milliseconds
			// 	const periodStart = new Date(session.period_start * 1000); // Convert timestamp to milliseconds
			// 	// Create a new Customer document
			// 	const newCustomer = new Customer({
			// 		customerId: session.customer,
			// 		customerName: registeredPlayer
			// 			? registeredPlayer.registrationName
			// 			: session.customer_name,
			// 		customerEmail: session.customer_email,
			// 		invoiceId: session.id,
			// 		invoiceAmountDue: session.amount_due,
			// 		invoiceStatus: session.status,
			// 		paymentFailedTimestamp: new Date(),
			// 		instagram: registeredPlayer ? registeredPlayer.instagram : "",
			// 		phoneNumber: registeredPlayer ? registeredPlayer.phoneNumber : "",
			// 		division: registeredPlayer ? registeredPlayer.division : "",
			// 		hosted_invoice_url: session.hosted_invoice_url,
			// 		period_end: `${
			// 			periodEnd.getMonth() + 1
			// 		}/${periodEnd.getDate()}/${periodEnd.getFullYear()}`,
			// 		period_start: `${
			// 			periodStart.getMonth() + 1
			// 		}/${periodStart.getDate()}/${periodStart.getFullYear()}`,
			// 		attempt_count: session.attempt_count, // Add attempt_count field
			// 	});
			// 	// Save the customer data to MongoDB
			// 	try {
			// 		await newCustomer.save();
			// 		console.log("Customer data saved to MongoDB:", newCustomer);
			// 	} catch (err) {
			// 		console.error("Error saving customer data:", err);
			// 	}
			// }
		}
	} else if (event.type === "invoice.payment_succeeded") {
		// console.log("✅ invoice.payment_succeeded:", event.id);
		// const session = event.data.object;
		// console.log(`💰 Payment succeeded!`);
		// // Find and delete the customer by customerId
		// try {
		// 	const deletedCustomer = await Customer.findOneAndDelete({
		// 		customerId: session.customer,
		// 	});
		// 	if (deletedCustomer) {
		// 		console.log("Customer deleted from MongoDB:", deletedCustomer);
		// 	} else {
		// 		console.log("Customer not found in MongoDB.");
		// 	}
		// } catch (err) {
		// 	console.error("Error deleting customer data:", err);
		// }
	} else {
		console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
	}

	// 3. Return a response to acknowledge receipt of the event.
	NextResponse.json({ received: true });
}
