import { getAllPlayers } from "@/src/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/src/api-helpers/utils";
import PlayerGrid from "@/src/components/players/PlayerGrid";
import { Suspense } from "react";

export default async function Players(): Promise<JSX.Element> {
	await connectToDatabase();
	const res = await getAllPlayers();
	const { allPlayers } = await res.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				players page
			</h1>
			<Suspense fallback={"loading data..."}>
				<PlayerGrid allPlayers={allPlayers} />
			</Suspense>
		</section>
	);
}
