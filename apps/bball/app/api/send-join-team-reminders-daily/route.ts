import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";
import Season from "@/api-helpers/models/Season";
import { Resend } from "resend";
import { JoinTeamReminderTemplate } from "@/components/emails/join-team-reminder";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		// Connect to the database
		await connectToDatabase();

		// Find registered seasons
		const registeredSeason = await Season.find({ register: true });

		// Find all players in registered seasons who haven't paid
		const allPlayersInRegisterSeason = await Player.find({
			season: { $in: registeredSeason.map((season) => season._id) },
			"paymentStatus.hasPaid": false, // Filter for unpaid players
			"paymentStatus.email": { $ne: "" }, // Filter for non-empty emails
		})
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

		// Send emails and increment reminderCount
		const emailPromises = allPlayersInRegisterSeason.map(async (player) => {
			// Send email using Resend
			await resend.emails.send({
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

			// Increment reminderCount by 1
			player.paymentStatus.reminderCount += 1;
			// Add new attempt date
			const newAttemptDate = new Date(Date.now()); // Current date
			player.paymentStatus.lastAttempt = newAttemptDate;

			// Save the updated player document
			return player.save();
		});

		// Wait for all promises to complete
		const responses = await Promise.all(emailPromises);

		// Return a success response
		return NextResponse.json({ status: 200, responses });
	} catch (error) {
		// Log and return the error
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
