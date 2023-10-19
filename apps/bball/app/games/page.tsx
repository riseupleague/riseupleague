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
	const teamsParams =
		typeof searchParams.teams === "string" ? searchParams.teams : "";

	const divisionsParams =
		typeof searchParams.divisions === "string" ? searchParams.divisions : "";

	const resAllUpcomingGames = await getGamesByDate();
	const { gamesByDate } = await resAllUpcomingGames.json();
	const resAllCurrentDivisionsNameAndId =
		await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resAllCurrentDivisionsNameAndId.json();
	const resAllCurrentTeamsNameDivisionAndId =
		await getAllCurrentTeamsNameDivisionAndId();
	const { teamsNameDivisionAndId } =
		await resAllCurrentTeamsNameDivisionAndId.json();

	// Split divisionParams into an array using ',' as the divider
	const divisionsArray = (divisionsParams as string).split(",");

	// Filter divisions from divisionsNameAndId that exist in divisionsArray
	const divisionsInUrl = divisionsNameAndId
		.filter((division) => divisionsArray.includes(division.divisionName))
		.map((division) => division.divisionName);

	const initialDivisionCheckboxState = {};
	if (divisionsInUrl.length > 0) {
		for (const division of divisionsInUrl) {
			initialDivisionCheckboxState[division] = true;
		}
	}
	// Split divisionParams into an array using ',' as the divider
	const teamsArray = (teamsParams as string).split(",");

	// Filter teams from teamsNameAndId that exist in teamsArray
	const teamsInUrl = teamsNameDivisionAndId
		.filter((team) => teamsArray.includes(team.teamName))
		.map((team) => team.teamName);

	const initialTeamCheckboxState = {};
	if (teamsInUrl.length > 0) {
		for (const team of teamsInUrl) {
			initialTeamCheckboxState[team] = true;
		}
	}

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<h1 className="font-oswald my-8 text-3xl  font-medium uppercase">
				games page
			</h1>
			<ScheduleFilterPage
				gamesByDate={gamesByDate}
				initialDivisionCheckboxState={initialDivisionCheckboxState}
				initialTeamCheckboxState={initialTeamCheckboxState}
				divisionParams={divisionsInUrl}
				teamsParams={teamsInUrl}
				divisionsNameAndId={divisionsNameAndId}
				teamsNameDivisionAndId={teamsNameDivisionAndId}
			/>
		</section>
	);
}
