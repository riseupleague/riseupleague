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
	tournament: boolean;
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
 * Retrieves all the current divisions.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 * The NextResponse object contains the divisions if found, or an error message and status code.
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
 * Retrieves all the divisions that are currently open for registration.
 *
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the divisions if found, or an error message and status code.
 */
export const getAllRegisterDivisions = async () => {
	try {
		// Fetch the register season
		const registerSeason = await Season.find({ register: "true" });
		// Fetch divisions for the register season
		const divisions = await Division.find({ season: registerSeason }).select(
			"divisionName season city location day startTime endTime earlyBirdPrice teams regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId earlyBirdTeamPrice earlyBirdTeamPriceId regularTeamPrice regularTeamPriceId firstInstalmentPrice firstInstalmentPriceId"
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
 * Retrieves all active divisions with their associated teams and statistics.
 *
 * @return {Promise} A Promise that resolves with the divisions and their associated statistics.
 */

export const getAllCurrentDivisionsWithTeams = async () => {
	try {
		const activeSeason = await Season.findOne({ active: true }).exec();

		if (!activeSeason) {
			return NextResponse.json(
				{ message: "No active season found" },
				{ status: 404 }
			);
		}

		const divisions = await Division.find({ season: activeSeason._id })
			.populate({
				path: "teams",
				select:
					"teamName teamNameShort wins losses pointDifference teamBanner _id",
			})
			.select("divisionName teams city")
			.exec();

		if (!divisions.length) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		const divisionsWithStats = divisions.map((division) => {
			const teamsWithStats = division.teams.map((team) => {
				const { wins, losses, pointDifference, teamName, teamNameShort, _id } =
					team;
				const gp = wins + losses;
				const wpct = gp === 0 ? 0 : wins / gp;

				return {
					teamName,
					teamNameShort,
					wins,
					losses,
					pointDifference,
					gp,
					wpct,
					_id,
				};
			});

			return {
				_id: division._id,
				divisionName: division.divisionName,
				city: division.city,
				teams: teamsWithStats,
			};
		});

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
 * Retrieves all active divisions with their associated teams and statistics.
 *
 * @return {Promise} A Promise that resolves with the divisions and their associated statistics.
 */

export const getAllDivisionsWithTeamsByActiveSeason = async () => {
	try {
		const selectedSeason = await Season.findOne({ active: true });

		if (!selectedSeason) {
			return NextResponse.json(
				{ message: "No active season found" },
				{ status: 404 }
			);
		}

		const divisions = await Division.find({ season: selectedSeason._id })
			.populate({
				path: "teams",
				select:
					"teamName wins losses pointDifference teamBanner seasonStatistics _id",
				populate: {
					path: "seasonStatistics.game", // Populate the game field inside seasonStatistics
					select: "gameName homeTeam awayTeam homeTeamScore awayTeamScore", // Select the relevant fields from game
					populate: [
						{ path: "homeTeam", select: "teamName" }, // Populate homeTeam with teamName
						{ path: "awayTeam", select: "teamName" }, // Populate awayTeam with teamName
					],
				},
			})
			.select("divisionName teams city")
			.exec();

		if (!divisions.length) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		const divisionsWithStats = divisions.map((division) => {
			const teamsWithStats = division.teams.map((team) => {
				const {
					wins,
					losses,
					pointDifference,
					teamName,
					_id,
					seasonStatistics,
				} = team;
				const gp = wins + losses;
				const wpct = gp === 0 ? 0 : wins / gp;

				// Calculate streak based on last 3 games
				const lastThreeGames = seasonStatistics.slice(-3); // Get the last 3 games
				let winStreak = 0;
				let lossStreak = 0;

				lastThreeGames.forEach((game) => {
					// Ensure that game, game.game, and team IDs exist
					if (!game || !game.game) {
						// console.error("Missing game or game details:", game);
						return;
					}

					// Check if homeTeam and awayTeam exist
					const homeTeamExists = game.game.homeTeam?._id;
					const awayTeamExists = game.game.awayTeam?._id;

					if (!homeTeamExists || !awayTeamExists) {
						// console.error("Missing homeTeam or awayTeam in game:", game);
						return;
					}

					const isWin =
						(game.game.homeTeam._id.equals(team._id) &&
							game.game.homeTeamScore > game.game.awayTeamScore) ||
						(game.game.awayTeam._id.equals(team._id) &&
							game.game.awayTeamScore > game.game.homeTeamScore);

					// Increment wins or losses accordingly
					if (isWin) {
						winStreak++;
					} else {
						lossStreak++;
					}
				});

				// Combine wins and losses into the final streak string
				const streak = `${winStreak}-${lossStreak}`;

				return {
					teamName,
					wins,
					losses,
					pointDifference,
					gp,
					wpct,
					streak,
					_id,
				};
			});

			return {
				_id: division._id,
				divisionName: division.divisionName,
				city: division.city,
				teams: teamsWithStats,
			};
		});

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
 * Retrieves all active divisions with their associated teams and statistics.
 *
 * @return {Promise} A Promise that resolves with the divisions and their associated statistics.
 */

export const getAllDivisionsWithTeamsBySeasonId = async (seasonId) => {
	try {
		const selectedSeason = await Season.findById(seasonId).exec();

		if (!selectedSeason) {
			return NextResponse.json(
				{ message: "No active season found" },
				{ status: 404 }
			);
		}

		const divisions = await Division.find({ season: selectedSeason._id })
			.populate({
				path: "teams",
				select: "teamName wins losses pointDifference teamBanner _id",
			})
			.select("divisionName teams city")
			.exec();

		if (!divisions.length) {
			return NextResponse.json(
				{ message: "No divisions found" },
				{ status: 404 }
			);
		}

		const divisionsWithStats = divisions.map((division) => {
			const teamsWithStats = division.teams.map((team) => {
				const { wins, losses, pointDifference, teamName, _id } = team;
				const gp = wins + losses;
				const wpct = gp === 0 ? 0 : wins / gp;

				return {
					teamName,
					wins,
					losses,
					pointDifference,
					gp,
					wpct,
					_id,
				};
			});

			return {
				_id: division._id,
				divisionName: division.divisionName,
				city: division.city,
				teams: teamsWithStats,
			};
		});

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
 * Retrieves all current divisions with their associated team names and colors.
 *
 * @return {Promise} A Promise that resolves with the divisions and team details.
 */
export const getAllCurrentDivisionsWithTeamNames = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsWithTeamNames = await Division.find({
			season: activeSeason,
		})
			.populate("teams", "teamName primaryColor secondaryColor tertiaryColor")
			.select("divisionName city _id teams");
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
 * Retrieves all current divisions with their associated team names and colors.
 *
 * @return {Promise} A Promise that resolves with the divisions and team details.
 */
export const getAllDivisionsWithTeamNamesBySeasonId = async (
	seasonId: string
) => {
	try {
		const selectedSeason = await Season.findById(seasonId).exec();

		if (!selectedSeason) {
			return NextResponse.json(
				{ message: "No active season found" },
				{ status: 404 }
			);
		}

		// Use select to retrieve only divisionName and _id fields
		const divisionsWithTeamNames = await Division.find({
			season: selectedSeason,
		})
			.populate("teams", "teamName primaryColor secondaryColor tertiaryColor")
			.select("divisionName city _id teams");
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
 * Retrieves all the current divisions' names and their corresponding IDs.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 * The NextResponse object contains the divisions' names and IDs if found, or an error message and status code.
 */
export const getAllCurrentDivisionsNameAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsNameAndId = await Division.find({
			season: activeSeason,
		}).select("divisionName _id");

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
 * Retrieves all the current divisions' names and their corresponding IDs.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 * The NextResponse object contains the divisions' names and IDs if found, or an error message and status code.
 */
export const getAllDivisionsNameAndIdBySeasonId = async (seasonId: string) => {
	try {
		const activeSeason = await Season.findById(seasonId);
		// Use select to retrieve only divisionName and _id fields
		const divisionsNameAndId = await Division.find({
			season: activeSeason,
		}).select("divisionName _id");

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
 * Retrieves all the current divisions' names and their corresponding IDs.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 * The NextResponse object contains the divisions' names and IDs if found, or an error message and status code.
 */
export const getAllDivisionsNameAndIdByDivisionId = async (
	divisionId: string
) => {
	try {
		const activeDivision = await Division.findById(divisionId);

		// Use select to retrieve only divisionName and _id fields
		const divisionsNameAndId = await Division.find({
			season: activeDivision.season.toString(),
		}).select("divisionName _id season");

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
			"divisionName location day startTime endTime earlyBirdPrice regularPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId season earlyBirdInstalmentId season instalmentPrice earlyBirdTeamPrice  earlyBirdTeamPriceId regularTeamPrice regularTeamPriceId firstInstalmentPrice firstInstalmentPriceId"
		);

	if (!division) {
		return NextResponse.json({ message: "No division found" }, { status: 404 });
	}

	return NextResponse.json({ division });
};
