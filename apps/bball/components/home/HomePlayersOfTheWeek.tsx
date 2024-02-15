import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import { getAllRecentPlayerOfTheGames } from "@/api-helpers/controllers/games-controller";
import { unstable_noStore as noStore } from "next/cache";

const HomePlayersOfTheWeek = async (): Promise<JSX.Element> => {
	noStore();

	const resGames2 = await getAllRecentPlayerOfTheGames();
	const data = await resGames2.json();
	const playerOfTheGames = data.games
		?.map((game) => ({
			...game.playerOfTheGame,
			currentGame: game._id,
			potg: game.potg,
		}))
		.filter((player) => {
			if (player._id !== undefined) {
				const currentGame = player.allStats.find((stat) => {
					return stat.game === player.currentGame;
				});
				if (currentGame) {
					const total =
						currentGame.points +
						currentGame.rebounds +
						currentGame.assists +
						currentGame.blocks +
						currentGame.steals;

					if (Number(total) >= 35) {
						return player;
					}
				}
			}
			// If any condition fails or if player._id is undefined, return false
			return false;
		});

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
