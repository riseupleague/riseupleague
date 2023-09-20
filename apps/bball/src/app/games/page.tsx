import { getAllUpcomingGames } from "@/src/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/src/api-helpers/utils";
import ScheduleFilterPage from "@/src/components/games/ScheduleFilterPage";

import { Suspense } from "react";

export default async function Games(): Promise<JSX.Element> {
	await connectToDatabase();

	const resAllUpcomingGames = await getAllUpcomingGames();
	const { allUpcomingGames } = await resAllUpcomingGames.json();

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<h1 className="font-oswald my-8 text-3xl  font-medium uppercase">
				games page
			</h1>
			<Suspense fallback={"loading data..."}>
				<ScheduleFilterPage allUpcomingGames={allUpcomingGames} />
			</Suspense>
		</section>
	);
}
