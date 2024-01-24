import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeamNames } from "@/api-helpers/controllers/divisions-controller";
import TeamsFilterPage from "@/components/teams/TeamsFilterPage";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Rise Up League | Teams",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Teams(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionsWithTeamNames = await getAllCurrentDivisionsWithTeamNames();
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	revalidatePath("/teams", "page");

	return (
		<section className="container mx-auto  min-h-[100dvh]">
			<h1>All Teams</h1>
			<Suspense fallback={null}>
				<TeamsFilterPage divisions={divisionsWithTeamNames} />
			</Suspense>
		</section>
	);
}
