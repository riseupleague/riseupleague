import { connectToDatabase } from "@/api-helpers/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import JoinTeamCode from "@/components/register/join-team/JoinTeamCode";
import { getAllRegisterTeams } from "@/api-helpers/controllers/teams-controller";
import BackButton from "@/components/general/buttons/BackButton";
import {
	getUserPlayerPayment,
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";

export default async function JoinTeam(): Promise<JSX.Element> {
	await connectToDatabase();
	const redirectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}register/join-team`;

	const session = await getServerSession();
	if (!session) {
		redirect(`/login?redirectUrl=${redirectUrl}`);
	}
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect(`/login?redirectUrl=${redirectUrl}`);
	}
	const resRegisterTeams = await getAllRegisterTeams();
	const { teams } = await resRegisterTeams.json();

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
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
