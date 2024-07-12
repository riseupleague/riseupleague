import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamByIdWithGames } from "@/api-helpers/controllers/teams-controller";
import ChooseSchedule from "@/components/register/choose-schedule/ChooseSchedule";
import Link from "next/link";

export default async function Jersey({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();

	const resTeam = await getTeamByIdWithGames(params.id);
	const { team } = await resTeam.json();

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	return (
		<section className="container mx-auto min-h-fit">
			<h1 className="mb-10">Choose Your Schedule 🗓️</h1>

			{team.games.length > 0 ? (
				<div>
					<h3>You already selected your schedule for the upcoming season.</h3>
					<p className="mt-10 text-xl">
						Please check your team page for more info:{" "}
						<Link className="underline" href={`/teams/team/${team._id}`}>
							{team.teamName}
						</Link>
					</p>
				</div>
			) : (
				<ChooseSchedule team={team} user={user} />
			)}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Choose Your Schedule",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
