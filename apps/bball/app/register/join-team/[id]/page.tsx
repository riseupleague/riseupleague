import { connectToDatabase } from "@/api-helpers/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import JoinTeamSummary from "@/components/register/join-team/JoinTeamSummary";
import { getRegisterTeamById } from "@/api-helpers/controllers/teams-controller";
import RegistrationSuccess from "@/components/register/RegistrationSuccess";
import {
	getCurrentUser,
	addNewUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";

export default async function JoinTeam({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const redirectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}register/join-team/${params.id}`;

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
	const resTeam = await getRegisterTeamById(params.id);
	const { team } = await resTeam.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players } = await resPlayer.json();

	const isDivisionJoined = players.find((player) => {
		return player?.division?._id === team.division?._id;
	});

	if (isDivisionJoined) {
		redirect(`/success/${isDivisionJoined.division._id}`);
	}

	const isTeamJoined = players.find((player) => {
		return player.team?._id === params.id;
	});

	console.log("team:", team);

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-fit text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join {team.teamName}
			</h1>

			{isTeamJoined && <RegistrationSuccess team={isTeamJoined} />}
			{!isTeamJoined && <JoinTeamSummary team={team} session={session} />}
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
