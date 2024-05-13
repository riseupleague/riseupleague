import { NextResponse } from "next/server";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";

type Season = {
	_id: string;
	seasonName: string;
	active: boolean;
	divisions: string[];
	__v: number;
};

// Define the type for a Division object
type Division = {
	_id: string;
	divisionName: string;
	season: string; // Assuming season is a string (ObjectId.toString())
	teams: any[]; // An array of Team objects
	location: string;
	day: string;
	startTime: string;
	endTime: string;
	earlyBird: string;
	regularPrice: string;
	description: string;
	earlyBirdOpen: boolean;
	earlyBirdId: string;
	regularPriceFullId: string;
	regularPriceInstalmentId: string;
};

/**
 * Retrieves all current divisions and cities.
 *
 * @return {Promise<object>} An object containing the division names and cities.
 */
export const getAllCurrentDivisionsAndCities = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		const divisions = await Division.find({ season: activeSeason }).select(
			"divisionName city"
		);

		if (!divisions) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		// Extract division names and cities
		const { divisionNamesAndCities, cities } = divisions.reduce(
			(result, division) => {
				// Extract division names (unique)
				if (
					!result.divisionNamesAndCities.find(
						(item) => item._id === division._id
					)
				) {
					result.divisionNamesAndCities.push({
						_id: division._id,
						divisionName: division.divisionName,
						city: division.city,
					});
				}

				// Extract cities (unique)
				if (!result.cities.includes(division.city)) {
					result.cities.push(division.city);
				}

				return result;
			},
			{ divisionNamesAndCities: [], cities: [] }
		);

		return NextResponse.json({ divisionNamesAndCities, cities });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieve all current divisions for the active season.
 *
 * @return {Promise} A promise that resolves with the divisions or rejects with an error message.
 */
export const getAllCurrentDivisions = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		const divisions = await Division.find({ season: activeSeason });

		if (!divisions) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ divisions });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all register divisions and organizes them by city.
 *
 * @return {Promise} An array of cities with their respective divisions.
 */
export const getAllRegisterDivisions = async () => {
	try {
		// Fetch the register season
		const registerSeason = await Season.find({ register: "true" });

		// Fetch divisions for the register season
		const divisions = await Division.find({ season: registerSeason }).select(
			"divisionName season city location day startTime endTime earlyBirdPrice teams regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId earlyBirdInstalmentId"
		);

		// Check if divisions were found
		if (!divisions || divisions.length === 0) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		// Organize divisions by cities
		const divisionsByCity = divisions.reduce((acc, division) => {
			const { city, ...rest } = division.toObject();

			// Make the city lowercase
			const lowercaseCity = city.toLowerCase();

			// Check if the city already exists in the accumulator
			if (!acc[lowercaseCity]) {
				// If the city doesn't exist, create a new entry with the city and an array containing the division
				acc[lowercaseCity] = { city: lowercaseCity, divisions: [rest] };
			} else {
				// If the city already exists, push the division to the existing array
				acc[lowercaseCity].divisions.push(rest);
			}

			return acc;
		}, {});

		// Convert the object into an array of cities with divisions
		const result = Object.values(divisionsByCity);

		return NextResponse.json({ divisions: result });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves the division with teams and their statistics based on the provided divisionId.
 *
 * @param {string} divisionId - The ID of the division to retrieve.
 * @return {Promise} A promise that resolves to the division with teams and their stats.
 */
export const getCurrentDivisionWithTeams = async (divisionId: string) => {
	try {
		const division = await Division.findById(divisionId)
			.populate({
				path: "teams",
				select: "teamName wins losses pointDifference teamBanner _id",
			})
			.select("divisionName teams");

		const teamsWithStats = division.teams?.map((team) => {
			const { wins, losses, pointDifference, teamName } = team;
			let gp, wpct;
			if (!wins && !losses) {
				gp = 0;
				wpct = 0;
			} else {
				gp = wins + losses;
				wpct = wins === 0 && losses === 0 ? 0 : wins / (wins + losses);
			}

			return {
				teamName,
				wins,
				losses,
				pointDifference,
				gp,
				wpct,
				_id: team._id,
			};
		});

		// Return the division with teams and stats
		const divisionWithTeamStats = {
			_id: division._id,
			divisionName: division.divisionName,
			teams: teamsWithStats || [], // Ensure teams are an array (or an empty array if undefined)
		};

		return NextResponse.json({ divisionWithTeamStats });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all active divisions with their associated teams and statistics.
 *
 * @return {Promise} A Promise that resolves with the divisions and their associated statistics.
 */
export const getAllCurrentDivisionsWithTeams = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		const divisions = await Division.find({ season: activeSeason })
			.populate({
				path: "teams",
				select: "teamName wins losses pointDifference teamBanner _id",
			})
			.select("divisionName teams");
		const divisionsWithStats = divisions.map((division) => {
			// Calculate statistics for teams within this division
			const teamsWithStats = division.teams?.map((team) => {
				const { wins, losses, pointDifference, teamName } = team;
				let gp, wpct;
				if (!wins && !losses) {
					gp = 0;
					wpct = 0;
				} else {
					gp = wins + losses;
					wpct = wins === 0 && losses === 0 ? 0 : wins / (wins + losses);
				}

				return {
					teamName,
					wins,
					losses,
					pointDifference,
					gp,
					wpct,
					_id: team._id,
				};
			});

			// Return the division with teams and stats
			return {
				_id: division._id,
				divisionName: division.divisionName,
				teams: teamsWithStats || [], // Ensure teams are an array (or an empty array if undefined)
			};
		});

		if (!divisions) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ divisionsWithStats });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all current divisions with team names.
 *
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the divisions with team names.
 */
export const getAllCurrentDivisionsWithTeamNames = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsWithTeamNames = await Division.find({
			season: activeSeason,
		})
			.populate("teams", "teamName primaryColor secondaryColor tertiaryColor")
			.select("divisionName _id teams");
		if (!divisionsWithTeamNames) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ divisionsWithTeamNames });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all upcoming divisions with their team names.
 *
 * @return {Promise} Promise that resolves to an object containing the upcoming divisions with team names
 */
export const getAllUpcomingDivisionsWithTeamNames = async () => {
	try {
		const registerSeason = await Season.find({ register: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsWithTeamNames = await Division.find({
			season: registerSeason,
		})
			.populate("teams", "teamName primaryColor secondaryColor tertiaryColor")
			.select("divisionName _id teams location");
		if (!divisionsWithTeamNames) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ divisionsWithTeamNames });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves all current divisions' names and IDs.
 *
 * @return {Promise<Object>} A promise that resolves with the divisions' names and IDs.
 */
export const getAllCurrentDivisionsNameAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsNameAndId = await Division.find({
			season: activeSeason,
		}).select("divisionName _id");

		// Add "All Divisions" to the beginning of the array
		// divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

		if (!divisionsNameAndId) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ divisionsNameAndId });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

/**
 * Retrieves a division by ID along with related teams and season information.
 *
 * @param {string} id - The ID of the division to retrieve
 * @return {Promise} A Promise that resolves with the division information
 */
export const getRegisterDivisionById = async (id: string) => {
	// Check if the provided ID is not undefined or null
	if (!id) {
		return NextResponse.json(
			{ message: "Invalid division ID" },
			{ status: 400 }
		);
	}

	// Attempt to find the division by ID and populate related fields
	const division = await Division.findById(id)
		.populate([
			{
				path: "teams",
				select:
					"teamName teamNameShort teamCode wins losses primaryColor secondaryColor tertiaryColor players paid",
				populate: {
					path: "players",
					select: "paid playerName jerseyNumber", // Select only the 'paid' field for players
				},
			},
			{
				path: "season",
				select: "freePrice",
			},
		])
		.populate({ path: "season", select: "fullTeamPrice" })
		.select(
			"divisionName location day startTime endTime earlyBirdPrice regularPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId season earlyBirdInstalmentId season instalmentPrice"
		);

	if (!division) {
		return NextResponse.json({ message: "No division found" }, { status: 404 });
	}

	return NextResponse.json({ division });
};
