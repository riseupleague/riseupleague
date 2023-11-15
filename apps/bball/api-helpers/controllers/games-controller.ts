import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import { parse, startOfDay, endOfDay, addHours } from "date-fns";
import { Limelight } from "next/font/google";

export const getAllUpcomingGames = async () => {
	try {
		// const activeSeason = await Season.find({ active: "true" });

		const games = await Game.find({ status: false })
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
			.select("status homeTeam awayTeam division date gameName location")
			.limit(12);

		const allUpcomingGames = games.map((game) => ({
			...game.toObject(), // Convert the Mongoose document to a plain JavaScript object
			date: new Date(game.date).toLocaleDateString("en-US", {
				timeZone: "America/Toronto",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		}));
		return NextResponse.json({ allUpcomingGames });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllUpcomingGamesHeader = async () => {
	try {
		const currentDate = new Date();
		const startOfToday = startOfDay(currentDate);
		const allGames = await Game.find({
			status: false,
			date: { $gte: addHours(startOfToday, 5) },
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

		return NextResponse.json({ allUpcomingGames: allGames });
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

// export const getGamesByDate = async () => {
// 	try {
// 		const activeSeason = await Season.find({ active: "true" });

// 		// Retrieve all games (you can add any necessary filters)
// 		const allGames = await Game.find({ status: false })
// 			.populate({
// 				path: "division",
// 				select: "divisionName",
// 			})
// 			.populate({
// 				path: "homeTeam",
// 				select:
// 					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
// 			})
// 			.populate({
// 				path: "awayTeam",
// 				select:
// 					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
// 			})
// 			.select("status homeTeam awayTeam division date gameName location");

// 		// Combine grouping and sorting of games
// 		const gamesByDate = allGames.reduce((accumulator, game) => {
// 			const date = new Date(game.date);
// 			const formattedDate = date.toLocaleDateString("en-US", {
// 				timeZone: "America/Toronto",
// 				weekday: "long",
// 				year: "numeric",
// 				month: "long",
// 				day: "numeric",
// 			});

// 			// Find the dateObject or create a new one
// 			const dateObject = accumulator.find(
// 				(obj) => obj.date === formattedDate
// 			) || {
// 				date: formattedDate,
// 				games: [],
// 			};

// 			// Push the game into the dateObject's games array
// 			dateObject.games.push(game);

// 			// Sort the dateObject's games array by time
// 			dateObject.games.sort((game1, game2) => {
// 				const time1 = new Date(game1.date).getTime(); // Get the timestamp
// 				const time2 = new Date(game2.date).getTime(); // Get the timestamp
// 				return time1 - time2;
// 			});

// 			// If the dateObject is not already in the accumulator, add it
// 			if (!accumulator.includes(dateObject)) {
// 				accumulator.push(dateObject);
// 			}

// 			return accumulator;
// 		}, []);

// 		// Return the gamesByDate as the response
// 		return NextResponse.json({ gamesByDate });

// 	} catch (e) {
// 		return NextResponse.json(
// 			{ message: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// };

export const getGamesByDate = async (selectedDate) => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// const date = parse(selectedDate, "EEE dd MMM yy", new Date(), {
		// 	timeZone: "America/Toronto",
		// });

		const date = new Date(selectedDate * 1000);
		// Filter games by the date
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
