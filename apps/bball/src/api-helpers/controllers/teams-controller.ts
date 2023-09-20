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

export const getAllCurrentTeamsNameAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const teamsNameAndId = await Team.find().select("teamName _id");
		if (!teamsNameAndId) {
			return NextResponse.json({ message: "No teams found" }, { status: 404 });
		}

		return NextResponse.json({ teamsNameAndId });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllCurrentTeamsNameDivisionAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const teamsNameDivisionAndId = await Team.find()
			.populate("division", "divisionName")
			.select("teamName _id division");
		if (!teamsNameDivisionAndId) {
			return NextResponse.json({ message: "No teams found" }, { status: 404 });
		}

		return NextResponse.json({ teamsNameDivisionAndId });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
