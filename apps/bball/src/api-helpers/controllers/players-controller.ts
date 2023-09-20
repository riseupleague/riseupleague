import { NextResponse } from "next/server";
import Player from "@/src/api-helpers/models/Player";
import Team from "@/src/api-helpers/models/Team";
import Season from "@/src/api-helpers/models/Season";

export const getAllCurrentPlayers = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		const allPlayers = await Player.find({ season: activeSeason })
			.sort({ playerName: 1 })
			.populate([
				{ path: "division", select: "divisionName" },
				{ path: "team", select: "teamName" }, // Add this to populate the team field with teamName
			])
			.select("playerName team jerseyNumber division");

		return NextResponse.json({ allPlayers });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getPlayerById = async (playerId: string) => {
	try {
		const player = await Player.findById({ playerId });

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
