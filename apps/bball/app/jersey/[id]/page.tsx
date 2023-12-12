import {
	getCurrentUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";

import JerseySelection from "@/components/register/custom-jersey/JerseySelection";
import CustomizeJersey from "@/components/register/custom-jersey/CustomizeJersey";

export const metadata: Metadata = {
	title: "Rise Up League | Customize jersey",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Jersey({
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

	const back = typeof searchParams.back === "string" ? searchParams.back : "";

	if (back == "true") {
	} else {
		if (team.primaryColor && team.primaryColor !== "") {
			const jerseyEdition = team.jerseyEdition; // Assuming team.jerseyEdition is a string like "retro-1", "original-1", or "classic-1"
			const edition = jerseyEdition.split("-")[0];
			const number = jerseyEdition.split("-")[1];

			redirect(`/jersey/${team._id}/${edition}?number=${number}`);
		}
	}

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>

			<JerseySelection team={team} />
			{/* <CustomizeJersey
					edition={selectedEdition}
					number={selectedNumber}
					team={team}
				/> */}
		</section>
	);
}
