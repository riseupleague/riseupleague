import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { getAllPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import MVPGrid from "@/components/mvp-ladder/MVPGrid";
import { DivisionWithStats } from "@/types";

export const metadata: Metadata = {
	title: "Rise Up League | MVP Ladder",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function MVPLadder(): Promise<JSX.Element> {
	await connectToDatabase();

	const resAllPlayers = await getAllPlayersWithAvg();
	const { allPlayers } = await resAllPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	revalidatePath("/mvp-ladder", "page");

	return (
		<section className="container mx-auto min-h-fit">
			<h1>mvp ladder</h1>
			<MVPGrid allPlayers={allPlayers} divisions={divisionsWithStats} />
		</section>
	);
}
