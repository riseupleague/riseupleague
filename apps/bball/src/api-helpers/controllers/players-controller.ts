import { NextResponse } from "next/server";
import Player from "@/src/api-helpers/models/Player";
import Team from "@/src/api-helpers/models/Team";

export const getAllPlayers = async (teamId = "") => {
	try {
		// team ID param passed
		if (teamId) {
			const players = await Player.find({ team: teamId });
			return NextResponse.json({ players });
		}

		const allPlayers = await Player.find();
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
