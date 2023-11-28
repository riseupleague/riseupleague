import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/User";
import Division from "@/api-helpers/models/Division";

export async function POST(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const {
			playerName,
			email,
			jerseyNumber,
			jerseySize,
			shortSize,
			jerseyName,
			instagram,
			team,
			teamCaptain,
			division,
			season,
			playerId,
		} = await req.json();

		// Check for required input fields
		if (
			!playerName ||
			!email ||
			!jerseyNumber ||
			!jerseySize ||
			!shortSize ||
			!team ||
			!division ||
			!season
		) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const updatedUser = await User.findOne({ email });

		// Create a new player
		const newPlayer = new Player({
			paid: false,
			teamCaptain: teamCaptain,
			playerName,
			jerseyNumber,
			jerseySize,
			shortSize,
			jerseyName,
			instagram,
			season,
			division,
			team,
			user: updatedUser._id,
			averageStats: {
				points: 0,
				rebounds: 0,
				assists: 0,
				blocks: 0,
				steals: 0,
				threesMade: 0,
				twosMade: 0,
				freeThrowsMade: 0,
			},
		});

		await newPlayer.save();

		// Handle the rest of the code based on the existingPlayer
		const updatedTeam = await Team.findById(team);

		// Save the team and user information
		updatedTeam.players = updatedTeam.players.concat(newPlayer._id);
		updatedTeam.teamCaptain = newPlayer._id;
		updatedUser.basketball = updatedUser.basketball.concat(newPlayer._id);

		await updatedTeam.save();
		await updatedUser.save();
		return NextResponse.json({ player: newPlayer }, { status: 201 });
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const {
			playerName,
			email,
			jerseyNumber,
			jerseySize,
			shortSize,
			jerseyName,
			instagram,
			team,
			teamCaptain,
			division,
			season,
			playerId,
			teamId,
			status,
		} = await req.json();

		// Check for required input fields
		if (
			!playerName ||
			!email ||
			!jerseyNumber ||
			!jerseySize ||
			!shortSize ||
			!team ||
			!division ||
			!season
		) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		// Check if there's an existing player to update
		const existingPlayer = await Player.findByIdAndUpdate(
			playerId,
			{
				$set: {
					// Update the fields with the new values
					paid: false,
					teamCaptain: teamCaptain,
					playerName,
					jerseyNumber,
					jerseySize,
					shortSize,
					jerseyName,
					instagram,
					season,
					division,
					team,
					averageStats: {
						points: 0,
						rebounds: 0,
						assists: 0,
						blocks: 0,
						steals: 0,
						threesMade: 0,
						twosMade: 0,
						freeThrowsMade: 0,
					},
				},
			},
			{ new: true } // Return the updated player
		);

		if (status === "joinTeam") {
			if (playerId) {
				// Handle the rest of the code based on the existingPlayer
				const updatedTeam = await Team.findById(team);
				const foundPlayer = updatedTeam.players.find((player: string) => {
					return player.toString() === playerId;
				});

				if (!foundPlayer) {
					updatedTeam.players = updatedTeam.players.concat(playerId);
					const updatedPlayer = await Player.findById(playerId);

					if (updatedPlayer.teamCaptain) {
						await Division.findOneAndUpdate(
							{ teams: teamId },
							{ $pull: { teams: teamId } }
						);
						await Team.findByIdAndDelete(teamId);
						updatedPlayer.teamCaptain = false;
					}

					await updatedPlayer.save();
				}
				await updatedTeam.save();
			}
		} else if (status === "createTeam") {
			if (playerId !== "") {
				// Handle the rest of the code based on the existingPlayer
				const updatedTeam = await Team.findById(team);
				// Update all teams in the division to remove the playerId from the players array
				await Team.updateMany({ division }, { $pull: { players: playerId } });

				updatedTeam.players = updatedTeam.players.concat(playerId);
				await updatedTeam.save();
			}
		}

		return NextResponse.json({ player: existingPlayer }, { status: 201 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
