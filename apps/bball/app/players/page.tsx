import { getAllCurrentPlayers } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerGrid from "@/components/players/PlayerGrid";

export default async function Players(): Promise<JSX.Element> {
	await connectToDatabase();
	const res = await getAllCurrentPlayers();
	const { allPlayers } = await res.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				league roster
			</h1>
			<PlayerGrid allPlayers={allPlayers} />
		</section>
	);
}
