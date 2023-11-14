import { getPlayerAllAvgFromId } from "@/api-helpers/controllers/players-controller";
import AverageStatistics from "@/components/players/player/AverageStatistics";
import PlayerSections from "@/components/players/player/PlayerSections";
import PreviousGames from "@/components/players/player/PreviousGames";
import Link from "next/link";

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
					{player?.playerName}
				</h1>
				<div className="text-white">
					<Link href={`/teams/${player?.team._id}`}>
						<span className="font-barlow hover:underline">
							{player?.team.teamName}
						</span>
					</Link>{" "}
					| <span className="font-barlow">#{player?.jerseyNumber}</span>
				</div>
			</div>
			{/* <PlayerSections player={player} allAvg={allAvg} /> */}
		</section>
	);
}
