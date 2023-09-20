import { NextResponse } from "next/server";
import Team from "@/src/api-helpers/models/Team";
import Division from "@/src/api-helpers/models/Division";
import Season from "@/src/api-helpers/models/Season";
import Game from "@/src/api-helpers/models/Game";

export const getAllCurrentTeams = async (seasonId: string) => {
	try {
		const teams = await Team.find({ season: seasonId }).select("teamName");

		if (teams.length === 0) {
			return NextResponse.json({ message: "No teams found" }, { status: 404 });
		}

		return NextResponse.json({ teams });
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
