import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import Division from "@/api-helpers/models/Division";
import { connectToDatabase } from "@/api-helpers/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req: Request) {
	await connectToDatabase();

	const { items, formObject } = await req.json();
	const parsedFormObject = JSON.parse(formObject);
	console.log("formObject:", formObject);

	// const testClock = await stripe.testHelpers.testClocks.create({
	// 	frozen_time: Math.floor(Date.now() / 1000),
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
			const session = await stripe.checkout.sessions.create({
				mode: "payment",
				payment_method_types: ["card"],
				line_items: items ?? [],
				success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/success/${parsedFormObject.division}`,
				cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
				automatic_tax: {
					enabled: true,
				},
				metadata: {
					formObject,
				},
			});
			return NextResponse.json({ session }, { status: 200 });
		} else {
			const session = await stripe.checkout.sessions.create({
				// customer: customer.id,
				mode: "subscription",
				payment_method_types: ["card"],
				line_items: items ?? [],
				success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/success/${parsedFormObject.division}`,
				cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
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
