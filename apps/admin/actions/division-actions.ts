"use server";

import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import { revalidatePath } from "next/cache";

/**
 * Creates a new division for a season based on the provided division data.
 *
 * @param {string} seasonId - The ID of the season for which the division is being created.
 * @param {FormData} divisionData - The form data containing information about the division.
 * @return {Promise<object>} An object containing the status and message of the operation.
 */
export async function createDivision(seasonId: string, divisionData: FormData) {
	try {
		const season = await Season.findById(seasonId);
		if (!season) return { status: 404, message: "No season found." };

		const rawDivisionData = {
			divisionName: divisionData.get("name"),
			season: seasonId,
			location: divisionData.get("location"),
			city: divisionData.get("city"),
			day: divisionData.get("day"),
			startTime: divisionData.get("startTime"),
			endTime: divisionData.get("endTime"),
			earlyBirdPrice: divisionData.get("earlyBirdPrice"),
			regularPrice: divisionData.get("regularPrice"),
			instalmentPrice: divisionData.get("instalmentPrice"),
			description: divisionData.get("description"),
			earlyBirdOpen: divisionData.get("earlyBirdOpen") ? true : false,
			earlyBirdId: divisionData.get("earlyBirdId"),
			regularPriceFullId: divisionData.get("regularPriceFullId"),
			regularPriceInstalmentId: divisionData.get("regularPriceInstalmentId"),
		};

		const division = new Division(rawDivisionData);
		const savedDivision = await division.save();

		season.divisions = season.divisions.concat(savedDivision._id);
		await season.save();

		if (!season) return { status: 500, message: "Internal server error." };

		revalidatePath("/");

		return { status: 201, message: "Successfully added division." };
	} catch (e) {
		return { status: 500, message: "Internal server error." };
	}
}

/**
 * Update a division in the database based on the provided divisionData and id.
 *
 * @param {any} divisionData - The data to update the division with.
 * @param {string} id - The id of the division to update.
 * @return {Promise<object>} An object with status and message indicating the result of the update operation.
 */
export async function updateDivision(divisionData: any, id: string) {
	try {
		const divisionExists = await Division.findById(id);
		if (!divisionExists) return { status: 404, message: "No division found." };

		const rawDivisionData = {
			divisionName: divisionData.get("name"),
			location: divisionData.get("location"),
			city: divisionData.get("city"),
			day: divisionData.get("day"),
			startTime: divisionData.get("startTime"),
			endTime: divisionData.get("endTime"),
			earlyBirdPrice: divisionData.get("earlyBirdPrice"),
			regularPrice: divisionData.get("regularPrice"),
			instalmentPrice: divisionData.get("instalmentPrice"),
			description: divisionData.get("description"),
			earlyBirdOpen: divisionData.get("earlyBirdOpen") ? true : false,
			earlyBirdId: divisionData.get("earlyBirdId"),
			regularPriceFullId: divisionData.get("regularPriceFullId"),
			regularPriceInstalmentId: divisionData.get("regularPriceInstalmentId"),
		};

		const division = await Division.findByIdAndUpdate(id, rawDivisionData);
		if (!division) return { status: 500, message: "Internal server error." };

		revalidatePath("/");
		return { status: 200, message: "Successfully updated division." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}

/**
 * Delete a division by its ID.
 *
 * @param {string} divisionId - The ID of the division to be deleted
 * @return {object} An object containing the status and message of the deletion operation
 */
export async function deleteDivision(divisionId: string) {
	try {
		const division = await Division.findById(divisionId);
		if (!division) return { status: 404, message: "No division found." };

		await Division.findByIdAndRemove(divisionId);

		return { status: 200, message: "Successfully deleted division." };
	} catch (e) {
		console.log(e);
		return { status: 500, message: "Internal server error." };
	}
}
