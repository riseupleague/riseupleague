"use server";

import Division from "@/api-helpers/models/Division";
import Game from "@/api-helpers/models/Game";
import Player from "@/api-helpers/models/Player";
import Season from "@/api-helpers/models/Season";
import Team from "@/api-helpers/models/Team";
import { convertToEST } from "@/utils/convertToEST";
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

		const homeTeam = gameData.get("homeTeamId");
		const awayTeam = gameData.get("awayTeamId");
		const date = gameData.get("date");
		const time = gameData.get("time");
		const location = gameData.get("location");
		if (!date) return { status: 404, message: "No date found." };
		if (!time) return { status: 404, message: "No time found." };

		const calculatedDate = new Date(date + "T" + formatTime(time));
		currentGame.date = convertToEST(calculatedDate);
		currentGame.time = time;
		currentGame.location = location;

		const oldHomeTeam = await Team.findById(currentGame.homeTeam);

		if (oldHomeTeam) {
			const newGamesHomeTeam = oldHomeTeam.games.filter((oldGame) => {
				return oldGame._id.toString() !== gameId.toString();
			});
			console.log(newGamesHomeTeam);
			oldHomeTeam.games = newGamesHomeTeam;
			await oldHomeTeam.save();
		}
		const oldAwayTeam = await Team.findById(currentGame.awayTeam);

		if (oldAwayTeam) {
			const newGamesAwayTeam = oldAwayTeam.games.filter((oldGame) => {
				return oldGame._id.toString() !== gameId.toString();
			});
			console.log(newGamesAwayTeam);

			oldAwayTeam.games = newGamesAwayTeam;
			await oldAwayTeam.save();
		}

		let currentHomeTeam, currentAwayTeam;

		if (homeTeam && awayTeam) {
			currentHomeTeam = await Team.findById(homeTeam);
			currentGame.homeTeam = homeTeam;
			currentGame.gameName = `${currentHomeTeam.teamName} vs. Away Team`;
			currentHomeTeam.games = currentHomeTeam.games.concat(currentGame._id);
			await currentHomeTeam.save();
			currentAwayTeam = await Team.findById(awayTeam);
			currentGame.awayTeam = awayTeam;
			currentGame.gameName = `${currentHomeTeam.teamName} vs. ${currentAwayTeam.teamName}`;

			console.log("homeTeam:", currentGame.homeTeam);
			console.log("awayTeam:", currentGame.awayTeam);
			console.log("gameName:", currentGame.gameName);

			currentAwayTeam.games = currentAwayTeam.games.concat(currentGame._id);
			await currentAwayTeam.save();
		} else {
			if (homeTeam && !awayTeam) {
				currentHomeTeam = await Team.findById(homeTeam);
				currentGame.homeTeam = homeTeam;
				currentGame.gameName = `${currentHomeTeam.teamName} vs. Away Team`;
				currentGame.awayTeam = null;

				console.log("homeTeam:", currentGame.homeTeam);
				console.log("awayTeam:", currentGame.awayTeam);
				console.log("gameName:", currentGame.gameName);
				currentHomeTeam.games = currentHomeTeam.games.concat(currentGame._id);
				await currentHomeTeam.save();
			} else if (!homeTeam && awayTeam) {
				currentAwayTeam = await Team.findById(awayTeam);
				currentGame.homeTeam = awayTeam;
				currentGame.gameName = `${currentAwayTeam.teamName} vs. Away Team`;
				currentGame.awayTeam = null;

				console.log("homeTeam:", currentGame.homeTeam);
				console.log("awayTeam:", currentGame.awayTeam);
				console.log("gameName:", currentGame.gameName);
				currentAwayTeam.games = currentAwayTeam.games.concat(currentGame._id);
				await currentAwayTeam.save();
			} else if (!homeTeam && !awayTeam) {
				currentGame.homeTeam = null;
				currentGame.gameName = "";
				currentGame.awayTeam = null;
				console.log("homeTeam:", currentGame.homeTeam);
				console.log("awayTeam:", currentGame.awayTeam);
				console.log("gameName:", currentGame.gameName);
			}
		}
		// Save the updated game
		await currentGame.save();

		revalidatePath(`/`);
		return { status: 200, message: "Successfully updated game." };
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

		console.log("gamesToAdd:", gamesToAdd);

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

export async function createGame(gameData: FormData) {
	try {
		const seasonId = gameData.get("seasonId");
		const divisionId = gameData.get("divisionId");
		const homeTeamId = gameData.get("homeTeamId");
		const awayTeamId = gameData.get("awayTeamId");
		const week = gameData.get("week");
		const date = gameData.get("date");
		const time = gameData.get("time");
		const location = gameData.get("location");

		console.log(date + "T" + formatTime(time));

		const calculatedDate = new Date(date + "T" + formatTime(time));

		const homeTeam = await Team.findById(homeTeamId);
		const awayTeam = await Team.findById(awayTeamId);

		const division = await Division.findById(divisionId);
		const season = await Season.findById(seasonId);

		if (!homeTeam) {
			return { status: 404, message: "Home Team not found." };
		}
		if (!awayTeam) {
			return { status: 404, message: "Away Team not found." };
		}
		if (!division) {
			return { status: 404, message: "Division not found." };
		}
		if (!season) {
			return { status: 404, message: "Season not found." };
		}

		const gameName = `${homeTeam.teamName} vs. ${awayTeam.teamName}`;
		const game = new Game({
			gameName,
			date: convertToEST(calculatedDate),
			week,
			homeTeam: homeTeam._id,
			awayTeam: awayTeam._id,
			homeTeamScore: 0,
			awayTeamScore: 0,
			status: false,
			started: false,
			division: division._id,
			season: season._id,
			location, // Add the location field
		});

		const savedGame = await game.save();
		homeTeam.games = homeTeam.games.concat(savedGame._id);
		await homeTeam.save();
		awayTeam.games = awayTeam.games.concat(savedGame._id);
		await awayTeam.save();
		division.games = division.games.concat(savedGame._id);
		await division.save();

		if (!savedGame) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 201, message: "Successfully added team to division." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function deleteGame(gameId: string) {
	try {
		const game = await Game.findById(gameId);
		if (!game) return { status: 404, message: "No game found." };
		// Remove the player from the team's players array
		await Division.findOneAndUpdate(
			{ games: gameId },
			{ $pull: { games: gameId } }
		);

		// Remove the game from the teams' games array
		await Team.updateMany({ games: gameId }, { $pull: { games: gameId } });

		await Game.findByIdAndRemove(gameId);

		return { status: 200, message: "Successfully deleted game." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}

function formatTime(timeString) {
	const [hours, minutes] = timeString.split(":");

	// Ensure hours and minutes have two digits
	const formattedHours = hours?.padStart(2, "0");
	const formattedMinutes = minutes?.padStart(2, "0");

	// Concatenate the formatted time
	const formattedTime = `${formattedHours}:${formattedMinutes}`;

	return formattedTime;
}
