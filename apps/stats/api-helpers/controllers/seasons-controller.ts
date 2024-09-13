import Season from "@/api-helpers/models/Season";
import { NextResponse } from "next/server";

/**
 * Retrieves all seasons from the database.
 *
 * @return {Promise} An array of all seasons
 */
export const getAllSeasons = async () => {
	try {
		const seasons = await Season.find();

		return NextResponse.json({ seasons });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving all seasons" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves a season by the provided ID.
 *
 * @param {string} id - The ID of the season to retrieve.
 * @return {NextResponse} The JSON response containing the retrieved season.
 */
export const getSeasonById = async (id: string) => {
	try {
		const season = await Season.findOne({ _id: id });

		return NextResponse.json({ season });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving active season" },
			{ status: 500 }
		);
	}
};
