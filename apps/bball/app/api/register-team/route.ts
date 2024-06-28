import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";

/**
 * Handles the POST request for registering a team.
 *
 * @param {Request} req - The request object containing the team data.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * If the request is successful, it returns a JSON response with the saved team data and a status code of 201.
 * If the request is unsuccessful, it returns a JSON response with an error message and a status code of 422 or 500.
 */
export async function POST(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { teamName, teamNameShort, teamCode, division, season } =
			await req.json();

		// Check for required input fields
		if (
			!teamName ||
			teamName.trim() === "" ||
			!teamNameShort ||
			teamNameShort.trim() === "" ||
			!teamCode ||
			teamCode.trim() === "" ||
			!division ||
			!season
		) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const newTeam = new Team({
			paid: false,
			teamName,
			teamNameShort,
			teamCode,
			wins: 0,
			losses: 0,
			pointDifference: 0,
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
			division: division,
			season: season,
		});

		// Save the new player to the database
		const savedTeam = await newTeam.save();

		const updatedDivision = await Division.findById(division);
		updatedDivision.teams = updatedDivision.teams.concat(savedTeam._id);
		await updatedDivision.save();

		return NextResponse.json({ team: savedTeam }, { status: 201 });
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles the PATCH request for updating a team's information based on the provided request.
 *
 * @param {Request} req - The request object containing the team data to be updated.
 * @return {Promise<NextResponse>} A promise that resolves to a JSON response with the updated team data and status codes based on the outcome.
 */
export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const {
			teamName,
			teamNameShort,
			teamCode,
			division,
			season,
			teamId,
			playerId,
		} = await req.json();

		// Check for required input fields
		if (!teamId || !teamName || !teamNameShort || !teamCode) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		// Find the team by ID and update its properties
		const updatedTeam = await Team.findByIdAndUpdate(
			teamId,
			{
				$set: {
					paid: false,
					teamName,
					teamNameShort,
					teamCode,
					wins: 0,
					losses: 0,
					pointDifference: 0,
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
					division: division,
					season: season,
				},
			},
			{ new: true }
		);

		// Handle the rest of the code based on the existingPlayer
		const newTeam = await Team.findById(teamId);

		// Use filter to create a new array excluding the specified playerId
		newTeam.players = newTeam.players.filter((player) => {
			player.toString() !== playerId;
		});

		await newTeam.save();

		if (!updatedTeam) {
			return NextResponse.json({ message: "Team not found" }, { status: 404 });
		}

		return NextResponse.json({ team: updatedTeam }, { status: 200 });
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles the DELETE request for deleting a team based on the provided request.
 *
 * @param {Request} req - The request object containing the team data to be deleted.
 * @return {Promise<NextResponse>} A promise that resolves to a JSON response with the deleted team data and status codes based on the outcome.
 */
export async function DELETE(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { team } = await req.json();

		// Check for required input fields
		if (!team) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const deletedTeam = await Team.findById(team);

		if (!deletedTeam) {
			return NextResponse.json({ message: "Team not found" }, { status: 404 });
		}
		const newDivision = await Division.findOneAndUpdate(
			{ teams: team },
			{ $pull: { teams: team } }
		);

		await Team.findByIdAndDelete(team);

		if (!deletedTeam) {
			return NextResponse.json({ message: "Team not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ team: deletedTeam, division: newDivision },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
