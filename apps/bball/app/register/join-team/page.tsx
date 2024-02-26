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
import JoinTeamCode from "@/components/register/join-team/JoinTeamCode";
import { getAllRegisterTeams } from "@/api-helpers/controllers/teams-controller";
import Link from "next/link";

export default async function JoinTeam(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}
	const resRegisterTeams = await getAllRegisterTeams();
	const { teams } = await resRegisterTeams.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<p className="font-barlow  mb-0 mt-10 text-center text-xl md:text-3xl">
				Season 5
			</p>
			<h1 className="font-abolition mb-10 text-7xl ">Join a team</h1>
			<Link
				href={"/register/"}
				className="my-2 flex items-center gap-3 text-xl text-neutral-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="20"
					viewBox="0 0 15 20"
					fill="none"
				>
					<path
						d="M8.125 16.25L1.875 10L8.125 3.75"
						stroke="#ABAFB3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Back
			</Link>

			<JoinTeamCode teams={teams} />

			{/* <CreateYourTeam divisions={filteredDivisions} /> */}
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
