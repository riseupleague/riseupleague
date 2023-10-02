import { NextResponse } from "next/server";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Game from "@/api-helpers/models/Game";

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
		const teamsNameAndId = await Team.find({ season: activeSeason }).select(
			"teamName _id"
		);
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

export const getAllCurrentTeamsNameDivisionAndId = async (division: string) => {
	console.log("hello", division);
	try {
		let teamsNameDivisionAndId;
		const activeSeason = await Season.find({ active: "true" });

		if (division && division !== "") {
			// Use select to retrieve only divisionName and _id fields
			teamsNameDivisionAndId = await Team.find({
				season: activeSeason,
				division: division,
			})
				.populate("division", "divisionName")
				.select("teamName _id division");
		} else {
			// Use select to retrieve only divisionName and _id fields
			teamsNameDivisionAndId = await Team.find({ season: activeSeason })
				.populate("division", "divisionName")
				.select("teamName _id division");
		}

		// Create the object to push (All Teams)
		const allTeamsObject = {
			division: { _id: "", divisionName: "" },
			teamName: "All Teams",
			_id: "",
		};

		// Push the All Teams object into the beginning of array
		teamsNameDivisionAndId.unshift(allTeamsObject);

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
