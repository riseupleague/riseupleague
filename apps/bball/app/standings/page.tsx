import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import StandingsTable from "@/components/standings/StandingsTable";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Rise Up League | Standings",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// Define the type for a Division object
type Division = {
	_id: string;
	divisionName: string;
	season: string;
	teams: any[];
};

export default async function Standings(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: Division[] } =
		await resDivisions.json();

	revalidatePath("/standings", "page");

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1>standings</h1>
			<StandingsTable divisions={divisionsWithStats} />
		</section>
	);
}
