import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";

import CustomizeJersey from "@/components/register/custom-jersey/CustomizeJersey";
import OriginalJersey from "@/components/register/custom-jersey/OriginalJersey";

export const metadata: Metadata = {
	title: "Rise Up League | Original",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// import dynamic from "next/dynamic";
import Original2 from "@/lib/jersey-designs/original/original-2";
import Original3 from "@/lib/jersey-designs/original/original-3";
import Original5 from "@/lib/jersey-designs/original/original-5";
import Original6 from "@/lib/jersey-designs/original/original-6";
import Original7 from "@/lib/jersey-designs/original/original-7";
import Original8 from "@/lib/jersey-designs/original/original-8";

export default async function Original({
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

	const numberToComponent = {
		2: Original2(),
		3: Original3(),
		5: Original5(),
		6: Original6(),
		7: Original7(),
		8: Original8(),
	};

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>

			<OriginalJersey
				edition={"original"}
				number={selectedNumber}
				team={team}
				numberToComponent={numberToComponent}
			/>
		</section>
	);
}
