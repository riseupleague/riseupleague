import HomeLatestGames from "../games/HomeLatestGames";
import Link from "next/link";
import { Button } from "@ui/components/button";

export default function LatestGames({ games }): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
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
}
