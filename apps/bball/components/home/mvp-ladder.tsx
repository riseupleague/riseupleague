import { connectToDatabase } from "@/api-helpers/utils";
import { getAllPlayersOfTheWeek } from "@/api-helpers/controllers/games-controller";
import MVPLadderCard from "./mvp-player-ladder/MVPLadderCard";

export default async function MVPLadder(): Promise<JSX.Element> {
	await connectToDatabase();

	const resAllPlayersOfTheWeek = await getAllPlayersOfTheWeek();
	const { allPlayersOfTheWeek } = await resAllPlayersOfTheWeek.json();
	const featuredPlayers = allPlayersOfTheWeek.filter(
		(player) => player.playerOfTheGame
	);

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">mvp ladder</h2>
			<hr className="border-neutral-600" />
			<div className="my-4 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
				{featuredPlayers.slice(0, 4).map((player, index) => (
					<MVPLadderCard
						player={player.playerOfTheGame}
						key={index}
						index={index}
					/>
				))}
			</div>
		</section>
	);
}
