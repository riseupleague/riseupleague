import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import { startOfDay, addHours, endOfDay } from "date-fns";

/**
 * Retrieves all upcoming games within the next one week and returns them sorted by date.
 *
 * @return {Promise<NextResponse>} A JSON response containing the list of all upcoming games.
 * @throws {NextResponse} If there is an internal server error.
 */
export const getAllUpcomingGamesHeader = async () => {
	try {
		const targetDate = new Date();

		// Calculate the start and end dates for one week before the target date
		const oneWeekBefore = new Date(
			targetDate.getTime() - 7 * 24 * 60 * 60 * 1000
		);

		// Calculate the start and end dates for two weeks after the target date
		const twoWeeksAfter = new Date(
			targetDate.getTime() + 14 * 24 * 60 * 60 * 1000
		);

		const allGames = await Game.find({
			date: {
				$gte: oneWeekBefore,
				$lt: twoWeeksAfter,
			},
		})
			.populate({
				path: "division",
				select: "divisionName divisionColor",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.select(
				"status homeTeam awayTeam homeTeamScore awayTeamScore division date gameName location"
			);

		return NextResponse.json({
			allUpcomingGames: allGames.sort((a, b) => (a.date > b.date ? 1 : -1)),
		});
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all upcoming games for a specific division.
 *
 * @param {string} divisionId - The ID of the division for which to retrieve the upcoming games.
 * @return {object} The JSON response containing all upcoming games for the specified division, sorted by date.
 */
export const getAllUpcomingGamesByDivision = async (divisionId) => {
	try {
		const allGames = await Game.find({
			status: false,
			division: divisionId,
		})
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.select("status homeTeam awayTeam division date gameName location");

		return NextResponse.json({
			allUpcomingGames: allGames.sort((a, b) => (a.date > b.date ? 1 : -1)),
		});
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieve the latest 4 past games with detailed information about the division, home team, away team, players, player of the game, and game details, sorted by date.
 *
 * @return {Promise} Promise containing the retrieved games
 */
export const getAllPastGames = async () => {
	try {
		const games = await Game.find({ status: true })
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort teamBanner wins losses primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort teamBanner wins losses primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "players",
				populate: {
					path: "team",
					select: "teamName",
				},
				options: { lean: true }, // Add this option to make players object plain JavaScript objects
			})
			.populate({
				path: "playerOfTheGame",
				populate: [
					{
						path: "division",
						select: "divisionName",
					},
					{
						path: "team",
						select: "teamName primaryColor secondaryColor tertiaryColor",
					},
				],
			})
			.select(
				"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore playerOfTheGame location"
			)
			.sort({ date: -1 })
			.limit(4)
			.lean();

		return NextResponse.json({ games });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves the most recent player of the games that occurred within the last week.
 *
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the retrieved games.
 * @throws {NextResponse} If there is an internal server error, a NextResponse object with a status of 500 and a message of "Internal Server Error" is returned.
 */
export const getAllRecentPlayerOfTheGames = async () => {
	try {
		const targetDate = new Date();

		// Calculate the start and end dates for one week before the target date
		const oneWeekBefore = new Date(
			targetDate.getTime() - 7 * 24 * 60 * 60 * 1000
		);

		// Calculate the start and end dates for two weeks after the target date
		const twoWeeksAfter = new Date(
			targetDate.getTime() + 7 * 24 * 60 * 60 * 1000
		);

		const games = await Game.find({
			date: {
				$gte: oneWeekBefore,
				$lt: targetDate,
			},
			potg: { $exists: true }, // Only retrieve games with defined potg
		})

			.populate({
				path: "playerOfTheGame",
				populate: [
					{
						path: "division",
						select: "divisionName",
					},
					{
						path: "team",
						select: "teamName  primaryColor secondaryColor tertiaryColor",
					},
				],
			})
			.select("playerOfTheGame potg")
			.sort({ date: -1 })
			.limit(30)
			.lean();

		return NextResponse.json({ games });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves games by the selected date and returns them grouped by date.
 *
 * @param {number} selectedDate - The selected date in seconds.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the games grouped by date.
 */
export const getGamesByDate = async (selectedDate) => {
	try {
		const date = new Date(selectedDate * 1000);
		const games = await Game.find({
			date: {
				$gte: addHours(startOfDay(date), 5),
				$lt: addHours(endOfDay(date), 5),
			},
		})
			.populate({
				path: "division",
				select: "divisionName city",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
			})
			.select(
				"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore location"
			);

		const gamesByDate =
			games &&
			games.reduce((acc, game) => {
				const date = new Date(game.date).toLocaleDateString("en-US", {
					timeZone: "America/Toronto",
					month: "short",
					day: "2-digit",
					weekday: "long",
				});
				const existingGames = acc.find((d) => d.date === date);

				if (existingGames) existingGames.games.push(game);
				else acc.push({ date, games: [game] });

				return acc;
			}, []);

		// Sort the games within each date entry by time
		gamesByDate.forEach((dateEntry) => {
			dateEntry.games.sort((a, b) => {
				const timeA = new Date(a.date).getTime();
				const timeB = new Date(b.date).getTime();
				return timeA - timeB;
			});
		});

		// Return the gamesByDate as the response
		return NextResponse.json({ gamesByDate });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves a game by its ID and populates various related fields such as home team, away team, division, season, and player of the game.
 *
 * @param {type} id - The ID of the game to retrieve
 * @return {type} Promise - A promise that resolves to the retrieved game
 */
export const getGameById = async (id) => {
	try {
		const game = await Game.findById(id)
			.populate({
				path: "homeTeam",
				select: "teamName teamNameShort wins losses averageStats location",
				populate: [
					{
						path: "players",
						select: "playerName averageStats jerseyNumber instagram",
						options: { sort: { date: -1 } },
						populate: {
							path: "allStats",
							match: { gameId: id },
							options: { limit: 1 },
						},
					},
					{
						path: "seasonStatistics",
						match: { gameId: id },
						options: { limit: 1 },
					},
				],
			})
			.populate({
				path: "awayTeam",
				select: "teamName teamNameShort wins losses averageStats location",
				populate: [
					{
						path: "players",
						select: "playerName averageStats jerseyNumber instagram",
						options: { sort: { date: -1 } },
						populate: {
							path: "allStats",
							match: { gameId: id },
							options: { limit: 1 },
						},
					},
					{
						path: "seasonStatistics",
						match: { gameId: id },
						options: { limit: 1 },
					},
				],
			})
			.populate("division", "divisionName")
			.populate("season", "seasonName")
			.populate({
				path: "playerOfTheGame",
				populate: [
					{
						path: "team",
						select: "teamName primaryColor secondaryColor tertiaryColor",
					},
				],
			});
		// .populate("playerOfTheGame", "team");
		if (!game) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
		return NextResponse.json({ game });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
