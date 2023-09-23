import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";

export const getAllUpcomingGames = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		{
		}
		const allUpcomingGames = await Game.find({})
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
