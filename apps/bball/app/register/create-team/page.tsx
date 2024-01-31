import { connectToDatabase } from "@/api-helpers/utils";
import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";
import {
	getUserPlayerPayment,
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CreateYourTeam from "@/components/register/CreateYourTeam";

export const metadata: Metadata = {
	title: "Rise Up League | Create a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function CreateTeam(): Promise<JSX.Element> {
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
	filteredDivisions = filteredDivisions.filter((division) => {
		return division.teams.length < 8;
	});

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
			<h1 className=" mt-5 text-right text-8xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Create a team
			</h1>
			<CreateYourTeam divisions={filteredDivisions} category="create" />
		</main>
	);
}
