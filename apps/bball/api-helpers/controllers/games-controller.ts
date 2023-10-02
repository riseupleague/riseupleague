import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";

type GameFilter = {
	status: boolean;
	team?: string | undefined;
	division?: string | undefined;
};

export const getAllUpcomingGames = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		{
		}
		const allUpcomingGames = await Game.find({ status: false })
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
			.select("status homeTeam awayTeam division date gameName location");
		return NextResponse.json({ allUpcomingGames });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getGamesByDate = async (division, team) => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		console.log("division:", division);
		// Regular query with additional filters
		const filter: GameFilter = {
			status: false,
		};

		if (division && division !== "") {
			filter.division = division;
		}

		if (team && team !== "") {
			// Update filter to match either homeTeam or awayTeam with the provided team ID
			filter.$or = [{ homeTeam: team }, { awayTeam: team }];
		}

		// Retrieve all games (you can add any necessary filters)
		const allGames = await Game.find(filter)
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
			.select("status homeTeam awayTeam division date gameName location");

		// Convert the games into the gamesByDate format
		const gamesByDate = allGames.reduce((accumulator, game) => {
			const date = new Date(game.date);
			const formattedDate = date.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			const existingDateObject = accumulator.find(
				(dateObject) => dateObject.date === formattedDate
			);

			if (existingDateObject) {
				existingDateObject.games.push(game);
			} else {
				accumulator.push({ date: formattedDate, games: [game] });
			}

			return accumulator;
		}, []);

		console.log(gamesByDate);

		// Return the gamesByDate as the response
		return NextResponse.json({ gamesByDate });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

// export const getAllUpcomingGames = async ({
// 	page = 1,
// 	limit = 50,
// 	team = "",
// 	division = "",
// }: {
// 	page: number;
// 	limit: number;
// 	team?: string; // Team parameter
// 	division?: string; // Division parameter
// }) => {
// 	try {
// 		const activeSeason = await Season.find({ active: true });

// 		const skip = (page - 1) * limit;

// 		// Define the filter object based on query parameters
// 		const filter: GameFilter = {
// 			season: activeSeason,
// 		};

// 		// Add filters based on query parameters
// 		if (team !== "") {
// 			filter.team = team;
// 		}

// 		if (division !== "") {
// 			filter.division = division;
// 		}

// 		const allUpcomingGames = await Game.find(filter)
// 			.populate({
// 				path: "division",
// 				select: "divisionName",
// 			})
// 			.populate({
// 				path: "homeTeam",
// 				select: "teamName teamNameShort",
// 			})
// 			.populate({
// 				path: "awayTeam",
// 				select: "teamName teamNameShort",
// 			})
// 			.select("status homeTeam awayTeam division date gameName location")
// 			.limit(limit)
// 			.skip(skip);

// 		const totalRecords = await Game.countDocuments(filter);

// 		// Calculate the total number of pages
// 		const totalPages = Math.ceil(totalRecords / limit);

// 		return NextResponse.json({ allUpcomingGames, totalPages });
// 	} catch (e) {
// 		return NextResponse.json(
// 			{ message: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// };

export const getAllPlayersOfTheWeek = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		{
		}
		const allPlayersOfTheWeek = await Game.find({
			status: true,
		})
			.populate("playerOfTheGame")
			.select("playerOfTheGame");
		return NextResponse.json({ allPlayersOfTheWeek });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
