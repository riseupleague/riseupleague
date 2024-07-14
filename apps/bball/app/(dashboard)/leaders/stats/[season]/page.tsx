import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllDivisionsNameAndIdBySeasonId } from "@/api-helpers/controllers/divisions-controller";
import { Metadata } from "next";
import LeaderGrid from "@/components/leaders/LeaderGrid";
import { revalidatePath } from "next/cache";
import { getAllSeasonNamesFilter, getSeasonById } from "@/api-helpers/controllers/seasons-controller";


const LeadersPage = async ({
	params,
    searchParams
}: {
	params: { season: string };
    searchParams:{divisionId:string}
}): Promise<JSX.Element> => {
	await connectToDatabase();


    const resDivisionPlayers = await getDivisionPlayersWithAvg(searchParams.divisionId);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await getAllDivisionsNameAndIdBySeasonId(params.season);
	const { divisionsNameAndId } = await resDivisions.json();


    console.log("divisionsNameAndId:",divisionsNameAndId)

	const selectedDivision = divisionsNameAndId.find(
		(division) => division._id === searchParams.divisionId
	);

    console.log("selectedDivision:",selectedDivision)


	const resSeasonNamesFilter = await getAllSeasonNamesFilter();
	const { seasonNamesWithoutRegister } = await resSeasonNamesFilter.json();

	const resSeasonById = await getSeasonById(params.season);
	const { season } = await resSeasonById.json();

	revalidatePath(`/leaders/stats/${selectedDivision}`, "page");



    // redirect(`/leaders/stats/${params.season}/${firstDivisionId}`)

	return (
		<section className="container mx-auto min-h-fit">
			<h1>league leaders</h1>
			<LeaderGrid
				allPlayers={allPlayers}
				divisions={divisionsNameAndId}
				selectedDivision={selectedDivision}
                seasons={seasonNamesWithoutRegister}
                season={season}
			/>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Leaders",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default LeadersPage;
