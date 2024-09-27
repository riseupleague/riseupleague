import { EmailTemplate } from "@/components/emails/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const emails = ["jdbalora@gmail.com"];

		const emailPromises = Array.from(new Set(emails)).map((recipientEmail) => {
			return resend.emails.send({
				from: "RISEUP <noreply@riseupleague.com>",
				to: recipientEmail,
				reply_to: "support@riseupleague.com",
				subject: "Hello world",
				react: EmailTemplate({ firstName: "John", status: "welcome" }),
			});
		});

		const responses = await Promise.all(emailPromises);

		return NextResponse.json({ status: 200, responses });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
