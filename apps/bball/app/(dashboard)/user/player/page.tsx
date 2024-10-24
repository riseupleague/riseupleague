import { getCurrentAndRegisterUserPlayers } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import Breadcrumb from "@/components/general/Breadcrumb";
import UserPlayer from "@/components/user/UserPlayer";
import { Button } from "@ui/components/button";
import Link from "next/link";

export default async function User(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	if (!session || !session.user) redirect("/");

	const resPlayer = await getCurrentAndRegisterUserPlayers(session.user.email);
	const { user, season, registerSeason } = await resPlayer.json();

	const currentPlayers = user.basketball.map((player) => {
		if (player?.season?._id.toString() === registerSeason?._id.toString()) {
			return { ...player, register: true };
		} else {
			return player;
		}
	});

	return (
		<section className="container mx-auto">
			<h1 className="text-start text-3xl lg:text-5xl">
				👋 Welcome Back {user?.name}!
			</h1>

			<Breadcrumb />

			{currentPlayers.length > 0 ? (
				<UserPlayer currentPlayers={currentPlayers} />
			) : (
				<div className="flex flex-col items-center justify-center rounded-lg  p-8">
					<h2 className="text-xl font-bold ">No Players Registered</h2>
					<p className="mt-2 ">
						Please register to a team to participate in the game.
					</p>
					<Button
						className="bg-primary mt-5 text-white"
						variant="default"
						asChild
					>
						<Link href={"/register"}>Register Now</Link>
					</Button>
				</div>
			)}
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
