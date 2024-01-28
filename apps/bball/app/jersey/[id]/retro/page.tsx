import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import RetroJersey from "@/components/register/custom-jersey/RetroJersey";

// import dynamic from "next/dynamic";
import Retro1 from "@/lib/jersey-designs/retro/retro-1";
import Retro2 from "@/lib/jersey-designs/retro/retro-2";
import Retro3 from "@/lib/jersey-designs/retro/retro-3";
import Retro4 from "@/lib/jersey-designs/retro/retro-4";
import Retro5 from "@/lib/jersey-designs/retro/retro-5";
import Retro6 from "@/lib/jersey-designs/retro/retro-6";
import Retro7 from "@/lib/jersey-designs/retro/retro-7";
import Retro8 from "@/lib/jersey-designs/retro/retro-8";
import Retro9 from "@/lib/jersey-designs/retro/retro-9";
import Retro10 from "@/lib/jersey-designs/retro/retro-10";

export const metadata: Metadata = {
	title: "Rise Up League | Customize Jersey - Retro",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Retro({
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

	const numberToComponent = {
		1: Retro1(),
		2: Retro2(),
		3: Retro3(),
		4: Retro4(),
		5: Retro5(),
		6: Retro6(),
		7: Retro7(),
		8: Retro8(),
		9: Retro9(),
		10: Retro10(),
	};

	const selectedNumber =
		typeof searchParams.number === "string" ? searchParams.number : "";

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>

			<RetroJersey
				edition={"retro"}
				number={selectedNumber}
				team={team}
				numberToComponent={numberToComponent}
			/>
		</section>
	);
}
