import { getAllCurrentDivisionsWithTeamNames } from "@/api-helpers/controllers/divisions-controller";
import TeamsFilterPage from "@/components/teams/TeamsFilterPage";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export default async function Teams(): Promise<JSX.Element> {
	const resDivisionsWithTeamNames = await getAllCurrentDivisionsWithTeamNames();
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	revalidatePath("/teams", "page");

	return (
		<section className="container mx-auto  min-h-fit">
			<h1>All Teams</h1>
			<Suspense fallback={null}>
				<TeamsFilterPage divisions={divisionsWithTeamNames} />
			</Suspense>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Teams",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
