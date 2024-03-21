import { getGameById } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PreviewMatchup from "@/components/games/preview/PreviewMatchup";
import Link from "next/link";
import { format } from "date-fns";
import { convertToEST } from "@/utils/convertToEST";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Preview({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resGame = await getGameById(id);
	const { game } = await resGame.json();

	// if game is done, redirect to /summary/[id] page
	if (game?.status) redirect(`/games/summary/${game._id}`);

	const date = convertToEST(new Date(game.date));
	const formattedDate = format(date, "E L/d @ h:mm a");

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
							href={`/teams/${game.homeTeam?._id}`}
							className="my-2 text-3xl font-bold hover:underline"
						>
							{game.homeTeam?.teamNameShort}
						</Link>
						<h5>
							{game.homeTeam?.wins} - {game.homeTeam?.losses}
						</h5>
					</div>

					{/* game info */}
					<div className="font-oswald my-4 flex w-full flex-col items-center text-center">
						<h4>{formattedDate}</h4>
						<h6>{game.location}</h6>
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
							href={`/teams/${game.awayTeam?._id}`}
							className="my-2 text-3xl font-bold hover:underline"
						>
							{game.awayTeam?.teamNameShort}
						</Link>
						<h5>
							{game.awayTeam?.wins} - {game.awayTeam?.losses}
						</h5>
					</div>
				</div>

				<hr />

				{/* preview matchup */}
				<div className="my-10">
					<PreviewMatchup game={game} />
				</div>
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Preview",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata({ params }) {
// 	const { id } = params;
// 	const resGame = await getGameById(id);
// 	const { game } = await resGame.json();

// 	return {
// 		title: `Rise Up League | ${game.gameName}`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }
