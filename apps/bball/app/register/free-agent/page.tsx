import FreeAgentsRegistration from "@/components/register/free-agent/FreeAgentsRegistration";
import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";

export default async function FreeAgents(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}
	const resDivisions = await getAllRegisterDivisions();
	const { divisions } = await resDivisions.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();
	const selectedPlayer = players.find((player) => {
		return player.season.toString() === season && player.freeAgent === true;
	});

	if (selectedPlayer) redirect("/success/free-agent");

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-fit text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				Season 5
			</p>
			<h1 className="font-abolition mb-10 mt-0 text-7xl font-normal">
				Join as a Free Agent
			</h1>

			<FreeAgentsRegistration divisions={divisions} user={user} />
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join as a Free Agent",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
