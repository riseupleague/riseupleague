import HomeLatestGames from "../games/HomeLatestGames";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllPastGames } from "@/api-helpers/controllers/games-controller";
import { unstable_noStore as noStore } from "next/cache";
import { addDays, addHours, endOfDay, startOfDay } from "date-fns";
import Game from "@/api-helpers/models/Game";
import { Separator } from "@ui/components/separator";
import NewScheduleCard from "../games/NewScheduleCard";
import HomeScheduleCard from "../games/HomeScheduleCard";

const HomeUpcomingGames = async (): Promise<JSX.Element> => {
	noStore();

	await connectToDatabase();
	const date = new Date(); // Use the current date (Date.now())
	const endDate = addDays(startOfDay(date), 7); // Set the end date to 7 days from the current date

	// Query for games from the current date to the end of the week, and where status is false (not started)
	const games = await Game.find({
		date: {
			$gte: addHours(startOfDay(date), 5), // Start from the current date
			$lt: addHours(endOfDay(endDate), 5), // Up to the end of the 7-day range
		},
		status: false, // Only games that haven't started
	})
		.populate({
			path: "division",
			select: "divisionName city",
		})
		.populate({
			path: "homeTeam",
			select:
				"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
		})
		.populate({
			path: "awayTeam",
			select:
				"teamName teamNameShort wins losses primaryColor secondaryColor tertiaryColor",
		})
		.select(
			"status homeTeam awayTeam division date gameName homeTeamScore awayTeamScore location"
		)
		.sort({ date: 1 }) // Sort by date (earliest first)
		.limit(4); // Only retrieve the first 4 games

	const gamesByDate =
		games &&
		games.reduce((acc, game) => {
			const date = new Date(game.date).toLocaleDateString("en-US", {
				timeZone: "America/Toronto",
				month: "short",
				day: "2-digit",
				weekday: "long",
			});
			const existingGames = acc.find((d) => d.date === date);

			if (existingGames) existingGames.games.push(game);
			else acc.push({ date, games: [game] });

			return acc;
		}, []);

	// Sort the games within each date entry by time
	gamesByDate.forEach((dateEntry) => {
		dateEntry.games.sort((a, b) => {
			const timeA = new Date(a.date).getTime();
			const timeB = new Date(b.date).getTime();
			return timeA - timeB;
		});
	});

	return (
		<section className="font-barlow mb-8 w-full text-neutral-100">
			<h3 className="my-4">Upcoming games</h3>
			<div className="my-6">
				{games?.map((game, index) => (
					<HomeScheduleCard game={game} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomeUpcomingGames;
