// import { connectToDatabase } from "@/api-helpers/utils";
// import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
// import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
// import { Metadata } from "next";
// import LeaderGrid from "@/components/leaders/LeaderGrid";
// import { revalidatePath } from "next/cache";

// const Leaders = async ({
// 	params,
// }: {
// 	params: { division: string };
// }): Promise<JSX.Element> => {
// 	await connectToDatabase();

// 	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.division);
// 	const { allPlayers } = await resDivisionPlayers.json();

// 	const resDivisions = await getAllCurrentDivisionsNameAndId();
// 	const { divisionsNameAndId } = await resDivisions.json();

// 	const selectedDivision = divisionsNameAndId.find(
// 		(division) => division._id === params.division
// 	);

// 	revalidatePath(`/leaders/stats/${selectedDivision}`, "page");

// 	return (
// 		<section className="container mx-auto min-h-fit">
// 			<h1>league leaders</h1>
// 			{/* <LeaderGrid
// 				allPlayers={allPlayers}
// 				divisions={divisionsNameAndId}
// 				selectedDivision={selectedDivision}
// 			/> */}
// 		</section>
// 	);
// };

// export const metadata: Metadata = {
// 	title: "Rise Up League | League Leaders",
// 	description:
// 		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// };

// export default Leaders;

import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllDivisionsNameAndIdByDivisionId } from "@/api-helpers/controllers/divisions-controller";
import { Metadata } from "next";
import LeaderGrid from "@/components/leaders/LeaderGrid";
import { revalidatePath } from "next/cache";
import {
	getAllSeasonNamesFilter,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";

const LeadersPage = async ({
	params,
}: {
	params: { division: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();
	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.division);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await getAllDivisionsNameAndIdByDivisionId(
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

	const filteredPlayersByPoints = allPlayers.sort((a, b) =>
		a.averageStats["points"] < b.averageStats["points"] ? 1 : -1
	);

	revalidatePath(`/leaders/stats/${selectedDivision}`, "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1 className="my-10 text-4xl lg:my-20">{season.seasonName} Leaders</h1>

			<LeaderGrid
				allPlayers={filteredPlayersByPoints}
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
