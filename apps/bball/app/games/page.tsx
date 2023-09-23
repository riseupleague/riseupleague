import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { getAllUpcomingGames } from "@/api-helpers/controllers/games-controller";
import { getAllCurrentTeamsNameDivisionAndId } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";

import { Suspense } from "react";

export default async function Games(): Promise<JSX.Element> {
	await connectToDatabase();

	const resAllUpcomingGames = await getAllUpcomingGames();
	const { allUpcomingGames } = await resAllUpcomingGames.json();
	const resAllCurrentDivisionsNameAndId =
		await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resAllCurrentDivisionsNameAndId.json();
	const resAllCurrentTeamsNameDivisionAndId =
		await getAllCurrentTeamsNameDivisionAndId();
	const { teamsNameDivisionAndId } =
		await resAllCurrentTeamsNameDivisionAndId.json();
	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<h1 className="font-oswald my-8 text-3xl  font-medium uppercase">
				games page
			</h1>
			<Suspense fallback={"loading data..."}>
				<ScheduleFilterPage
					allUpcomingGames={allUpcomingGames}
					divisionsNameAndId={divisionsNameAndId}
					teamsNameDivisionAndId={teamsNameDivisionAndId}
				/>
			</Suspense>
		</section>
	);
}
