import FreeAgentsRegistration from "@/components/register/FreeAgentsRegistration";
import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";

import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
export const metadata: Metadata = {
	title: "Rise Up League | Join as a Free Agent",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

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
	let filteredDivisions = [...divisions];
	if (players && players.length > 0) {
		filteredDivisions = filteredDivisions.filter((division) => {
			// Check if every players division is not equal to the current division
			return players.every((player) => {
				return player.division?._id !== division._id;
			});
		});
	}

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join as a free agent
			</h1>

			<FreeAgentsRegistration divisions={filteredDivisions} session={session} />
		</main>
	);
}
