import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/User";

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
			division,
			season,
		} = await req.json();

		// Check for required input fields

		console.log(
			playerName,
			email,
			jerseyNumber,
			jerseySize,
			shortSize,
			jerseyName,
			instagram,
			team,
			division,
			season
		);

		if (
			!playerName ||
			!email ||
			jerseyNumber.trim() === "" ||
			!jerseySize ||
			!shortSize ||
			!team ||
			!division ||
			!season
		) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const updatedUser = await User.findOne({ email });

		const newPlayer = new Player({
			paid: false,
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

		const updatedTeam = await Team.findById(team);

		// Save the new team to the database
		const savedPlayer = await newPlayer.save();
		updatedTeam.players = updatedTeam.players.concat(savedPlayer._id);
		updatedUser.basketball = updatedUser.basketball.concat(savedPlayer._id);

		await updatedTeam.save();
		return NextResponse.json({ player: savedPlayer }, { status: 201 });
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
