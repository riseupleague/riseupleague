import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import { connectToDatabase } from "@/api-helpers/utils";
import { parse, startOfDay, endOfDay, addHours } from "date-fns";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		await connectToDatabase();
		// Parse the date string to a Date object using date-fns
		// const date = parse(req.query.date as string, "EEE dd MMM yy", new Date(), {
		// 	timeZone: "America/Toronto",
		// });

		const date = parse(req.query.date as string, "EEE dd MMM yy", new Date());

		// Filter games by the date
		const games = await Game.find({
			date: {
				$gte: addHours(startOfDay(date), 5),
				$lt: addHours(endOfDay(date), 5),
			},
		})
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select: "teamName teamNameShort wins losses",
			})
			.populate({
				path: "awayTeam",
				select: "teamName teamNameShort wins losses",
			})
			.select(
				"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore location"
			);
		if (games) {
			return NextResponse.json({ games });
		} else {
			return NextResponse.json({ message: "No games found" }, { status: 404 });
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
