import { getPlayerAllAvgFromId } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerSections from "@/components/players/player/PlayerSections";
import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@ui/components/badge";
import { Avatar, AvatarImage } from "@ui/components/avatar";
import { extractInstagramUsername } from "@utils/utils";

const Players = async ({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();

	const { id } = params;
	const resPlayer = await getPlayerAllAvgFromId(id);
	const { player, allAvg } = await resPlayer.json();

	return (
		<section className="container mx-auto  min-h-fit ">
			<div className="mb-8 mt-16 flex items-start">
				<div className="w-1/2 md:w-1/4">
					{player.playerImage && player.playerImage !== "" ? (
						<Avatar className="h-full w-full">
							<AvatarImage src={player.playerImage} alt="player image" />
						</Avatar>
					) : (
						<Avatar className="h-full w-full">
							<AvatarImage src="/images/logo-gray.svg" alt="player image" />
						</Avatar>
					)}
				</div>

				<div className="flex w-1/2 flex-col items-center justify-center md:w-3/4">
					<Badge variant="division">{player.division.divisionName}</Badge>
					<h1 className="text-4xl md:text-8xl">{player?.playerName}</h1>
					<Link
						href={`/teams/${player?.team._id}`}
						className="font-barlow block w-full text-center text-xl transition-all hover:text-neutral-200 md:text-4xl"
					>
						{player?.team.teamName} | #{player?.jerseyNumber}
					</Link>
					{player?.instagram && (
						<Link
							href={`https://www.instagram.com/${player?.instagram}`}
							className="font-barlow my-4 text-lg text-neutral-300 transition-all hover:text-neutral-200"
							target="_blank"
						>
							IG:{" "}
							<span className="lowercase">
								@{extractInstagramUsername(player?.instagram)}
							</span>
						</Link>
					)}
					{/* <ComparePopup /> */}
				</div>
			</div>
			<PlayerSections player={player} allAvg={allAvg} />
		</section>
	);
};

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

export default Players;
