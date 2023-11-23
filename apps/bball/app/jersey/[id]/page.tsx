import {
	getCurrentUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
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
	console.log(user);

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

	typeof searchParams.teams === "string" ? searchParams.teams : "";

	const selectedEdition =
		typeof searchParams.edition === "string" ? searchParams.edition : "";
	const selectedNumber =
		typeof searchParams.number === "string" ? searchParams.number : "";

	let jerseySelected = false;
	if (selectedEdition !== "" && selectedNumber !== "") {
		jerseySelected = true;
	}

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Jersey Locker</h1>
			{!jerseySelected ? (
				<JerseySelection team={team} />
			) : (
				<CustomizeJersey
					edition={selectedEdition}
					number={selectedNumber}
					team={team}
				/>
			)}
		</section>
	);
}
