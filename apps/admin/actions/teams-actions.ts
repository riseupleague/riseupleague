"use server";

import Division from "@/api-helpers/models/Division";
import Team from "@/api-helpers/models/Team";
import { revalidatePath } from "next/cache";

/**
 * Create a new team for a given season and division.
 *
 * @param {string} seasonId - The ID of the season for the new team.
 * @param {string} divisionId - The ID of the division for the new team.
 * @param {FormData} teamData - The data for the new team.
 * @return {Promise<Object>} An object with a status and a message.
 */
export async function createTeam(
	seasonId: string,
	divisionId: string,
	teamData: FormData
) {
	try {
		const division = await Division.findById(divisionId);

		const rawTeamData = {
			season: seasonId,
			division: divisionId,
			teamName: teamData.get("name"),
			teamNameShort: teamData.get("nameShort"),
			teamCode: teamData.get("code"),
			paid: teamData.get("paid") ? true : false,
			wins: 0,
			losses: 0,
			pointDifference: 0,
			averageStats: initialAverageStats,
		};

		const team = new Team(rawTeamData);
		const savedTeam = await team.save();

		division.teams = division.teams.concat(savedTeam._id);
		await division.save();

		if (!savedTeam) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 201, message: "Successfully added team to division." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function updateTeam(teamId: string, teamData: FormData) {
	try {
		const rawTeamData = {
			teamName: teamData.get("name"),
			teamNameShort: teamData.get("nameShort"),
			teamCode: teamData.get("teamCode"),
			paid: teamData.get("paid") ? true : false,
		};

		const team = await Team.findByIdAndUpdate(teamId, rawTeamData);
		if (!team) return { status: 500, message: "Internal server error." };

		revalidatePath(`/`);
		return { status: 200, message: "Successfully updated team." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

export async function deleteTeam(teamId: string) {
	try {
		const team = await Team.findById(teamId);
		if (!team) return { status: 404, message: "No team found." };

		await Team.findByIdAndRemove(teamId);

		return { status: 200, message: "Successfully deleted team." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}

const initialAverageStats = {
	points: 0,
	rebounds: 0,
	assists: 0,
	blocks: 0,
	steals: 0,
	threesMade: 0,
	twosMade: 0,
	freeThrowsMade: 0,
};
