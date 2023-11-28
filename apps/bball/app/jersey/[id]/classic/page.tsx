import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";
// import dynamic from "next/dynamic";
import Classic1 from "@/lib/jersey-designs/classic/classic-1";
import Classic2 from "@/lib/jersey-designs/classic/classic-2";
import Classic3 from "@/lib/jersey-designs/classic/classic-3";
import Classic4 from "@/lib/jersey-designs/classic/classic-4";

import Classic5 from "@/lib/jersey-designs/classic/classic-5";
import Classic6 from "@/lib/jersey-designs/classic/classic-6";
import Classic7 from "@/lib/jersey-designs/classic/classic-7";
import Classic8 from "@/lib/jersey-designs/classic/classic-8";
import Classic9 from "@/lib/jersey-designs/classic/classic-9";
import Classic10 from "@/lib/jersey-designs/classic/classic-10";

import ClassicJersey from "@/components/register/custom-jersey/ClassicJersey";
export const metadata: Metadata = {
	title: "Rise Up League | Original",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Classic({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	const numberToComponent = {
		1: Classic1(),
		2: Classic2(),
		3: Classic3(),
		4: Classic4(),
		5: Classic5(),
		6: Classic6(),
		7: Classic7(),
		8: Classic8(),
		9: Classic9(),
		10: Classic10(),
	};

	const resTeam = await getTeamById(params.id);
	const { team } = await resTeam.json();

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	const isUserInTeam = user.basketball.some((userPlayer) => {
		// Check if userPlayer._id exists in team.players
		return team.players.some(
			(teamPlayer) => teamPlayer._id.toString() === userPlayer._id.toString()
		);
	});

	// isUserInTeam will be true if any player in user.basketball is in team.players, otherwise false
	if (!isUserInTeam) {
		redirect("/");
	}

	const selectedNumber =
		typeof searchParams.number === "string" ? searchParams.number : "";

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>
			<ClassicJersey
				edition={"classic"}
				number={selectedNumber}
				team={team}
				numberToComponent={numberToComponent}
			/>
		</section>
	);
}
