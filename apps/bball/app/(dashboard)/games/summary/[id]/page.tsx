import { getGameById } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import SummaryBoxScore from "@/components/games/summary/SummaryBoxScore";
import Link from "next/link";
import { format } from "date-fns";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLiveGame, extractYoutubeLink } from "@utils/utils";
import { utcToZonedTime } from "date-fns-tz";

export default async function Summary({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resGame = await getGameById(id);
	const { game } = await resGame.json();

	// if game hasn't started, redirect to /preview/[id] page
	if (!game?.started) redirect(`/games/preview/${game._id}`);

	const date = new Date(game.date);
	const estDate = utcToZonedTime(date, "America/Toronto");

	const day = format(estDate, "EEE");
	const monthDay = format(estDate, "P").slice(0, 5);
	const time = format(estDate, "h:mm a");

	const liveGame = isLiveGame(date);

	return (
		<section className="container mx-auto min-h-fit">
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
							href={`/teams/team/${game.homeTeam._id}`}
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
							href={`/teams/team/${game.awayTeam._id}`}
							className="my-2 text-3xl font-bold hover:underline"
						>
							{game.awayTeam.teamNameShort}
						</Link>
						<h5>
							{game.awayTeam.wins} - {game.awayTeam.losses}
						</h5>
					</div>
				</div>

				{/* video */}
				{game?.youtubeLink && (
					<div className="my-6 md:my-24">
						<iframe
							className="aspect-video w-full"
							src={`https://www.youtube.com/embed/${extractYoutubeLink(game.youtubeLink)}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Embedded youtube"
						></iframe>
					</div>
				)}

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
