import { getDivisionFromIdWithGames } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import DivisionInfo from "@/components/division-management/DivisionInfo";
import DivisionScheduleList from "@/components/league-schedule/DivisionScheduleList";
import GenerateSchedule from "@/components/league-schedule/GenerateSchedule";
import CreateTeam from "@/components/team-management/CreateTeam";
import TeamsTable from "@/components/team-management/TeamsTable";
import UpdateDivision from "@/components/team-management/UpdateDivision";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function DivisionPage({
	params,
}: {
	params: { division: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivision = await getDivisionFromIdWithGames(params.division);
	const { division } = await resDivision.json();
	return (
		<section>
			<h1>
				{division?.city} {division?.divisionName} Schedule
			</h1>

			{/* <Separator className="my-4 border-b border-neutral-500" /> */}

			{division?.games?.length > 0 ? (
				<DivisionScheduleList division={division} />
			) : (
				<div className="my-8 flex flex-col gap-10">
					<h3 className="text-primary">No game schedule available yet.</h3>
					<GenerateSchedule division={division} />
				</div>
			)}

			{/* <div className="my-8">
				{division.teams.length > 0 ? (
					<TeamsTable teams={division?.teams} />
				) : (
					<div className="my-8 flex justify-center">
						<h3 className="text-primary">No teams in this division yet.</h3>
					</div>
				)}
			</div> */}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
