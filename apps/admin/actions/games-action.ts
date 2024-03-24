"use server";

import Division from "@/api-helpers/models/Division";
import Game from "@/api-helpers/models/Game";
import Player from "@/api-helpers/models/Player";
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
