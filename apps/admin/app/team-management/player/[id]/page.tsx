import { getPlayerById } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerInfo from "@/components/team-management/PlayerInfo";
import UpdatePlayer from "@/components/team-management/UpdatePlayer";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function PlayerPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const resPlayer = await getPlayerById(params.id);
	const { player } = await resPlayer.json();
	console.log("player:", player);

	return (
		<section>
			<h1>
				Player: <span className="text-primary">{player?.playerName}</span>
			</h1>

			<PlayerInfo player={player} />
			<div className="my-4">
				<UpdatePlayer player={player} />
			</div>

			<Separator className="my-4 border-b border-neutral-500" />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
