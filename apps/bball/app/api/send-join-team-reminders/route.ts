import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";
import Season from "@/api-helpers/models/Season";
import { Resend } from "resend";
import { JoinTeamReminderTemplate } from "@/components/emails/join-team-reminder";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		// Access the environment variables for Twilio
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
			.select("paymentStatus playerName team")
			.populate({
				path: "team",
				select: "teamName teamCaptain",
				populate: {
					path: "teamCaptain",
					select: "playerName",
				},
			});

		console.log(allPlayersInRegisterSeason); // Log the players for debugging

		// Combine email and SMS sending in parallel
		const communicationPromises = allPlayersInRegisterSeason.map(
			async (player) => {
				// Send email using Resend
				const emailPromise = resend.emails.send({
					from: "Rise Up League <support@riseupleague.com>",
					to: player.paymentStatus.email,
					reply_to: "support@riseupleague.com",
					subject: `${player.team.teamName} Invitation!`,
					react: JoinTeamReminderTemplate({
						playerName: player.playerName,
						teamName: player.team.teamName,
						teamCaptainName: player.team.teamCaptain.playerName,
						reminderCount: player.paymentStatus.reminderCount,
						teamId: player.team._id,
					}),
				});

				// Send SMS using Twilio
				const smsPromise = client.messages.create({
					body: `${player.playerName}, you were invited by ${player.team.teamCaptain.playerName} to join ${player.team.teamName}. Please register at https://www.riseupleague.com/register/join-team/${player.team._id} to secure your team spot in the division.`,
					from: messagingService,
					to: player.paymentStatus.phoneNumber,
				});

				// Increment reminderCount by 1
				player.paymentStatus.reminderCount += 1;
				// Add new attempt date
				player.paymentStatus.lastAttempt = new Date(Date.now());

				// Save the updated player document
				const savePromise = player.save();

				// Wait for email, SMS, and player save to complete
				await Promise.all([emailPromise, smsPromise, savePromise]);
			}
		);

		// Wait for all communication promises to complete
		await Promise.all(communicationPromises);

		// Return success response
		return NextResponse.json({
			success: true,
			message: "Emails and SMS messages sent successfully.",
		});
	} catch (error) {
		// Log and return the error
		console.error(error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
