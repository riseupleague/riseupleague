import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
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

			<h3>Players</h3>
			<Separator className="my-4 border-b border-neutral-500" />

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{team.players?.map((player, index) => (
					<Button key={index} variant="secondary">
						{player?.playerName}
					</Button>
				))}
			</ul>
		</section>
	);
}
