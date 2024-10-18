import Player from "@/api-helpers/models/Player";
import Season from "@/api-helpers/models/Season";
import { connectToDatabase } from "@/api-helpers/utils";
import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
	try {
		// Access the environment variables
		const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
		const token = process.env.TWILIO_AUTH_TOKEN as string;
		const messagingService = process.env.TWILIO_MESSAGING_SERVICE_SID;
		const client = twilio(accountSid, token);

		// Parse the request body to get the optional teamId
		const { teamId } = await req.json();

		// Connect to the database
		await connectToDatabase();

		// Find registered seasons
		const registeredSeason = await Season.find({ register: true });

		// Construct the query, adding teamId conditionally
		const playerQuery = {
			season: { $in: registeredSeason.map((season) => season._id) },
			"paymentStatus.hasPaid": false, // Filter for unpaid players
			"paymentStatus.email": { $ne: "" }, // Filter for non-empty emails
			team: teamId, // This will always be added, whether teamId is undefined or not
		};
		// Find all players in registered seasons who haven't paid
		const allPlayersInRegisterSeason = await Player.find(playerQuery)
			.select("paymentStatus playerName team") // Select paymentStatus, playerName, and team
			.populate({
				path: "team", // Populate the team field
				select: "teamName teamCaptain", // Select only teamName and teamCaptain from the team schema
				populate: {
					path: "teamCaptain", // Populate the teamCaptain reference
					select: "playerName", // Select playerName for the team captain
				},
			});

		console.log(allPlayersInRegisterSeason); // Log the players for debugging

		// Send the message using Twilio

		// Map through the numbers and create an array of promises
		const messagePromises = allPlayersInRegisterSeason.map((player) =>
			client.messages.create({
				body: `${player.playerName}, you were invited by ${player.team.teamCaptain.playerName} to join ${player.team.teamName}. Please register at https://www.riseupleague.com/register/join-team/${player.team._id} to secure your team spot in the division.`,
				from: messagingService, // Using Twilio messaging service SID
				to: player.paymentStatus.phoneNumber, // Sending the message to each number
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
