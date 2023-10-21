import {
	getAllPastGames,
	getAllUpcomingGames,
} from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import React from "react";

import FutureGames from "./FutureGames";

export default async function SecondaryHeader(): Promise<React.JSX.Element> {
	await connectToDatabase();
	const resUpcoming = await getAllUpcomingGames();
	const { allUpcomingGames } = await resUpcoming.json();
	const resPast = await getAllPastGames();
	const { allPastGames } = await resPast.json();
	const allGames = [...allPastGames, ...allUpcomingGames];

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
		const existingDateObject = separatedGames.find(
			(obj) => obj.date === formattedDate
		);

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
