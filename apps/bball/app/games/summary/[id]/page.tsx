import { getGameById } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import SummaryBoxScore from "@/components/games/summary/SummaryBoxScore";
import Link from "next/link";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";
import { Metadata } from "next";

export default async function Summary({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resGame = await getGameById(id);
	const { game } = await resGame.json();

	const date = convertToEST(new Date(game.date));
	const day = date.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const monthDay = date.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
	const time = format(date, "h:mm a");

	const liveGame = isLiveGame(date);

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<div className="mb-8 mt-16">
				<h1>{game.gameName}</h1>

				<div className="font-oswald my-8 flex w-full items-center justify-center md:gap-16">
					{/* home team */}
					<div className="flex w-full flex-col items-center">
						<h2
							className={`my-4 ${
								game.homeTeamScore > game.awayTeamScore && "text-primary"
							}`}
						>
							{game.homeTeamScore}
						</h2>
						<Link
							href={`/teams/${game.homeTeam._id}`}
							className="my-2 text-3xl font-bold hover:underline"
						>
							{game.homeTeam.teamNameShort}
						</Link>
						<h5>
							{game.homeTeam.wins} - {game.homeTeam.losses}
						</h5>
					</div>

					{/* game info */}
					<div className="font-oswald my-4 flex w-full flex-col items-center text-center">
						<h2 className={`${liveGame && "text-primary"} my-8`}>
							{liveGame ? "LIVE" : "Final"}
						</h2>
						<h4>
							{day} {monthDay} @ {time}
						</h4>
						<h5>{game.location}</h5>
					</div>

					{/* away team */}
					<div className="flex w-full flex-col items-center">
						<h2
							className={`my-4 ${
								game.awayTeamScore > game.homeTeamScore && "text-primary"
							}`}
						>
							{game.awayTeamScore}
						</h2>
						<Link
							href={`/teams/${game.awayTeam._id}`}
							className="my-2 text-3xl font-bold hover:underline"
						>
							{game.awayTeam.teamNameShort}
						</Link>
						<h5>
							{game.awayTeam.wins} - {game.awayTeam.losses}
						</h5>
					</div>
				</div>

				<hr />

				{/* box score */}
				<div className="my-10">
					<SummaryBoxScore game={game} />
				</div>
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Summary",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata({ params }) {
// 	await connectToDatabase();

// 	const { id } = params;
// 	const resGame = await getGameById(id);
// 	const { game } = await resGame.json();

// 	return {
// 		title: `Rise Up League | ${game.gameName}`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }

const isLiveGame = (date) => {
	const HOUR = 1000 * 60 * 60;
	const anHourAgo = Date.now() - HOUR;

	return date > anHourAgo && Date.now() > date;
};
