import Stripe from "stripe";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/User";
import Division from "@/api-helpers/models/Division";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import { google } from "googleapis";

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
		return NextResponse.json(
			{
				message: `Webhook Error: ${
					err instanceof Error ? err.message : "Unknown Error"
				}`,
			},
			{ status: 400 }
		);
	}

	// 2. Handle event type (add business logic here)
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;
		const metadata = JSON.parse(session.metadata.formObject);
		console.log(`💰  Payment received!`);

		if (metadata.status === "freeAgent") {
			const updatedUser = await User.findOne({
				email: metadata.email,
			}).populate({
				path: "basketball",
				select: "playerName season freeAgent",
			});

			const freeAgentExist = updatedUser.basketball.find((player) => {
				if (player.season.toString() === metadata.season) {
					return player.freeAgent;
				}
			});
			console.log("freeAgentExist:", freeAgentExist);
			if (!freeAgentExist) {
				let registeredPlayer;
				if (metadata.payment === "four") {
					registeredPlayer = new Player({
						freeAgent: metadata.freeAgent,
						customerId: session.customer,
						season: metadata.season,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				} else {
					registeredPlayer = new Player({
						freeAgent: metadata.freeAgent,
						season: metadata.season,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						jerseyName: metadata.jerseyName,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				}

				await registeredPlayer.save();
				console.log("Registered player:", registeredPlayer);
				// Handle the rest of the code based on the existingPlayer
				updatedUser.basketball = updatedUser.basketball.concat(
					registeredPlayer._id
				);

				await updatedUser.save();

				if (metadata.payment === "four") {
					let schedule = await stripe.subscriptionSchedules.create({
						from_subscription: session.subscription as string,
					});

					const phases = schedule.phases.map((phase) => ({
						start_date: phase.start_date,
						end_date: phase.end_date,
						items: phase.items,
					}));

					const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						[
							...phases.map((phase) => ({
								...phase,
								items: phase.items.map((item) => ({
									price: "price_1OAiUpLNj0EwRSePyJXX2I8C",
									quantity: 1,
								})),
							})),
							{
								items: [
									{
										price: "price_1OAiUpLNj0EwRSePyJXX2I8C",
										quantity: 1,
									} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
								],
								iterations: 5,
							},
						];

					schedule = await stripe.subscriptionSchedules.update(schedule.id, {
						end_behavior: "cancel",
						phases: updatedPhases,
					});
				}
			}
		}

		if (metadata.status === "createTeam" && metadata.teamName !== "") {
			const updatedUser = await User.findOne({ email: metadata.email });
			const selectedDivision = await Division.findById(metadata.division);
			console.log(updatedUser);
			// Update team
			const divisionToJoin = await Division.findOne({
				_id: selectedDivision._id.toString(),
			}).populate({
				path: "teams",
				select: "teamName",
			});
			console.log("divisionToJoin:", divisionToJoin);

			const teamExistInDivision = divisionToJoin.teams.find((team) => {
				return team.teamName === metadata.teamName;
			});
			console.log("teamExistInDivision:", teamExistInDivision);

			if (!teamExistInDivision) {
				const newTeam = new Team({
					teamName: metadata.teamName,
					teamNameShort: metadata.teamNameShort,
					teamCode: metadata.teamCode,
					paid: metadata.paid === true ? true : false,
					wins: 0,
					losses: 0,
					pointDifference: 0,
					averageStats: {
						points: 0,
						rebounds: 0,
						assists: 0,
						blocks: 0,
						steals: 0,
						threesMade: 0,
						twosMade: 0,
						freeThrowsMade: 0,
					},
					division: selectedDivision._id.toString(),
					season: selectedDivision.season.toString(),
				});
				// Save the new player to the database
				const savedTeam = await newTeam.save();
				console.log("Registered team:", savedTeam);

				selectedDivision.teams = selectedDivision.teams.concat(savedTeam._id);
				await selectedDivision.save();
				// Register player
				let registeredPlayer;
				if (metadata.payment === "four") {
					registeredPlayer = new Player({
						customerId: session.customer,
						season: selectedDivision.season.toString(),
						division: selectedDivision._id.toString(),
						team: savedTeam._id,
						teamCaptain: true,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				} else {
					registeredPlayer = new Player({
						season: selectedDivision.season.toString(),
						division: selectedDivision._id.toString(),
						team: savedTeam._id,
						teamCaptain: true,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				}

				await registeredPlayer.save();
				console.log("Registered player:", registeredPlayer);

				const updatedTeam = await Team.findById(savedTeam._id);

				// Save the team and user information
				updatedTeam.players = updatedTeam.players.concat(registeredPlayer._id);
				updatedUser.basketball = updatedUser.basketball.concat(
					registeredPlayer._id
				);

				await updatedTeam.save();
				await updatedUser.save();
				if (metadata.payment === "four") {
					let schedule = await stripe.subscriptionSchedules.create({
						from_subscription: session.subscription as string,
					});

					const phases = schedule.phases.map((phase) => ({
						start_date: phase.start_date,
						end_date: phase.end_date,
						items: phase.items,
					}));

					const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						[
							...phases.map((phase) => ({
								...phase,
								items: phase.items.map((item) => ({
									price:
										selectedDivision.earlyBirdOpen === true
											? selectedDivision.earlyBirdInstalmentId
											: selectedDivision.regularPriceInstalmentId,
									quantity: 1,
								})),
							})),
							{
								items: [
									{
										price:
											selectedDivision.earlyBirdOpen === true
												? selectedDivision.earlyBirdInstalmentId
												: selectedDivision.regularPriceInstalmentId,
										quantity: 1,
									} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
								],
								iterations: 5,
							},
						];

					schedule = await stripe.subscriptionSchedules.update(schedule.id, {
						end_behavior: "cancel",
						phases: updatedPhases,
					});
				}
			}
		}

		if (metadata.status === "joinTeam") {
			const updatedUser = await User.findOne({ email: metadata.email });
			const selectedDivision = await Division.findById(metadata.division);

			// Register player
			let registeredPlayer;

			const teamToJoin = await Team.findOne({
				_id: metadata.team,
			}).populate({
				path: "players",
				select: "user",
			});

			console.log("teamToJoin:", teamToJoin);

			const playerExistInTeam = teamToJoin.players.find((player) => {
				console.log(player.user.toString(), updatedUser._id.toString());
				return player.user.toString() === updatedUser._id.toString();
			});
			console.log("playerExistInTeam:", playerExistInTeam);

			if (!playerExistInTeam) {
				if (metadata.payment === "four") {
					registeredPlayer = new Player({
						customerId: session.customer,
						season: selectedDivision.season.toString(),
						division: selectedDivision._id.toString(),
						team: metadata.team,
						teamCaptain: false,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				} else {
					registeredPlayer = new Player({
						season: selectedDivision.season.toString(),
						division: selectedDivision._id.toString(),
						team: metadata.team,
						teamCaptain: false,
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
				}

				await registeredPlayer.save();
				console.log("Registered player:", registeredPlayer);
				// Handle the rest of the code based on the existingPlayer
				const updatedTeam = await Team.findById(metadata.team);

				// Save the team and user information
				updatedTeam.players = updatedTeam.players.concat(registeredPlayer._id);
				updatedUser.basketball = updatedUser.basketball.concat(
					registeredPlayer._id
				);

				await updatedTeam.save();
				await updatedUser.save();

				if (metadata.payment === "four") {
					let schedule = await stripe.subscriptionSchedules.create({
						from_subscription: session.subscription as string,
					});

					const phases = schedule.phases.map((phase) => ({
						start_date: phase.start_date,
						end_date: phase.end_date,
						items: phase.items,
					}));

					const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						[
							...phases.map((phase) => ({
								...phase,
								items: phase.items.map((item) => ({
									price:
										selectedDivision.earlyBirdOpen === true
											? selectedDivision.earlyBirdInstalmentId
											: selectedDivision.regularPriceInstalmentId,
									quantity: 1,
								})),
							})),
							{
								items: [
									{
										price:
											selectedDivision.earlyBirdOpen === true
												? selectedDivision.earlyBirdInstalmentId
												: selectedDivision.regularPriceInstalmentId,
										quantity: 1,
									} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
								],
								iterations: 5,
							},
						];

					schedule = await stripe.subscriptionSchedules.update(schedule.id, {
						end_behavior: "cancel",
						phases: updatedPhases,
					});
				}
			}
		}

		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: process.env.CLIENT_EMAIL,
				client_id: process.env.CLIENT_ID,
				private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace \\n with actual line breaks
			},
			scopes: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/drive.file",
				"https://www.googleapis.com/auth/spreadsheets",
			],
		});

		const sheets = google.sheets({
			auth,
			version: "v4",
		});

		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: "1uFrrYeBPut9A0_6zvC90YJm22FRBXAuL_pG64bJmymU",
			range: "Sheet4!A2:I", // Assuming 5 columns are required for the form data
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [
					[
						metadata.teamName,
						metadata.playerName,
						metadata.instagram,
						metadata.phoneNumber,
						metadata.email,
						metadata.divisionName,
						metadata.status,
						metadata.payment === "four" ? "Yes" : "No",
					],
				],
			},
		});
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
	return NextResponse.json({ received: true });
}
