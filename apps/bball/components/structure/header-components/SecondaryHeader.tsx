import { getAllUpcomingGamesHeader } from "@/api-helpers/controllers/games-controller";
import FutureGames from "./FutureGames";
import { unstable_noStore as noStore } from "next/cache";

const SecondaryHeader = async (): Promise<JSX.Element> => {
	noStore();

	const resUpcoming = await getAllUpcomingGamesHeader();
	const { allUpcomingGames } = await resUpcoming.json();

	return (
		<section className="font-oswald max-w-screen border border-x-neutral-900 border-y-neutral-600">
			<FutureGames allUpcomingGames={allUpcomingGames} />
		</section>
	);
};

export default SecondaryHeader;
