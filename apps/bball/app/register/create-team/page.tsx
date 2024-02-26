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

	return (
		<main className="font-barlow container mx-auto my-10 min-h-[100dvh] text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				Season 5
			</p>
			<h1 className="font-abolition mb-10 mt-0 text-7xl font-normal">
				Create a team
			</h1>
			<CreateYourTeam divisions={divisions} user={user} />
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Create a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
