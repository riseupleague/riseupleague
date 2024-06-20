import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import TeamInfo from "@/components/team-management/TeamInfo";
import TeamPlayersTable from "@/components/team-management/TeamPlayersTable";
import UpdateTeam from "@/components/team-management/UpdateTeam";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function DivisionPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resTeam = await getTeamById(params.id);
	const { team } = await resTeam.json();

	return (
		<section>
			<h1>
				Team: <span className="text-primary">{team?.teamName}</span>
			</h1>

			<TeamInfo team={team} />

			<div className="my-4">
				<UpdateTeam team={team} />
			</div>

			<Separator className="my-4 border-b border-neutral-500" />

			<h2 className="my-4">Players</h2>
			<TeamPlayersTable teamPlayers={team?.players} />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
