import { connectToDatabase } from "@/api-helpers/utils";
import {
	getUserPlayerPayment,
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import JoinTeamCode from "@/components/register/join-team/JoinTeamCode";
import { getAllRegisterTeams } from "@/api-helpers/controllers/teams-controller";
import Link from "next/link";
import BackButton from "@/components/general/buttons/BackButton";

export default async function JoinTeam(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}
	const resRegisterTeams = await getAllRegisterTeams();
	const { teams } = await resRegisterTeams.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();

	return (
		<main className="font-barlow container mx-auto my-10 min-h-fit text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				Season 5
			</p>
			<h1 className="font-abolition mb-10 mt-0 text-7xl font-normal">
				Join a team
			</h1>

			<BackButton href="/register" />

			<JoinTeamCode teams={teams} />

			{/* <CreateYourTeam divisions={filteredDivisions} /> */}
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
