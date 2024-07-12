import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { getDivisionPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import MVPGrid from "@/components/mvp-ladder/MVPGrid";

export default async function MVPLadder({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.id);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await getAllCurrentDivisionsNameAndId();
	const { divisionsNameAndId } = await resDivisions.json();

	const selectedDivision = divisionsNameAndId.find(
		(division) => division._id === params.id
	);

	revalidatePath(`/leaders/mvp-ladder${selectedDivision}`, "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1>mvp ladder</h1>
			<MVPGrid
				allPlayers={allPlayers}
				divisions={divisionsNameAndId}
				selectedDivision={selectedDivision}
			/>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | MVP Ladder",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
