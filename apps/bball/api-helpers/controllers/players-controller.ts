import { NextResponse } from "next/server";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

export const getAllCurrentPlayers = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

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

		revalidatePath("/", "layout");

		return NextResponse.json({ allPlayers });
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

		revalidatePath("/", "layout");

		return NextResponse.json({ player, allAvg }, { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
