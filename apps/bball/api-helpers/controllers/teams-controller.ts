import { NextResponse } from "next/server";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";

/**
 * Retrieves all registered teams for the current season.
 *
 * @return {Promise} An array of teams with their names and codes.
 */
export const getAllRegisterTeams = async () => {
	try {
		const registerTeam = await Season.find({ register: true });

		const teams = await Team.find({ season: registerTeam }).select(
			"teamName, teamCode"
		);

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

/**
 * Retrieves a team by its ID, including associated players and division.
 *
 * @param {string} teamId - The ID of the team to retrieve.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object containing the team data or an error message.
 */
export const getTeamById = async (teamId: string) => {
	try {
		const team = await Team.findById(teamId)
			.populate("players")
			.populate("division")
			.select(
				"division primaryColor secondaryColor tertiaryColor jerseyEdition players paid"
			);

		if (!team) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}
		const teams = await Team.find().select("averageStats");

		return NextResponse.json({ team: team }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};

/**
 * Retrieves a team by ID, populating related fields such as division, season, and players.
 *
 * @param {string} id - The ID of the team to retrieve
 * @return {Promise} A JSON response containing the retrieved team
 */
export const getRegisterTeamById = async (id: string) => {
	// Check if the provided ID is not undefined or null
	if (!id) {
		return NextResponse.json({ message: "Invalid team ID" }, { status: 400 });
	}

	// Attempt to find the division by ID and populate related fields
	const team = await Team.findById(id)
		.populate({
			path: "division",
			select:
				"divisionName city location day startTime endTime earlyBirdPrice teams regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId earlyBirdInstalmentId teamCaptain",
		})
		.populate({ path: "season", select: "freePrice" })
		.populate({
			path: "players",
			select: "teamCaptain playerName user jerseyNumber",
		})
		.populate({ path: "teamCaptain", select: "playerName" })
		.select("division teamCaptain paid teamName createdManually");

	if (!team) {
		return NextResponse.json({ message: "No team found" }, { status: 404 });
	}

	return NextResponse.json({ team });
};

/**
 * Retrieves a team by its ID and populates it with games and related information.
 *
 * @param {string} teamId - The ID of the team to retrieve.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the team data.
 */
export const getTeamByIdWithGames = async (teamId: string) => {
	try {
		const team = await Team.findById(teamId)
			.populate("players")
			.populate({
				path: "division",
				populate: {
					path: "games",
					populate: [
						{
							path: "homeTeam",
							select:
								"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
						},
						{
							path: "awayTeam",
							select:
								"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
						},
					],
					select:
						"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore location week time",
				},
			})
			.populate({
				path: "division",
				populate: {
					path: "teamsWithSchedule",
					select: "teamName teamNameShort",
				},
			})
			.select(
				"division primaryColor secondaryColor tertiaryColor jerseyEdition players teamName games"
			);

		if (!team) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}
		const teams = await Team.find().select("averageStats");

		return NextResponse.json({ team: team }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};

/**
 * Retrieves the average statistics for all teams in a given season.
 *
 * @param {string} teamId - The ID of the team.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the team and the average statistics for all teams.
 */
export const getTeamAllAvgFromId = async (teamId: string) => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		const team = await Team.findById(teamId)
			.populate("players")
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "games",
				select: "gameName date homeTeam awayTeam status division location",
				populate: [
					{
						path: "homeTeam",
						select: "teamName teamNameShort wins losses",
					},
					{
						path: "awayTeam",
						select: "teamName teamNameShort wins losses",
					},
					{
						path: "division",
						select: "divisionName",
					},
				],
			})
			.populate({
				path: "seasonStatistics.game",
				select: "gameName homeTeamScore awayTeamScore status homeTeam awayTeam",
				populate: [
					{
						path: "homeTeam",
						select: "teamName",
					},
					{
						path: "awayTeam",
						select: "teamName",
					},
				],
			});

		if (!team) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}
		const teams = await Team.find({ season: activeSeason[0]._id }).select(
			"averageStats"
		);

		const avgStats = {
			points: 0,
			rebounds: 0,
			assists: 0,
			steals: 0,
			blocks: 0,
			threesMade: 0,
		};

		teams.forEach((t) => {
			avgStats.points += t.averageStats?.points;
			avgStats.rebounds += t.averageStats?.rebounds;
			avgStats.assists += t.averageStats?.assists;
			avgStats.steals += t.averageStats?.steals;
			avgStats.blocks += t.averageStats?.blocks;
			avgStats.threesMade += t.averageStats?.threesMade;
		});

		const allAvg = {
			points: avgStats.points / teams?.length,
			rebounds: avgStats.rebounds / teams?.length,
			assists: avgStats.assists / teams?.length,
			steals: avgStats.steals / teams?.length,
			blocks: avgStats.blocks / teams?.length,
			threesMade: avgStats.threesMade / teams?.length,
		};

		return NextResponse.json({ team, allAvg }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
};
