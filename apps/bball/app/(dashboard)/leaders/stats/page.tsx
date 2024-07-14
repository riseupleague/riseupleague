import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllDivisionsNameAndIdBySeasonId } from "@/api-helpers/controllers/divisions-controller";
import { Metadata } from "next";
import LeaderGrid from "@/components/leaders/LeaderGrid";
import { revalidatePath } from "next/cache";
import {
	getAllSeasonNamesFilter,
	getActiveSeason,
} from "@/api-helpers/controllers/seasons-controller";
import { redirect } from "next/navigation";

const LeadersPage = async ({
	params,
}: {
	params: { season: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();

	const resSeasonById = await getActiveSeason();
	const { season } = await resSeasonById.json();
	redirect(`/leaders/stats/${season._id}/${season.divisions[0]}`);

	return (
		<section className="container mx-auto min-h-fit">
			<h1>league leaders</h1>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Leaders",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default LeadersPage;
