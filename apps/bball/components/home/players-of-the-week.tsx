import FeaturedPlayerCard from "../general/FeaturedPlayerCard";

export default function PlayersOfTheWeek({ players }): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">players of the week</h3>
			<hr />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
				{players.map((player, index) => (
					<FeaturedPlayerCard player={player} key={index} />
				))}
			</div>
		</section>
	);
}
