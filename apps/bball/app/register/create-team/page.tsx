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
import { upcomingSeasonName } from "@/utils/upcomingSeasonName";

export default async function CreateTeam(): Promise<JSX.Element> {
	await connectToDatabase();
	const redirectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}register/create-team`;

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
	const resDivisions = await getAllRegisterDivisions();
	const { divisions } = await resDivisions.json();

	const seasonName = await upcomingSeasonName();

	return (
		<main className="font-barlow container mx-auto my-10 min-h-fit text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				{seasonName}
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
