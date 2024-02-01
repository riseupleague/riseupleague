import { getPlayerAllAvgFromId } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerSections from "@/components/players/player/PlayerSections";
import { Metadata } from "next";
import Link from "next/link";

export default async function Players({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resPlayer = await getPlayerAllAvgFromId(id);
	const { player, allAvg } = await resPlayer.json();

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<div className="mb-8 mt-16">
				<h1>{player?.playerName}</h1>
				<div className="my-4 text-center text-neutral-50">
					<Link href={`/teams/${player?.team._id}`} className="text-xl">
						<span className="font-barlow hover:underline">
							{player?.team.teamName} | #{player?.jerseyNumber}
						</span>
					</Link>
				</div>
				<div className="flex justify-center">
					<h6 className="rounded bg-neutral-500 p-1">
						{player.division.divisionName}
					</h6>
				</div>
			</div>
			<PlayerSections player={player} allAvg={allAvg} />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Player",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata({ params }): Promise<Metadata> {
// 	const { id } = params;
// 	const resPlayer = await getPlayerAllAvgFromId(id);
// 	const { player } = await resPlayer.json();

// 	return {
// 		title: `Rise Up League | ${player.playerName}`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }
