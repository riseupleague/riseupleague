import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { getAllCurrentPlayers } from "@/api-helpers/controllers/players-controller";
import { getAllCurrentTeamsNameDivisionAndId } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerGrid from "@/components/players/PlayerGrid";

export default async function Players({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const teamsParams =
		typeof searchParams.teams === "string" ? searchParams.teams : "";

	const divisionsParams =
		typeof searchParams.divisions === "string" ? searchParams.divisions : "";

	// Construct a filter object based on query parameters

	const res = await getAllCurrentPlayers();
	const { allPlayers } = await res.json();

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
<<<<<<< HEAD
=======

>>>>>>> 27cb0bae8e81fec53a2bb31636a8ce4fb5ea5f7b
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
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-barlow mb-16 mt-8 text-center text-5xl font-medium uppercase">
				league roster
			</h1>
			<PlayerGrid
				allPlayers={allPlayers}
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
