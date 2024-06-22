import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import AddNewPlayer from "@/components/team-management/AddNewPlayer";
import DeleteTeam from "@/components/team-management/DeleteTeam";
import TeamGames from "@/components/team-management/TeamGames";
import TeamInfo from "@/components/team-management/TeamInfo";
import TeamPlayersTable from "@/components/team-management/TeamPlayersTable";
import UpdateTeam from "@/components/team-management/UpdateTeam";
import { isRouteForCommissioner } from "@/utils/isRouteForCommissioner";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function DivisionPage({
	params,
}: {
	params: { team: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	// Check if worker can view route
	await isRouteForCommissioner();

	const resTeam = await getTeamById(params.team);
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

			<TeamPlayersTable teamPlayers={team?.players} />
			<div className="my-10">
				<AddNewPlayer
					teamId={team?._id}
					seasonId={team?.season}
					divisionId={team?.division}
				/>
			</div>
			<Separator className="border-b border-neutral-500" />

			<TeamGames games={team?.games} />
			<div className="my-4">
				<DeleteTeam team={team} />
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
