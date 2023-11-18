import {
	getAllUpcomingGamesHeader,
} from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import React from "react";
import { format, addDays, getISODay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import FutureGames from "./FutureGames";
import { convertToEST } from "@/utils/convertToEST";

export default async function SecondaryHeader(): Promise<React.JSX.Element> {
	await connectToDatabase();

	const currentDate = convertToEST(new Date());

	// Find the next Saturday
	const nextSaturday = addDays(
		currentDate,
		(6 - getISODay(currentDate) + 7) % 7
	);
	const formattedNextSaturday = format(nextSaturday, "eee, MMM d");

	// Find the next Sunday
	const nextSunday = addDays(currentDate, (7 - getISODay(currentDate) + 7) % 7);
	const formattedNextSunday = format(nextSunday, "eee, MMM d");

	// Find the next Monday
	const nextMonday = addDays(currentDate, (8 - getISODay(currentDate) + 7) % 7);
	const formattedNextMonday = format(nextMonday, "eee, MMM d");

	const resUpcoming = await getAllUpcomingGamesHeader();
	const { allUpcomingGames } = await resUpcoming.json();

	const allGames = [...allUpcomingGames];
	const separatedGames = [];

	allGames.forEach((game) => {
		const gameDate = convertToEST(new Date(game.date));
		const month = format(gameDate, "MMM")
		const day = format(gameDate, "d")
		const formattedDate = `${month} ${day}`;

		// Check if there's an object with the same date, if not, create one
		const existingDateObject = separatedGames.find((obj) => {
			return obj.date === formattedDate;
		});

		if (existingDateObject) {
			existingDateObject.games.push(game);
		} else {
			const newDateObject = { date: formattedDate, games: [game] };
			separatedGames.push(newDateObject);
		}
	});

	return (
		<section className="font-oswald max-w-screen border border-x-neutral-900 border-y-neutral-600">
			<FutureGames separatedGames={separatedGames} />
		</section>
	);
}
