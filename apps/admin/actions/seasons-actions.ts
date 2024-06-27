"use server";

import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

/**
 * Adds a new season using the provided season data.
 *
 * @param {FormData} seasonData - The data for the new season.
 * @return {object} An object containing the status and message of the operation.
 */
export async function createSeason(seasonData: FormData) {
	try {
		const rawSeasonData = {
			seasonName: seasonData.get("name"),
			active: seasonData.get("active") ? true : false,
			register: seasonData.get("register") ? true : false,
		};

		const season = new Season(rawSeasonData);
		await season.save();

		revalidatePath("/seasons-management");

		return { status: 201, message: "Successfully added season." };
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
export async function updateSeason(seasonId: string, seasonData: FormData) {
	try {
		const rawSeasonData = {
			seasonName: seasonData.get("name"),
			active: seasonData.get("active") ? true : false,
			register: seasonData.get("register") ? true : false,
		};

		const season = await Season.findById(seasonId);
		if (!season) return { status: 404, message: "No season found." };

		await Season.findByIdAndUpdate(seasonId, rawSeasonData);
		revalidatePath(`/`);

		return { status: 200, message: "Successfully updated season." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal Server Error" };
	}
}

/**
 * Deletes a season by the given seasonId.
 *
 * @param {string} seasonId - The ID of the season to be deleted
 * @return {object} An object containing status and message after deletion
 */
export async function deleteSeason(seasonId: string) {
	try {
		const season = await Season.findById(seasonId);
		if (!season) return { status: 404, message: "No season found." };

		await Season.findByIdAndRemove(seasonId);

		return { status: 200, message: "Successfully deleted season." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}
