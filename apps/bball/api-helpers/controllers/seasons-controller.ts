import Season from "@/api-helpers/models/Season";
import { NextResponse } from "next/server";

/**
 * Retrieves all seasons from the database.
 *
 * @return {Promise<NextResponse>} A promise that resolves to the JSON response containing an array of all seasons.
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
 * Retrieves all current divisions with their associated team names and colors.
 *
 * @return {Promise<NextResponse>} A promise that resolves to the JSON response containing an array of all season names. */
export const getAllSeasonNamesFilter = async () => {
	try {
		const seasonNames = await Season.find().select(
			"seasonName active register divisions"
		);

		const seasonNamesWithoutRegister = seasonNames.filter((season) => {
			console.log(season.register);
			return season.register === false || season.register === undefined;
		});

		console.log(seasonNamesWithoutRegister);

		// // Use select to retrieve only divisionName and _id fields
		// const divisionsWithTeamNames = await Division.find({
		// 	season: activeSeason,
		// })
		// 	.populate("teams", "teamName primaryColor secondaryColor tertiaryColor")
		// 	.select("divisionName city _id teams");
		// if (!divisionsWithTeamNames) {
		// 	return NextResponse.json(
		// 		{ message: "No divisions found" },
		// 		{ status: 404 }
		// 	);
		// }

		return NextResponse.json({ seasonNamesWithoutRegister });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves active seasons from the database.
 *
 * @return {Promise<NextResponse>} A promise that resolves to the JSON response containing the retrieved active season.
 */
export const getActiveSeasonId = async () => {
	try {
		const activeSeason = await Season.find({ active: true }, "_id"); // Fetch only the _id field
		console.log("activeSeason:", activeSeason);
		const seasonIdArray = activeSeason.map((season) => season._id);
		console.log("seasonIds:", seasonIdArray);
		const [seasonId] = seasonIdArray;
		console.log("seasonId:", seasonId);

		return NextResponse.json({ activeSeasonId: seasonId.toString() });
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
 * @return {Promise<NextResponse>} A promise that resolves to the JSON response containing the retrieved season.
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

/**
 * Retrieves a season's first division Id.
 *
 * @param {string} id - The ID of the season to retrieve.
 * @return {Promise<NextResponse>} A promise that resolves to the JSON response containing the retrieved season.
 */
export const getFirstDivisionOfTheSeason = async (id: string) => {
	try {
		const season = await Season.findById(id);

		console.log(season)
		const firstDivisionId = season.divisions[0]
		return NextResponse.json({ firstDivisionId });
	} catch (e) {
		return NextResponse.json(
			{ message: "error retrieving active season" },
			{ status: 500 }
		);
	}
};







getFirstDivisionOfTheSeason
