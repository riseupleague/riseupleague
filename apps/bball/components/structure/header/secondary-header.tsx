import {
	getAllPastGames,
	getAllUpcomingGames,
	getAllUpcomingGamesHeader,
} from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import React from "react";
import { format, addDays, getISODay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import FutureGames from "./FutureGames";

export default async function SecondaryHeader(): Promise<React.JSX.Element> {
	await connectToDatabase();
	// const resUpcoming = await getAllUpcomingGames();
	// const { allUpcomingGames } = await resUpcoming.json();
	// const resPast = await getAllPastGames();
	// const { allPastGames } = await resPast.json();
	// const allGames = [...allPastGames, ...allUpcomingGames];
	// const separatedGames = [];

	// Set the Toronto time zone
	const torontoTimeZone = "America/Toronto";

	// Get the current date in Toronto time zone
	const currentDate = utcToZonedTime(new Date(), torontoTimeZone);

	// Format the current date as "eee, MMM d"
	const formattedCurrentDate = format(currentDate, "eee, MMM d");

	console.log("Current Date:", formattedCurrentDate);

	// Find the next Saturday
	const nextSaturday = addDays(
		currentDate,
		(6 - getISODay(currentDate) + 7) % 7
	);
	const formattedNextSaturday = format(nextSaturday, "eee, MMM d");

	console.log("Next Saturday:", formattedNextSaturday);

	// Find the next Sunday
	const nextSunday = addDays(currentDate, (7 - getISODay(currentDate) + 7) % 7);
	const formattedNextSunday = format(nextSunday, "eee, MMM d");
	console.log("Next Sunday:", nextSunday);

	console.log("Next Sunday:", formattedNextSunday);

	// Find the next Monday
	const nextMonday = addDays(currentDate, (8 - getISODay(currentDate) + 7) % 7);
	const formattedNextMonday = format(nextMonday, "eee, MMM d");

	console.log("Next Monday:", formattedNextMonday);

	const resUpcoming = await getAllUpcomingGamesHeader([
		currentDate,
		nextSaturday,
		nextSunday,
		nextMonday,
	]);
	const { allUpcomingGames } = await resUpcoming.json();

	console.log("allUpcomingGames:", allUpcomingGames);

	const allGames = [...allUpcomingGames];
	const separatedGames = [];

	allGames.forEach((game) => {
		const gameDate = new Date(game.date);
		const month = gameDate.toLocaleString("en-US", {
			timeZone: "America/Toronto",
			month: "short",
		});

		const day = gameDate.getDate();
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
		<section className="font-oswald max-w-screen  border border-x-neutral-900 border-y-neutral-600">
			<FutureGames separatedGames={separatedGames} />
		</section>
	);
}
