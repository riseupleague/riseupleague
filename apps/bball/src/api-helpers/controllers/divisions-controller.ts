import mongoose from "mongoose";
import Team from "@/src/api-helpers/models/Team";
import Division from "@/src/api-helpers/models/Division";
import Season from "@/src/api-helpers/models/Season";
import { NextResponse } from "next/server";

type Season = {
	_id: string;
	seasonName: string;
	active: boolean;
	divisions: string[];
	__v: number;
};

// Define the type for a Division object
type Division = {
	_id: string; // Assuming _id is a string
	divisionName: string;
	season: string; // Assuming season is a string (ObjectId.toString())
	teams: any[]; // An array of Team objects
};
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

export const getAllCurrentDivisionsWithTeams = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		const divisions = await Division.find({ season: activeSeason })
			.populate("teams", "teamName wins losses pointDifference teamBanner")
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

		console.log("divisions:", divisionsWithStats);

		return NextResponse.json({ divisionsWithStats });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

// export const getDivisionFromId = async (id) => {
// 	try {
// 		let division;
// 		if (req.query.name) {
// 			division = await Division.findById(id)
// 				.populate({ path: "teams", select: "teamName players" })
// 				.select("divisionName season teams");
// 		} else {
// 			division = await Division.findById(id).populate("teams");
// 		}
// 		if (!division) {
// 			return NextResponse.json(
// 				{ message: "Internal Server Error" },
// 				{ status: 500 }
// 			);
// 		}

// 		return NextResponse.json({ division }, { status: 200 });
// 	} catch (error) {
// 		return NextResponse.json({ message: error.message }, { status: 500 });
// 	}
// };
