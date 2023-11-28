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

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function User({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();

	if (!session || !session.user) redirect("/");

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();
	console.log(user);

	const player = {
		customerId: "123",
		playerName: "John Doe",
		instagram: "johndoe_insta",
		jerseyNumber: 42,
		jerseySize: "L",
		shortSize: "M",
		jerseyName: "JD",
		team: {
			teamName: "Team A",
			teamNameShort: "TA",
			teamCode: "A123",
			wins: 10,
			losses: 5,
		},
		teamCaptain: true,
		division: {
			divisionName: "Division 1",
			location: "City Center",
			day: "Monday",
		},
		season: {
			seasonName: "2023",
		},
		user: "JohnDoe123",
		averageStats: {
			points: 15,
			rebounds: 8,
			assists: 5,
			blocks: 1,
			steals: 2,
			threesMade: 2,
			twosMade: 6,
			freeThrowsMade: 5,
			threesMiss: 1,
			twosMiss: 4,
			freeThrowsMiss: 2,
			fouls: 3,
			turnovers: 2,
		},
		allStats: [
			{
				points: 20,
				rebounds: 10,
				assists: 7,
				blocks: 2,
				steals: 3,
				threesMade: 3,
				twosMade: 7,
				freeThrowsMade: 6,
				threesMiss: 2,
				twosMiss: 5,
				freeThrowsMiss: 3,
				fouls: 4,
				turnovers: 3,
				shotChartLists: [],
				game: {
					type: "Game 1",
				},
				teamId: "456",
			},
		],
	};
	return (
		<main className="container mx-auto">
			<h1>{session.user.name}&apos;s Profile</h1>
			<p className="text-primary flex h-[50dvh] items-center justify-center text-center text-2xl">
				We&apos;re still updating your personal user page. Please come back at a
				later time.
			</p>
		</main>
	);
}
