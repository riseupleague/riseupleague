import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllCurrentDivisionsWithTeamNames } from "@/src/api-helpers/controllers/divisions-controller";
import { Suspense } from "react";
import TeamsFilterPage from "@/src/components/teams/TeamsFilterPage";

export default async function Teams(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionsWithTeamNames = await getAllCurrentDivisionsWithTeamNames();
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	return (
		<section className="container mx-auto  min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				All Teams
			</h1>
			<Suspense fallback={"loading data..."}>
				<TeamsFilterPage divisions={divisionsWithTeamNames} />
			</Suspense>
		</section>
	);
}
