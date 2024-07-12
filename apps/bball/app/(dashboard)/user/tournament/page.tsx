import {
	getCurrentAndRegisterUserPlayers,
	getCurrentAndRegisterUserTournament,
} from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import Breadcrumb from "@/components/general/Breadcrumb";
import UserPlayer from "@/components/user/UserPlayer";

export default async function User(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	if (!session || !session.user) redirect("/");

	const resPlayer = await getCurrentAndRegisterUserTournament(
		session.user.email
	);
	const { user, tournament, registerTournament } = await resPlayer.json();
	console.log(user, registerTournament);
	return (
		<section className="container mx-auto">
			<h1 className="text-start text-3xl lg:text-5xl">
				👋 Welcome Back {user.name}!
			</h1>

			<Breadcrumb />

			<p className="mt-10">
				Thank you for singing up for the {registerTournament.tournamentName}. We
				will update you shortly!
			</p>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata() {
// 	const session = await getServerSession();
// 	if (!session || !session.user) redirect("/");
// 	const resUser = await getCurrentUser(session.user.email);
// 	const { user } = await resUser.json();
// 	return {
// 		title: `Rise Up League | ${user.name}'s Profile`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }
