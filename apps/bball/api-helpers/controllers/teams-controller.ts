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

export const getAllRegisterTeams = async () => {
	try {
		const registerSeason = await Season.find({ register: "true" });

		const teams = await Team.find({ season: registerSeason })
			.populate("players")
			.populate({
				path: "division",
				select: "divisionName",
			});

		if (!teams) {
			return NextResponse.json({ message: "No teams found" }, { status: 404 });
		}

		return NextResponse.json({ teams });
	} catch (error) {
		console.error("Error:", error);
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

export const getAllCurrentTeamsNameDivisionAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const teamsNameDivisionAndId = await Team.find({ season: activeSeason })
			.populate("division", "divisionName")
			.select("teamName _id division");

		// Create the object to push (All Teams)
		const allTeamsObject = {
			division: { _id: "", divisionName: "" },
			teamName: "All Teams",
			_id: "",
		};

		// Push the All Teams object into the array
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

export const getTeamAllAvgFromId = async (teamId: string) => {
	console.log(teamId);

	try {
		const team = await Team.findById(teamId);
		console.log(team);
		// .populate("players")
		// .populate({
		// 	path: "division",
		// 	select: "divisionName",
		// })
		// .populate({
		// 	path: "games",
		// 	select: "gameName date homeTeam awayTeam status division location",
		// 	populate: [
		// 		{
		// 			path: "homeTeam",
		// 			select: "teamName teamNameShort  wins losses",
		// 		},
		// 		{
		// 			path: "awayTeam",
		// 			select: "teamName teamNameShort wins losses",
		// 		},
		// 		{
		// 			path: "division",
		// 			select: "divisionName",
		// 		},
		// 	],
		// })
		// .populate({
		// 	path: "seasonStatistics.game",
		// 	select: "gameName homeTeamScore awayTeamScore homeTeam awayTeam",
		// 	populate: [
		// 		{
		// 			path: "homeTeam",
		// 			select: "teamName",
		// 		},
		// 		{
		// 			path: "awayTeam",
		// 			select: "teamName",
		// 		},
		// 	],
		// });

		// if (!team) {
		// 	return NextResponse.json(
		// 		{ message: "Player not found" },
		// 		{ status: 404 }
		// 	);
		// }
		// const teams = await Team.find().select("averageStats");
		// const avgStats = {
		// 	points: 0,
		// 	rebounds: 0,
		// 	assists: 0,
		// 	steals: 0,
		// 	blocks: 0,
		// 	threesMade: 0,
		// };

		// teams.forEach((t) => {
		// 	avgStats.points += t.averageStats?.points;
		// 	avgStats.rebounds += t.averageStats?.rebounds;
		// 	avgStats.assists += t.averageStats?.assists;
		// 	avgStats.steals += t.averageStats?.steals;
		// 	avgStats.blocks += t.averageStats?.blocks;
		// 	avgStats.threesMade += t.averageStats?.threesMade;
		// });

		// const allAvg = {
		// 	points: avgStats.points / teams?.length,
		// 	rebounds: avgStats.rebounds / teams?.length,
		// 	assists: avgStats.assists / teams?.length,
		// 	steals: avgStats.steals / teams?.length,
		// 	blocks: avgStats.blocks / teams?.length,
		// 	threesMade: avgStats.threesMade / teams?.length,
		// };

		// return NextResponse.json({ team, allAvg }, { status: 200 });
		return NextResponse.json({ team }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};

export const postRegisterTeam = async (team) => {
	const { teamName, teamNameShort, teamNameCode } = team;

	// Check for required input fields
	if (
		!teamName ||
		teamName.trim() === "" ||
		!teamNameShort ||
		teamNameShort.trim() === ""
	) {
		return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
	}

	// Create the new team
	try {
		const newTeam = new Team({
			paid: false,
			teamName,
			teamNameShort,
			teamNameCode,
			wins: 0,
			losses: 0,
			pointDifference: 0,
			averageStats: {
				points: 0,
				rebounds: 0,
				assists: 0,
				blocks: 0,
				steals: 0,
				threesMade: 0,
				twosMade: 0,
				freeThrowsMade: 0,
			},
		});

		// Save the new team to the database
		const savedTeam = await newTeam.save();

		return NextResponse.json({ team: savedTeam }, { status: 201 });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
