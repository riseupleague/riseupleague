import { NextResponse } from "next/server";

import { connectToDatabase } from "@/api-helpers/utils";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Game from "@/api-helpers/models/Game";

export async function PATCH(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { teamId, divisionId, addedGames, otherTeamsCount } =
			await req.json();

		// Check for required input fields
		if (
			!teamId ||
			!divisionId ||
			!addedGames ||
			otherTeamsCount === undefined ||
			otherTeamsCount === null
		) {
			console.log("Invalid Inputs:", {
				teamId,
				divisionId,
				addedGames,
				otherTeamsCount,
			});
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const updatedDivision = await Division.findById(divisionId);

		if (otherTeamsCount !== updatedDivision.teamsWithSchedule.length) {
			const teamAddedFirstString =
				updatedDivision.teamsWithSchedule[
					updatedDivision.teamsWithSchedule.length - 1
				].toString();

			const teamAddedFirst = await Team.findById(teamAddedFirstString)
				.populate({
					path: "division",
					populate: {
						path: "games",
						populate: [
							{
								path: "homeTeam",
								select:
									"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
							},
							{
								path: "awayTeam",
								select:
									"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
							},
						],
						select:
							"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore location week time",
					},
				})
				.populate({
					path: "division",
					populate: {
						path: "teamsWithSchedule",
						select: "teamName teamNameShort",
					},
				})
				.select("division");

			return NextResponse.json(
				{ teamAddedFirst: teamAddedFirst, updated: false },
				{ status: 200 }
			);
		} else {
			const gamesToAdd = [];
			const updatedTeam = await Team.findById(teamId);
			const updatedDivision = await Division.findById(divisionId);

			// Find the game by ID and update home or away property
			for (let i = 0; i < addedGames.length; i++) {
				const game = await Game.findById(addedGames[i].index);
				if (!game.homeTeam) {
					game.homeTeam = teamId;
					game.gameName = `${updatedTeam.teamName} vs. Away Team`;
				} else {
					game.awayTeam = teamId;
					game.gameName = `${game.gameName?.split("vs.")[0]}vs. ${
						updatedTeam.teamName
					}`;
				}
				await game.save();

				gamesToAdd.push(game);
			}

			updatedTeam.games = gamesToAdd;
			await updatedTeam.save();

			updatedDivision.teamsWithSchedule =
				updatedDivision.teamsWithSchedule.concat(updatedTeam._id);
			await updatedDivision.save();

			if (!updatedTeam) {
				console.log("Team not found");
				return NextResponse.json(
					{ message: "Team not found" },
					{ status: 404 }
				);
			}
			return NextResponse.json({ updated: true }, { status: 200 });
		}
	} catch (error) {
		console.error("Error during team update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
