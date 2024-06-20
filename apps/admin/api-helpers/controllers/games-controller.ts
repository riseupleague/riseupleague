import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import { startOfDay, endOfDay, addHours } from "date-fns";

export const getAllUpcomingGamesHeader = async () => {
	try {
		const allGames = await Game.find({ status: false })
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
						select: "teamName  primaryColor secondaryColor tertiaryColor",
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
				select: "divisionName",
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
				if (existingGames) {
					existingGames.games.push(game);
				} else {
					acc.push({ date, games: [game] });
				}
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
						select: "playerName averageStats jerseyNumber",
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
						select: "playerName averageStats jerseyNumber",
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
			.populate("season", "seasonName");

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

export const getAllGamesBySeasonId = async (seasonId: string) => {
	try {
		const games = await Game.find({ season: seasonId })
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select: "teamName teamNameShort",
			})
			.populate({
				path: "awayTeam",
				select: "teamName teamNameShort",
			})
			.populate({
				path: "playerOfTheGame",
				select: "playerName allStats",
			})
			.select(
				"status homeTeam awayTeam homeTeamScore awayTeamScore division date gameName location playerOfTheGame season"
			)
			.sort({ date: "asc" });

		if (!games) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
		return NextResponse.json({ games });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
