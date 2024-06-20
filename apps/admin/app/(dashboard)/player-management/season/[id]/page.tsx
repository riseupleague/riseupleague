import { getAllPlayersWithId } from "@/api-helpers/controllers/players-controller";
import {
	getAllSeasons,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerManagement from "@/components/player-management/PlayerManagement";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function SeasonPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	const resSeason = await getSeasonById(params.id);
	const { season } = await resSeason.json();
	const resPlayers = await getAllPlayersWithId(params.id);
	const { players } = await resPlayers.json();

	return (
		<section>
			<h1>{season?.seasonName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			{players.length > 0 ? (
				<PlayerManagement
					seasons={seasons}
					currentSeason={season}
					players={players}
				/>
			) : (
				<div className="my-8 space-y-3 text-center">
					<h3 className="text-primary">
						No players created in this season yet.
					</h3>
				</div>
			)}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
