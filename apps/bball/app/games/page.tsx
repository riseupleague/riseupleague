import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import { getAllCurrentTeamsNameDivisionAndId } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";

export default async function Games({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const page =
		typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

	const limit =
		typeof searchParams.limit === "string" ? Number(searchParams.limit) : 50;

	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;

	const team = typeof searchParams.team === "string" ? searchParams.team : "";

	const division =
		typeof searchParams.division === "string" ? searchParams.division : "";

	// Construct a filter object based on query parameters
	const filters = { page, limit, query: search, team, division };

	const resAllUpcomingGames = await getGamesByDate(division, team);
	const { gamesByDate } = await resAllUpcomingGames.json();
	const resAllCurrentDivisionsNameAndId =
		await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resAllCurrentDivisionsNameAndId.json();
	const resAllCurrentTeamsNameDivisionAndId =
		await getAllCurrentTeamsNameDivisionAndId(division);
	const { teamsNameDivisionAndId } =
		await resAllCurrentTeamsNameDivisionAndId.json();

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<h1 className="font-oswald my-8 text-3xl  font-medium uppercase">
				games page
			</h1>
			<ScheduleFilterPage
				gamesByDate={gamesByDate}
				// page={page}
				// totalPages={totalPages}
				team={team}
				division={division}
				divisionsNameAndId={divisionsNameAndId}
				teamsNameDivisionAndId={teamsNameDivisionAndId}
			/>
		</section>
	);
}
