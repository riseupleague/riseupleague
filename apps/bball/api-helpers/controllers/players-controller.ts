import { NextResponse } from "next/server";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";
import { type } from "os";

// type PipelineStage =
// 	| {
// 			$search: {
// 				index: string;
// 				text: {
// 					query: string;
// 					fuzzy: {};
// 					path: {
// 						wildcard: string;
// 					};
// 				};
// 			};
// 	  }
// 	| {
// 			$skip: number;
// 	  }
// 	| {
// 			$limit: number;
// 	  };

// const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }];
// pipeline.unshift({
// 	$search: {
// 		index: "search",
// 		text: {
// 			query,
// 			fuzzy: {},
// 			path: {
// 				wildcard: "*",
// 			},
// 		},
// 	},
// });

type PlayerFilter = {
	team?: string | undefined;
	division?: string | undefined;
	season: any[]; // Update this to the appropriate type
};

export const getAllCurrentPlayers = async ({
	page = 1,
	limit = 20,
	query,
	team, // Team parameter
	division, // Division parameter
}: {
	query?: string;
	page: number;
	limit: number;
	team?: string; // Team parameter
	division?: string; // Division parameter
}) => {
	try {
		const activeSeason = await Season.find({ active: "true" });
		// Get the total number of records that match the query criteria

		const skip = (page - 1) * limit;

		if (query) {
			const allPlayers = await Player.find(
				{
					season: activeSeason, // Include the activeSeason filter

					$text: {
						$search: query,
						$caseSensitive: false,
						$diacriticSensitive: false,
					},
				},
				{ score: { $meta: "textScore" }, _id: 1 } // Specify the projection here
			)
				.sort({ score: { $meta: "textScore" } })
				.populate([
					{ path: "division", select: "divisionName" },
					{ path: "team", select: "teamName" },
				])
				.select("playerName team jerseyNumber division")
				.limit(50);

			return NextResponse.json({ allPlayers, totalPages: 0 });
		} else {
			// Regular query with additional filters
			const filter: PlayerFilter = {
				season: activeSeason, // Always filter by active season
			};

			// Add other filters only if they are provided
			if (team !== "") {
				filter.team = team;
			}

			if (division !== "") {
				filter.division = division;
			}
			const allPlayers = await Player.find(filter)
				.sort({ playerName: 1 })
				.populate([
					{ path: "division", select: "divisionName" },
					{ path: "team", select: "teamName" },
				])
				.select("playerName team jerseyNumber division")
				.limit(limit)
				.skip(skip);

			const totalRecords = await Player.countDocuments(filter);

			// Calculate the total number of pages
			const totalPages = Math.ceil(totalRecords / limit);

			return NextResponse.json({ allPlayers, totalPages });
		}
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getPlayerById = async (playerId: string) => {
	try {
		const player = await Player.findById({ playerId });

		if (!player) {
			return NextResponse.json(
				{ message: "Player not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ player }, { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
