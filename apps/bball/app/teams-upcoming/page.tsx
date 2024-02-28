import { connectToDatabase } from "@/api-helpers/utils";
import { getAllUpcomingDivisionsWithTeamNames } from "@/api-helpers/controllers/divisions-controller";
import TeamsFilterPage from "@/components/teams/TeamsFilterPage";
import { Metadata } from "next";

export default async function RegisteredTeams(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisionsWithTeamNames =
		await getAllUpcomingDivisionsWithTeamNames();
	const { divisionsWithTeamNames } = await resDivisionsWithTeamNames.json();

	return (
		<section className="container mx-auto  min-h-fit">
			<h1>Upcoming Teams</h1>
			<TeamsFilterPage divisions={divisionsWithTeamNames} />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Upcoming Teams",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
