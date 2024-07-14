import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { Metadata } from "next";
import LeaderGrid from "@/components/leaders/LeaderGrid";
import { revalidatePath } from "next/cache";

const Leaders = async ({
	params,
}: {
	params: { division: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();

	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.division);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resDivisions.json();

	const selectedDivision = divisionsNameAndId.find(
		(division) => division._id === params.division
	);

	revalidatePath(`/leaders/stats/${selectedDivision}`, "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1>league leaders</h1>
			{/* <LeaderGrid
				allPlayers={allPlayers}
				divisions={divisionsNameAndId}
				selectedDivision={selectedDivision}
			/> */}
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Leaders",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default Leaders;
