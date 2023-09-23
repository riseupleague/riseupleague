import { getAllPlayersOfTheWeek } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import FeaturedPlayerCard from "../general/FeaturedPlayerCard";

export default async function PlayersOfTheWeek(): Promise<JSX.Element> {
	await connectToDatabase();
	const resAllPlayersOfTheWeek = await getAllPlayersOfTheWeek();
	const { allPlayersOfTheWeek } = await resAllPlayersOfTheWeek.json();
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="px-4 py-2.5 text-3xl uppercase">players of the week</h2>
			<hr className="bg-neutral-600" />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 2xl:grid-cols-4">
				<div className="flex flex-col">
					{allPlayersOfTheWeek.map((player, index) => {
						if (player.playerOfTheGame) {
							return <FeaturedPlayerCard player={player} key={index} />;
						}
					})}
				</div>
			</div>
		</section>
	);
}
