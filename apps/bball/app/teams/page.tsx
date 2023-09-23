import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeamNames } from "@/api-helpers/controllers/divisions-controller";
import TeamsFilterPage from "@/components/teams/TeamsFilterPage";

export default async function Teams(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionsWithTeamNames = await getAllCurrentDivisionsWithTeamNames();
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	return (
		<section className="container mx-auto  min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				All Teams
			</h1>
			<TeamsFilterPage divisions={divisionsWithTeamNames} />
		</section>
	);
}
