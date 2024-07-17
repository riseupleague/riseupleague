import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import StandingsTable from "@/components/standings/StandingsTable";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { DivisionWithStats } from "@/types";
import { getActiveSeasonId } from "@/api-helpers/controllers/seasons-controller";
import { redirect } from "next/navigation";

export default async function TeamsPage(): Promise<JSX.Element> {
	const resActiveSeason = await getActiveSeasonId();
	const { activeSeasonId } = await resActiveSeason.json();

	redirect(`/teams/${activeSeasonId}`);

	return (
		<section className="container mx-auto min-h-fit">
			<h1>Teams</h1>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Teams",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
