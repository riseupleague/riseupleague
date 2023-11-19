"use client";

import FeaturedPlayerCard from "../general/FeaturedPlayerCard";

export default function PlayersOfTheWeek({ games }): JSX.Element {
	const playerOfTheGames = games
		?.map((game) => game.playerOfTheGame)
		.filter((player) => player !== undefined);

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">players of the week</h3>
			<hr />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
				{playerOfTheGames.map((player, index) => (
					<FeaturedPlayerCard player={player} key={index} />
				))}
			</div>
		</section>
	);
}
