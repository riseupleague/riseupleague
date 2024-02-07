import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import { getAllRecentPlayerOfTheGames } from "@/api-helpers/controllers/games-controller";
import { unstable_noStore as noStore } from "next/cache";

const HomePlayersOfTheWeek = async (): Promise<JSX.Element> => {
	noStore();

	const resGames = await getAllRecentPlayerOfTheGames();
	const { games } = await resGames.json();

	const playerOfTheGames = games
		?.map((game) => game.playerOfTheGame)
		.filter((player) => player !== undefined);

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">players of the week</h3>
			<hr />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
				{playerOfTheGames?.map((player, index) => (
					<FeaturedPlayerCard player={player} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomePlayersOfTheWeek;
