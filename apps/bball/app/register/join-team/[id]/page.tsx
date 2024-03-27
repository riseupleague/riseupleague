import { connectToDatabase } from "@/api-helpers/utils";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import ChooseTeam from "@/components/register/join-team/ChooseTeam";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import {
	getCurrentUser,
	addNewUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";
import JoinTeamSummary from "@/components/register/join-team/JoinTeamSummary";
import { getRegisterTeamById } from "@/api-helpers/controllers/teams-controller";
import RegistrationSuccess from "@/components/register/RegistrationSuccess";

export default async function JoinTeam({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}
	const resTeam = await getRegisterTeamById(params.id);
	const { team } = await resTeam.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();

	const isDivisionJoined = players.find((player) => {
		return player?.division?._id === team.division._id;
	});

	if (isDivisionJoined) {
		redirect(`/success/${isDivisionJoined.division._id}`);
	}

	const isTeamJoined = players.find((player) => {
		return player.team?._id === params.id;
	});

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-fit text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join a team
			</h1>
			{isTeamJoined && <RegistrationSuccess team={isTeamJoined} />}
			{!isTeamJoined && <JoinTeamSummary team={team} session={session} />}

			<JoinTeamSummary team={team} session={session} />
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
