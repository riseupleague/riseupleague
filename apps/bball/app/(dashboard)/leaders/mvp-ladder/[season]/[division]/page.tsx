import { connectToDatabase } from "@/api-helpers/utils";
import {
	getAllCurrentDivisionsNameAndId,
	getAllDivisionsNameAndIdByDivisionId,
} from "@/api-helpers/controllers/divisions-controller";
import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import MVPGrid from "@/components/mvp-ladder/MVPGrid";
import nextConfig from "@/next.config";
import {
	getAllSeasonNamesFilter,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
export default async function MVPLadder({
	params,
}: {
	params: { division: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.division);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await await getAllDivisionsNameAndIdByDivisionId(
		params.division
	);
	const { divisionsNameAndId } = await resDivisions.json();

	const selectedDivision = divisionsNameAndId.find(
		(division) => division._id === params.division
	);

	const resSeasonNamesFilter = await getAllSeasonNamesFilter();
	const { seasonNamesWithoutRegister } = await resSeasonNamesFilter.json();
	const resSeasonById = await getSeasonById(selectedDivision.season);
	const { season } = await resSeasonById.json();

	const minGamesRequired = nextConfig.mvpLadderMinGamesNeeded ? 5 : 0;
	const calculateMvpScore = (avgStats, wins, losses) => {
		let wpct;
		const avgStatsSum =
			avgStats.points * 3 +
			avgStats.rebounds * 2 +
			avgStats.assists * 2 +
			avgStats.steals * 2 +
			avgStats.blocks * 2;

		if (!wins && !losses) wpct = 0;
		else wpct = wins === 0 && losses === 0 ? 0 : wins / (wins + losses);

		return avgStatsSum + 3 * wpct;
	};

	// calculate mvp score and sort
	const allPlayersWithScore = allPlayers
		.map((player) => {
			return {
				...player,
				mvpScore: calculateMvpScore(
					player.averageStats,
					player.team?.wins,
					player.team?.losses
				),
			};
		})
		.sort((a, b) => (a.mvpScore < b.mvpScore ? 1 : -1))
		.filter(
			(player) =>
				player.mvpScore > 0 && player.allStats.length >= minGamesRequired
		);

	revalidatePath(`/leaders/mvp-ladder${selectedDivision}`, "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1 className="my-10 text-4xl lg:my-20">
				{season.seasonName} mvp ladder
			</h1>
			<MVPGrid
				allPlayersWithScore={allPlayersWithScore}
				divisions={divisionsNameAndId}
				selectedDivision={selectedDivision}
				seasons={seasonNamesWithoutRegister}
				season={season}
			/>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | MVP Ladder",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
