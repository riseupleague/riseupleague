import { getAllUpcomingGames } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import HomeLatestGames from "../games/HomeLatestGames";
import Link from "next/link";
import { Button } from "@ui/components/button";

export default function LatestGames({ games }): JSX.Element {
	console.log("hello", games);
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">latest games</h2>
			<hr className="-mx-2 mb-4 border-neutral-600" />
			<HomeLatestGames games={games} />
			<div className="my-9">
				<Link href="/games" className="w-full">
					<Button variant="secondary" className="w-full">
						View All
					</Button>
				</Link>
			</div>
		</section>
	);
}
