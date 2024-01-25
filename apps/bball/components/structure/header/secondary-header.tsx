import { getAllUpcomingGamesHeader } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import FutureGames from "./FutureGames";
import { unstable_noStore as noStore } from "next/cache";

export default async function SecondaryHeader(): Promise<JSX.Element> {
	noStore();

	await connectToDatabase();

	const resUpcoming = await getAllUpcomingGamesHeader();
	const { allUpcomingGames } = await resUpcoming.json();

	return (
		<section className="font-oswald max-w-screen border border-x-neutral-900 border-y-neutral-600">
			<FutureGames allUpcomingGames={allUpcomingGames} />
		</section>
	);
}
