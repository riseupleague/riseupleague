import { getGameById } from "@/api-helpers/controllers/games-controller";
import { getPlayerAllAvgFromId } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import SummaryBoxScore from "@/components/games/summary/SummaryBoxScore";
import AverageStatistics from "@/components/players/player/AverageStatistics";
import PlayerSections from "@/components/players/player/PlayerSections";
import PreviousGames from "@/components/players/player/PreviousGames";
import Link from "next/link";

export default async function Summary({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resGame = await getGameById(id);
	const { game } = await resGame.json();

	const isoDate = new Date(game.date);
	const day = isoDate.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const monthDay = isoDate.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
	const time = isoDate
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
		.replace(/\u202f/, " ");

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<div className="mb-8 mt-16">
				<h1 className="font-oswald text-center text-3xl font-medium uppercase">
					{game.gameName}
				</h1>

				<div className="font-oswald my-8 flex w-full items-center justify-center md:gap-16">
					{/* home team */}
					<div className="flex w-full flex-col items-center">
						<h3
							className={`my-4 text-5xl ${
								game.homeTeamScore > game.awayTeamScore && "text-primary"
							}`}
						>
							{game.homeTeamScore}
						</h3>
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
						<h2 className="my-8 text-5xl">Final</h2>
						<h3 className="text-sm md:text-xl">
							{day} {monthDay} @ {time}
						</h3>
						<h4 className="font-base md:text-md my-4 text-xs">
							{game.location}
						</h4>
					</div>

					{/* away team */}
					<div className="flex w-full flex-col items-center">
						<h3
							className={`my-4 text-5xl ${
								game.awayTeamScore > game.homeTeamScore && "text-primary"
							}`}
						>
							{game.awayTeamScore}
						</h3>
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

				<hr className="border-neutral-500" />

				{/* box score */}
				<div className="my-10">
					<SummaryBoxScore game={game} />
				</div>
			</div>
		</section>
	);
}
