import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
	const { items, formObject } = await req.json();

	const parsedFormObject = JSON.parse(formObject);

	try {
		if (parsedFormObject.payment === "full") {
			const session = await stripe.checkout.sessions.create({
				mode: "payment",
				payment_method_types: ["card"],
				line_items: items ?? [],
				success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
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
				mode: "subscription",
				payment_method_types: ["card"],
				line_items: items ?? [],
				success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
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
