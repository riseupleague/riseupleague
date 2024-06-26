import { NextResponse } from "next/server";
import Division from "@/api-helpers/models/Division";
import Season from "@/api-helpers/models/Season";
import Team from "@/api-helpers/models/Team";

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

export const getAllDivisionsWithId = async (seasonId: string) => {
	try {
		const divisions = await Division.find({ season: seasonId })
			.populate({
				path: "teams",
				select:
					"teamName teamNameShort players primaryColor secondaryColor tertiaryColor paid",
				populate: {
					path: "players", // assuming 'players' is the field in the 'teams' model referencing another model
					select: "playerName teamCaptain", // Select the fields you want to populate from the 'players' model
				},
			})
			.select(
				"divisionName season teams location city day startTime endTime earlyBirdPrice earlyBirdTeamPrice regularPrice regularTeamPrice regularTeamPriceId description earlyBirdOpen games"
			);

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

export const getAllRegisterDivisions = async () => {
	try {
		const registerSeason = await Season.find({ register: "true" });
		const divisions = await Division.find({ season: registerSeason }).select(
			"divisionName location day startTime endTime earlyBirdPrice earlyBirdTeamPrice regularTeamPrice regularTeamPriceId teams regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId"
		);

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

export const getCurrentDivisionFromIdWithTeams = async (id: string) => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		const division = await Division.findOne({ _id: id, season: activeSeason })
			.populate("teams", "teamName wins losses pointDifference teamBanner")
			.select("divisionName teams");

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
			};
		});

		// Now, you have the division with teams and stats in the 'teamsWithStats' variable
		const divisionWithStats = {
			_id: division._id,
			divisionName: division.divisionName,
			teams: teamsWithStats || [], // Ensure teams are an array (or an empty array if undefined)
		};

		if (!division) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ divisionWithStats }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};

export const getDivisionFromIdWithTeams = async (id: string) => {
	try {
		const division = await Division.findOne({ _id: id })
			.populate({
				path: "teams",
				select: "teamName _id players season division",
				populate: {
					path: "players", // assuming 'players' is the field in the 'teams' model referencing another model
					select: "playerName teamCaptain", // Select the fields you want to populate from the 'players' model
				},
			})
			.select(
				"divisionName season teamSchedule location city day startTime endTime earlyBirdPrice regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId earlyBirdTeamPrice regularTeamPrice regularTeamPriceId"
			);

		if (!division) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ division }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};

export const getDivisionFromIdWithGames = async (id: string) => {
	try {
		const division = await Division.findOne({ _id: id })
			.populate({
				path: "games",
				populate: [
					{
						path: "division", // assuming 'players' is the field in the 'teams' model referencing another model
						select: "divisionName city season", // Select the fields you want to populate from the 'players' model
					},
					{
						path: "homeTeam", // assuming 'players' is the field in the 'teams' model referencing another model
						select:
							"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor", // Select the fields you want to populate from the 'players' model
					},
					{
						path: "awayTeam", // assuming 'players' is the field in the 'teams' model referencing another model
						select:
							"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor", // Select the fields you want to populate from the 'players' model
					},
				],
				select:
					"status homeTeam awayTeam season division date gameName homeTeamScore awayTeamScore location week time day",
			})
			.populate("teams", "teamName")
			.select(
				"divisionName teams homeTeam season games teamSchedule location city day startTime endTime earlyBirdPrice regularPrice instalmentPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId earlyBirdTeamPrice regularTeamPrice regularTeamPriceId"
			);

		if (!division) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ division }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
};

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

export const getAllCurrentDivisionsNameAndId = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Use select to retrieve only divisionName and _id fields
		const divisionsNameAndId = await Division.find({
			season: activeSeason,
		}).select("divisionName _id");

		// Add "All Divisions" to the beginning of the array
		divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

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

export const getRegisterDivisionById = async (id: string) => {
	const division = await Division.findById(id)
		.populate({
			path: "teams",
			select:
				"teamName teamNameShort teamCode wins losses primaryColor secondaryColor tertiaryColor players paid",
			populate: {
				path: "players",
				select: "paid playerName jerseyNumber", // Select only the 'paid' field for players
			},
		})
		.select(
			"divisionName location day startTime endTime earlyBirdPrice regularPrice description earlyBirdOpen earlyBirdId regularPriceFullId regularPriceInstalmentId season earlyBirdInstalmentId earlyBirdTeamPrice regularTeamPrice regularTeamPriceId"
		);

	if (!division) {
		return NextResponse.json({ message: "No division found" }, { status: 404 });
	}

	return NextResponse.json({ division });
};
