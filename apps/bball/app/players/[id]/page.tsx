import { getPlayerAllAvgFromId } from "@/api-helpers/controllers/players-controller";
import AdvanceStatistics from "@/components/players/player/AdvanceStatistics";
import AverageStatistics from "@/components/players/player/AverageStatistics";
import PreviousGames from "@/components/players/player/PreviousGames";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@ui/components/skeleton";

export default async function Players({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	const { id } = params; // Destructure the 'id' property from 'params'

	const resPlayer = await getPlayerAllAvgFromId(id);
	const { player, allAvg } = await resPlayer.json();
	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<div className="mb-8 mt-16">
				<h1 className="font-oswald text-3xl font-medium uppercase">
					{player.playerName}
				</h1>
				<div className="text-white">
					<Link href={`/teams/${player.team._id}`}>
						<span className="hover:underline">{player.team.teamName}</span>
					</Link>{" "}
					| <span>#{player.jerseyNumber}</span>
				</div>
			</div>
			<AverageStatistics player={player} allAvg={allAvg} />
			<AdvanceStatistics player={player} allAvg={allAvg} />
			<PreviousGames player={player} />
		</section>
	);
}
