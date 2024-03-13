import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import {
	getAllPlayersWithAvg,
	getDivisionPlayersWithAvg,
} from "@/api-helpers/controllers/players-controller";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import LeaderGrid from "@/components/leaders/LeaderGrid";
import { DivisionWithStats } from "@/types";

const Leaders = async ({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();

	// const resAllPlayers = await getAllPlayersWithAvg();
	// const { allPlayers } = await resAllPlayers.json();

	const resDivisionPlayers = await getDivisionPlayersWithAvg(params.id);
	const { allPlayers } = await resDivisionPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="container mx-auto min-h-fit">
			<h1>league leaders</h1>
			<LeaderGrid allPlayers={allPlayers} divisions={divisionsWithStats} />
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Leaders",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default Leaders;
