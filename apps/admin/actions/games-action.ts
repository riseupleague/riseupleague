"use server";

import Division from "@/api-helpers/models/Division";
import Game from "@/api-helpers/models/Game";
import Player from "@/api-helpers/models/Player";
import Season from "@/api-helpers/models/Season";
import Team from "@/api-helpers/models/Team";
import { revalidatePath } from "next/cache";

/**
 * Create a new team for a given season and division.
 *
 * @param {string} seasonId - The ID of the season for the new team.
 * @param {string} divisionId - The ID of the division for the new team.
 * @param {FormData} gameData - The data for the new team.
 * @return {Promise<Object>} An object with a status and a message.
 */

export async function updateUpcomingGame(gameId: string, gameData: FormData) {
	try {
		const currentGame = await Game.findById(gameId);
		if (!currentGame) return { status: 404, message: "No game found." };

		const homeTeamId = gameData.get("homeTeamId");
		const awayTeamId = gameData.get("awayTeamId");
		const date = gameData.get("date");
		const time = gameData.get("time");
		const location = gameData.get("location");
		console.log(homeTeamId, awayTeamId, date, time, location);
		// const oldHomeTeam = await Team.findById(currentGame.homeTeam);

		// if (oldHomeTeam) {
		// 	const newGamesHomeTeam = oldHomeTeam.games.filter((oldGame) => {
		// 		return oldGame._id.toString() !== gameId.toString();
		// 	});
		// 	console.log(newGamesHomeTeam);
		// 	//   oldHomeTeam.games = newGamesHomeTeam;
		// 	//   await oldHomeTeam.save();
		// }
		// const oldAwayTeam = await Team.findById(currentGame.awayTeam);

		// if (oldAwayTeam) {
		// 	const newGamesAwayTeam = oldAwayTeam.games.filter((oldGame) => {
		// 		return oldGame._id.toString() !== gameId.toString();
		// 	});
		// 	console.log(newGamesAwayTeam);

		// 	//   oldAwayTeam.games = newGamesAwayTeam;
		// 	//   await oldAwayTeam.save();
		// }

		revalidatePath(`/`);
		return { status: 200, message: "Successfully updated team." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function updateFinishedGame(gameId: string, gameData: FormData) {
	try {
		const currentGame = await Game.findById(gameId);
		if (!currentGame) return { status: 404, message: "No game found." };

		const homeTeamId = gameData.get("homeTeamId");
		const awayTeamId = gameData.get("awayTeamId");
		const date = gameData.get("date");
		const time = gameData.get("time");
		const location = gameData.get("location");
		console.log(homeTeamId, awayTeamId, date, time, location);
		// const oldHomeTeam = await Team.findById(currentGame.homeTeam);

		// if (oldHomeTeam) {
		// 	const newGamesHomeTeam = oldHomeTeam.games.filter((oldGame) => {
		// 		return oldGame._id.toString() !== gameId.toString();
		// 	});
		// 	console.log(newGamesHomeTeam);
		// 	//   oldHomeTeam.games = newGamesHomeTeam;
		// 	//   await oldHomeTeam.save();
		// }
		// const oldAwayTeam = await Team.findById(currentGame.awayTeam);

		// if (oldAwayTeam) {
		// 	const newGamesAwayTeam = oldAwayTeam.games.filter((oldGame) => {
		// 		return oldGame._id.toString() !== gameId.toString();
		// 	});
		// 	console.log(newGamesAwayTeam);

		// 	//   oldAwayTeam.games = newGamesAwayTeam;
		// 	//   await oldAwayTeam.save();
		// }

		revalidatePath(`/`);
		return { status: 200, message: "Successfully updated team." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function generateGameSchedule(
	divisionId: string,
	seasonId: string,
	gameData: FormData
) {
	try {
		const calculateMatches = (n) => {
			const number = Number(n);
			return (number * (number - 1)) / 2;
		};

		const seasonExists = await Season.findById(seasonId);

		if (!seasonExists) return { status: 404, message: "No season found." };
		const divisionExists = await Division.findById(divisionId);

		if (!divisionExists) return { status: 404, message: "No division found." };
		const teamsTotal = gameData.get("teamsTotal");
		console.log("teamsTotal:", teamsTotal);

		const startTime = gameData.get("startTime")?.toString();

		const location = gameData.get("location");

		if (!teamsTotal) return { status: 404, message: "No teams total found." };

		if (!startTime) return { status: 404, message: "No start time found." };
		if (!location) return { status: 404, message: "No location found." };

		const numberOfMatches = calculateMatches(teamsTotal);
		console.log("numberOfMatches:", numberOfMatches);

		const gamesToAdd = [];

		// Assuming 4 games per week
		const gamesPerWeek = 4;

		for (let i = 0; i < numberOfMatches; i++) {
			// Extract hours and minutes from the input time string
			const [startHours, startMinutes] = startTime.split(":").map(Number);
			let currentHours = startHours;

			// Add 1 hour for each game
			currentHours = (currentHours + (i % gamesPerWeek)) % 24;

			const finalTimeString = `${String(currentHours).padStart(
				2,
				"0"
			)}:${startMinutes}`;

			const game = new Game({
				homeTeamScore: 0,
				awayTeamScore: 0,
				status: false,
				division: divisionExists._id,
				season: seasonExists._id,
				location,
				time: finalTimeString,
				week: Math.floor(i / gamesPerWeek) + 1, // Assign week based on 4 games per week
			});

			gamesToAdd.push(game);
		}

		// Save all the games at once
		const savedGames = await Game.insertMany(gamesToAdd);
		// Update the division with the IDs of the newly added games
		divisionExists.games = divisionExists.games.concat(
			savedGames.map((game) => game._id)
		);
		await divisionExists.save();
		console.log("Games added successfully:", savedGames);

		revalidatePath("/");
		return { status: 200, message: "Successfully generated schedule." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}
