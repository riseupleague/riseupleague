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

/**
 * Edit a season with the given seasonId using the provided seasonData.
 *
 * @param {string} seasonId - The ID of the season to be edited
 * @param {FormData} seasonData - The data to update the season with
 * @return {Promise<object>} An object containing the status and message of the operation
 */
// export async function updateSeason(seasonId: string, seasonData: FormData) {
// 	try {
// 		const rawSeasonData = {
// 			seasonName: seasonData.get("name"),
// 			active: seasonData.get("active") ? true : false,
// 			register: seasonData.get("register") ? true : false,
// 		};

// 		const season = await Season.findById(seasonId);
// 		if (!season) return { status: 404, message: "No season found." };

// 		await Season.findByIdAndUpdate(seasonId, rawSeasonData);
// 		revalidatePath(`/`);

// 		return { status: 200, message: "Successfully updated season." };
// 	} catch (e) {
// 		console.log(e);
// 		return { status: 500, message: "Internal Server Error" };
// 	}
// }

/**
 * Deletes a season by the given seasonId.
 *
 * @param {string} seasonId - The ID of the season to be deleted
 * @return {object} An object containing status and message after deletion
 */
// export async function deleteSeason(seasonId: string) {
// 	try {
// 		const season = await Season.findById(seasonId);
// 		if (!season) return { status: 404, message: "No season found." };

// 		await Season.findByIdAndRemove(seasonId);

// 		return { status: 200, message: "Successfully deleted season." };
// 	} catch (e) {
// 		console.log(e);
// 		return { status: 500, message: "Internal server error." };
// 	}
// }

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
