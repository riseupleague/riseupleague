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

export default async function Success({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

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
		<main className="container mx-auto min-h-[100dvh]">
			<h1>Welcome to rise up basketball. Please join a team!</h1>
			<div className="mx-auto  overflow-hidden rounded-md shadow-md">
				<div className="p-4">
					<table className="w-full table-auto">
						<thead>
							<tr className="border-b-2 border-gray-300">
								<th className="pb-2 pr-4 text-center font-semibold">Name:</th>
								<th className="pb-2 pr-4 text-center font-semibold">
									Instagram:
								</th>
								<th className="pb-2 pr-4 text-center font-semibold">Jersey:</th>
								<th className="pb-2 pr-4 text-center font-semibold">
									Jersey Size:
								</th>
								<th className="pb-2 pr-4 text-center font-semibold">Team:</th>
								<th className="pb-2 pr-4 text-center font-semibold">
									Division:
								</th>
								<th className="pb-2 pr-4 text-center font-semibold">Season:</th>
								<th className="pb-2 pr-4 text-center font-semibold">
									Average Stats:
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text-center text-blue-500">
									{player.playerName}
								</td>
								<td className="text-center text-blue-500">{`@${player.instagram}`}</td>
								<td className="text-center text-blue-500">
									{player.jerseyNumber}
								</td>
								<td className="text-center text-blue-500">
									{player.jerseySize}
								</td>
								<td className="text-center text-blue-500">
									{player.team.teamName}
								</td>
								<td className="text-center text-blue-500">
									{player.division.divisionName}
									<div className="text-sm">
										{player.division.day}, {player.division.location}
										<br />
									</div>
								</td>
								<td className="text-center text-blue-500">
									{player.season.seasonName}
								</td>
								<td className="text-center">
									<ul className="list-disc-none ml-6 ">
										<li className="text-blue-500">
											Points: {player.averageStats.points}
										</li>
										<li className="text-blue-500">
											Rebounds: {player.averageStats.rebounds}
										</li>
										<li className="text-blue-500">
											Assists: {player.averageStats.assists}
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
