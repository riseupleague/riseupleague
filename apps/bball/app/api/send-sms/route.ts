import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
	try {
		// Access the environment variables
		const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
		const token = process.env.TWILIO_AUTH_TOKEN as string;
		const messagingService = process.env.TWILIO_MESSAGING_SERVICE_SID;
		const client = twilio(accountSid, token);

		// Parse the request body (Assuming JSON request body)
		// const body = await req.json();
		// const { phone, message } = body;

		// Send the message using Twilio

		const numbers = ["2899462224"];

		// Create the message body and other details
		const messageBody =
			"John, you were invited by Daniel to join Billiard Boys. Please register at https://www.riseupleague.com/register/join-team/66fc5f2a39c95a6b3b54136d to secure your team spot in the division.";

		// Map through the numbers and create an array of promises
		const messagePromises = numbers.map((number) =>
			client.messages.create({
				body: messageBody,
				from: messagingService, // Using Twilio messaging service SID
				to: number, // Sending the message to each number
			})
		);

		const responses = await Promise.all(messagePromises);

		// Return success response with all the message SIDs
		return NextResponse.json({
			success: true,
			messageSids: responses, // Array of message SIDs
		});
	} catch (error) {
		console.error("Error sending message:", error);
		// Return error response
		return NextResponse.json({ success: false, error }, { status: 500 });
	}
}
