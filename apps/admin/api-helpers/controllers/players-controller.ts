import { NextResponse } from "next/server";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";

export const getAllCurrentPlayers = async (seasonId: string) => {
	try {
		const activeSeason = await Season.find({ season: seasonId });

		// Get the total number of records that match the query criteria
		const allPlayers = await Player.find({ season: activeSeason })
			.sort({ playerName: 1 })
			.populate([
				{ path: "division", select: "divisionName" },
				{
					path: "team",
					select: "teamName primaryColor secondaryColor tertiaryColor",
				},
			])
			.select("playerName team jerseyNumber division averageStats");

		return NextResponse.json({ allPlayers });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllPlayersWithId = async (seasonId: string) => {
	try {
		const players = await Player.find({ season: seasonId })
			.populate("team", "teamName")
			.populate("division", "divisionName")
			.populate("user", "name")
			.select("playerName instagram team division user createdAt")
			.sort({ createdAt: -1 });

		if (!players) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ players });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getPlayerById = async (playerId: string) => {
	try {
		const player = await Player.findById(playerId)
			.populate({
				path: "team",
				select: "teamName teamBanner",
			})
			.populate({ path: "allStats.game", select: "gameName status" })
			.populate({
				path: "division",
				select: "divisionName",
			});
		if (!player) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ player }, { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getPlayerAllAvgFromId = async (playerId: string) => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		let player = await Player.findById(playerId)
			.populate({
				path: "team",
				select: "teamName teamBanner",
			})
			.populate({ path: "allStats.game", select: "gameName status" })
			.populate({
				path: "division",
				select: "divisionName",
			});

		if (!player) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}
		const players = await Player.find().select("averageStats");

		const avgStats = {
			points: 0,
			rebounds: 0,
			assists: 0,
			steals: 0,
			blocks: 0,
		};

		players.forEach((p) => {
			avgStats.points += p.averageStats.points;
			avgStats.rebounds += p.averageStats.rebounds;
			avgStats.assists += p.averageStats.assists;
			avgStats.steals += p.averageStats.steals;
			avgStats.blocks += p.averageStats.blocks;
		});

		const allAvg = {
			points: avgStats.points / players.length,
			rebounds: avgStats.rebounds / players.length,
			assists: avgStats.assists / players.length,
			steals: avgStats.steals / players.length,
			blocks: avgStats.blocks / players.length,
		};

		return NextResponse.json({ player, allAvg }, { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllFreeAgents = async (season) => {
	try {
		const trueFreeAgents = await Player.find({ freeAgent: true, season })
			.populate("team", "teamName")
			.populate("division", "divisionName")
			.select("playerName teamName instagram freeAgent division");

		const falseFreeAgents = await Player.find({
			freeAgent: false,
			season,
		})
			.populate("team", "teamName")
			.populate("division", "divisionName")
			.populate("user", "email")
			.select("playerName teamName instagram freeAgent division");

		const freeAgents = [
			...trueFreeAgents.sort((a, b) => (a.playerName > b.playerName ? 1 : -1)),
			...falseFreeAgents.sort((a, b) => (a.playerName > b.playerName ? 1 : -1)),
		];

		return NextResponse.json({ freeAgents });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
