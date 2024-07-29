import { getCurrentAndRegisterUserTournament } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import Breadcrumb from "@/components/general/Breadcrumb";
import { Button } from "@ui/components/button";
import Link from "next/link";

export default async function User(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	if (!session || !session.user) redirect("/");

	const resPlayer = await getCurrentAndRegisterUserTournament(
		session.user.email
	);
	const { user, tournament, registerTournament } = await resPlayer.json();

	return (
		<section className="container mx-auto">
			<h1 className="text-start text-3xl lg:text-5xl">
				👋 Welcome Back {user?.name}!
			</h1>

			<Breadcrumb />

			{user?.tournament?.length > 0 ? (
				<p className="mt-10">
					Thank you for signing up for the {registerTournament?.tournamentName}.
					We will update you shortly!
				</p>
			) : (
				<div className="mt-10 space-y-6">
					<p>You have not registered for any tournaments.</p>
					<p>Register you or your team now to get started!</p>

					<Button variant="register" asChild>
						<Link href="/register/tournament">Register Now</Link>
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
