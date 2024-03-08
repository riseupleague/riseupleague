import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import TeamPlayersTable from "@/components/team-management/TeamPlayersTable";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

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

			<Separator className="my-4 border-b border-neutral-500" />

			<TeamPlayersTable teamPlayers={team?.players} />
		</section>
	);
}
