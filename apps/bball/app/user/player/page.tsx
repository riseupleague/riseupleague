import { getCurrentAndRegisterUserPlayers } from "@/api-helpers/controllers/users-controller";
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

	const resPlayer = await getCurrentAndRegisterUserPlayers(session.user.email);
	const { user, season, registerSeason } = await resPlayer.json();

	const currentPlayers = user.basketball
		.filter((player) => {
			return (
				player.season._id.toString() === season._id.toString() ||
				player.season._id.toString() === registerSeason?._id.toString()
			);
		})
		.map((player) => {
			if (player.season._id.toString() === registerSeason?._id.toString()) {
				return { ...player, register: true };
			} else {
				return player;
			}
		});

	return (
		<section className="container mx-auto">
			<h1 className="text-start text-3xl lg:text-5xl">
				👋 Welcome Back {user.name}!
			</h1>

			<Breadcrumb />
			<UserPlayer currentPlayers={currentPlayers} />
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
