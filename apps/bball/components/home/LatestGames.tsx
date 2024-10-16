import HomeLatestGames from "../games/HomeLatestGames";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllPastGames } from "@/api-helpers/controllers/games-controller";
import { unstable_noStore as noStore } from "next/cache";

const LatestGames = async (): Promise<JSX.Element> => {
	noStore();

	await connectToDatabase();

	const resGames = await getAllPastGames();
	const { games } = await resGames.json();

	return (
		<section className="font-barlow mb-8 w-full text-neutral-100 lg:w-1/2">
			<h3 className="my-6">latest games</h3>
			<hr />
			<HomeLatestGames games={games} />
			<div className="my-9">
				<Link href="/schedule" className="w-full">
					<Button variant="secondary" className="w-full">
						View All
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default LatestGames;
