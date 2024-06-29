import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import FreeAgentsSuccess from "@/components/register/free-agent/FreeAgentsSuccess";
import CreateTeamSuccess from "@/components/register/create-team/CreateteamSuccess";
import JoinTeamSuccess from "@/components/register/join-team/JoinTeamSuccess";
import { redirect } from "next/navigation";
import {
	addNewUser,
	getCurrentUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";

export default async function Success({
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

	if (params.id !== "free-agent") {
		const resPlayer = await getUserPlayerPayment(session.user.email);
		const { players, season } = await resPlayer.json();
		const selectedPlayer = players.find(
			(player) =>
				player.season.toString() === season &&
				player.team?.division._id === params.id
		);

		if (selectedPlayer?.teamCaptain) {
			return <CreateTeamSuccess player={selectedPlayer} />;
		} else {
			return <JoinTeamSuccess player={selectedPlayer} />;
		}
	} else {
		const resPlayer = await getUserPlayerPayment(session.user.email);
		const { players } = await resPlayer.json();
		const freeAgentPlayer = players.find((player) => player.freeAgent === true);

		return <FreeAgentsSuccess player={freeAgentPlayer} />;
	}
}

export const metadata: Metadata = {
	title: "Rise Up League | Success!",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
