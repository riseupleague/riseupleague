import { connectToDatabase } from "@/api-helpers/utils";
import {
	getAllCurrentDivisionsWithTeams,
	getAllDivisionsWithTeamsBySeasonId,
} from "@/api-helpers/controllers/divisions-controller";
import StandingsTable from "@/components/standings/StandingsTable";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { DivisionWithStats } from "@/types";
import {
	getAllSeasonNamesFilter,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { Suspense } from "react";

export default async function Standings({
	params,
}: {
	params: { season: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisions = await getAllDivisionsWithTeamsBySeasonId(params.season);

	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	const resSeasonNamesFilter = await getAllSeasonNamesFilter();
	const { seasonNamesWithoutRegister } = await resSeasonNamesFilter.json();

	const resSeasonById = await getSeasonById(params.season);
	const { season } = await resSeasonById.json();
	revalidatePath("/standings", "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1 className="my-10 text-4xl lg:my-20">{season.seasonName} Standings</h1>
			<Suspense fallback={null}>
				<StandingsTable
					divisions={divisionsWithStats}
					seasons={seasonNamesWithoutRegister}
					season={season}
				/>
			</Suspense>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Standings",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
