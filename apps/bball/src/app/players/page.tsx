import { getAllPlayers } from "@/src/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/src/api-helpers/utils";
import PlayerCard from "@/src/components/general/PlayerCard";

export default async function Players(): Promise<JSX.Element> {
	await connectToDatabase();
	const res = await getAllPlayers();
	const { allPlayers } = await res.json();

	return (
		<section className="container mx-auto min-h-screen">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				players page
			</h1>
			<div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 2xl:grid-cols-4">
				{allPlayers.map((player, index) => (
					<PlayerCard player={player} key={index} />
				))}
			</div>
		</section>
	);
}
