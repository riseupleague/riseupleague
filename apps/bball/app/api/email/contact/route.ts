import { EmailTemplate } from "../../../../components/email/contact-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const data = await resend.emails.send({
			from: "Rise Up Contact Page <onboarding@resend.dev>",
			to: ["nathanjlardizabal@gmail.com"],
			subject: "Rise Up Contact Page Submission",
			react: EmailTemplate({ firstName: "John" }),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
}
