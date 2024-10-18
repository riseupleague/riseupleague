import { getDivisionFromIdWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import DivisionInfo from "@/components/division-management/DivisionInfo";
import CreateTeam from "@/components/team-management/CreateTeam";
import TeamsTable from "@/components/team-management/TeamsTable";
import UpdateDivision from "@/components/team-management/UpdateDivision";
import { isRouteForCommissioner } from "@/utils/isRouteForCommissioner";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function DivisionPage({
	params,
}: {
	params: { division: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	// Check if worker can view route
	// await isRouteForCommissioner();

	const resDivision = await getDivisionFromIdWithTeams(params.division);
	const { division } = await resDivision.json();

	return (
		<section>
			<h1>Division: {division?.divisionName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<DivisionInfo division={division} />

			<div className="mt-8 space-y-3">
				<UpdateDivision division={division} />
			</div>

			<Separator className="my-4 border-b border-neutral-500" />

			<h2>Teams:</h2>

			<div className="my-8">
				{division?.teams?.length > 0 ? (
					<TeamsTable teams={division?.teams} />
				) : (
					<div className="my-8 flex justify-center">
						<h3 className="text-primary">No teams in this division yet.</h3>
					</div>
				)}
			</div>

			<CreateTeam divisionId={params?.division} seasonId={division?.season} />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
