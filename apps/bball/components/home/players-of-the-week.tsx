import { getAllPlayersOfTheWeek } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import FeaturedPlayerCard from "../general/FeaturedPlayerCard";

export default async function PlayersOfTheWeek(): Promise<JSX.Element> {
	await connectToDatabase();

	const resAllPlayersOfTheWeek = await getAllPlayersOfTheWeek();
	const { allPlayersOfTheWeek } = await resAllPlayersOfTheWeek.json();
	const featuredPlayers = allPlayersOfTheWeek.filter(
		(player) => player.playerOfTheGame
	);

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">players of the week</h2>
			<hr className="-mx-2 mb-4 border-neutral-600" />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
				{featuredPlayers
					.slice(featuredPlayers.length - 4)
					.map((player, index) => (
						<FeaturedPlayerCard
							player={player.playerOfTheGame}
							division={player.division.divisionName}
							key={index}
						/>
					))}
			</div>
		</section>
	);
}
