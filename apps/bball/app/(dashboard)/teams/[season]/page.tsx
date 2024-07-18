import {
	getAllCurrentDivisionsWithTeamNames,
	getAllDivisionsWithTeamNamesBySeasonId,
} from "@/api-helpers/controllers/divisions-controller";
import {
	getAllSeasonNamesFilter,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import TeamsFilterPage from "@/components/teams/TeamsFilterPage";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function Teams({
	params,
}: {
	params: { season: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionsWithTeamNames =
		await getAllDivisionsWithTeamNamesBySeasonId(params.season);
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	const resSeasonNamesFilter = await getAllSeasonNamesFilter();
	const { seasonNamesWithoutRegister } = await resSeasonNamesFilter.json();

	const resSeasonById = await getSeasonById(params.season);
	const { season } = await resSeasonById.json();

	revalidatePath("/teams", "page");

	return (
		<section className="container mx-auto  min-h-fit">
			<h1 className="my-10 text-4xl lg:my-20">{season.seasonName} Teams</h1>
			<Suspense fallback={null}>
				<TeamsFilterPage
					divisions={divisionsWithTeamNames}
					seasons={seasonNamesWithoutRegister}
					season={season}
				/>
			</Suspense>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Teams",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
