import { EmailTemplate } from "@/components/emails/email-template";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

		const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
			customer: "cus_QkXYN3XCc8eIPv",
		});

		console.log("upcomingInvoice:", upcomingInvoice);
		return NextResponse.json({ status: 200, upcomingInvoice });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
