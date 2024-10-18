import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { connectToDatabase } from "@/api-helpers/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe checkout session for a full payment or subscription based on the provided form data.
 *
 * @param {Request} req - The incoming request object containing the form data.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the created session or an error response.
 */
export async function POST(req: Request) {
	await connectToDatabase();

	const { items, formObject } = await req.json();
	const parsedFormObject = JSON.parse(formObject);
	// const testClock = await stripe.testHelpers.testClocks.create({
	// 	frozen_time: Math.floor(new Date().getTime() / 1000), // Correctly get the time in seconds
	// });
	// const customer = await stripe.customers.create({
	// 	test_clock: testClock.id,
	// 	address: {
	// 		line1: "51 Ebby Avenue",
	// 		city: "Brampton",
	// 		state: "Ontario",
	// 		postal_code: "L6Z 3T7",
	// 		country: "CA",
	// 	},
	// });
	try {
		if (parsedFormObject.payment === "full") {
			let coupon;
			if (parsedFormObject.status === "createTeam") {
				coupon = await stripe.coupons.create({
					percent_off: 50, // 50%
					currency: "cad", // Set the currency to CAD
					duration: "once", // Applies only to the first payment
				});

				const session = await stripe.checkout.sessions.create({
					mode: "payment",
					payment_method_types: ["card"],
					line_items: items ?? [],
					success_url:
						parsedFormObject.status === "tournament"
							? `${process.env.NEXT_PUBLIC_API_BASE_URL}success/tournament/${parsedFormObject.division}`
							: `${process.env.NEXT_PUBLIC_API_BASE_URL}success/${parsedFormObject.division}`,
					cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}register`,
					automatic_tax: {
						enabled: true,
					},
					discounts: [{ coupon: coupon.id }], // Apply the 50% coupon
					metadata: {
						formObject,
					},
				});

				return NextResponse.json({ session }, { status: 200 });
			} else {
				const session = await stripe.checkout.sessions.create({
					mode: "payment",
					payment_method_types: ["card"],
					line_items: items ?? [],
					success_url:
						parsedFormObject.status === "tournament"
							? `${process.env.NEXT_PUBLIC_API_BASE_URL}success/tournament/${parsedFormObject.division}`
							: `${process.env.NEXT_PUBLIC_API_BASE_URL}success/${parsedFormObject.division}`,
					cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}register`,
					automatic_tax: {
						enabled: true,
					},
					metadata: {
						formObject,
					},
				});

				return NextResponse.json({ session }, { status: 200 });
			}
		} else {
			const session = await stripe.checkout.sessions.create({
				// customer: customer.id,
				mode: "subscription",
				payment_method_types: ["card"],
				line_items: items ?? [],
				success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}success/${parsedFormObject.division}`,
				cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}register`,
				automatic_tax: {
					enabled: true,
				},
				metadata: {
					formObject,
				},
			});
			return NextResponse.json({ session }, { status: 200 });
		}
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
