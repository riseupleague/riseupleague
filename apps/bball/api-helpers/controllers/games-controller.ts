import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import {
	startOfDay,
	addHours,
	endOfDay,
	parseISO,
	add,
	format,
} from "date-fns";
import { revalidatePath } from "next/cache";

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

export const getGamesByDate = async (selectedDate) => {
	try {
		const date = new Date(selectedDate);
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
