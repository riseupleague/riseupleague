import { getTeamAllAvgFromId } from "@/api-helpers/controllers/teams-controller";
import TeamSections from "@/components/teams/team/TeamSections";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getAllUpcomingGamesHeader } from "@/api-helpers/controllers/games-controller";

export const metadata: Metadata = {
	title: "Rise Up League | Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Players({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resTeam = await getTeamAllAvgFromId(id);
	const { team, allAvg } = await resTeam.json();
	const resUpcoming = await getAllUpcomingGamesHeader();
	const { allUpcomingGames } = await resUpcoming.json();

	const upcomingTeamGames = allUpcomingGames?.filter(
		(game) => game.homeTeam?._id === id || game.awayTeam?._id === id
	);

	const leaders: {
		points: {
			name: string;
			jerseyNumber: number;
			stats: { points: number };
			id: string;
		};
		rebounds: {
			name: string;
			jerseyNumber: number;
			stats: { rebounds: number };
			id: string;
		};
		assists: {
			name: string;
			jerseyNumber: number;
			stats: { assists: number };
			id: string;
		};
		blocks: {
			name: string;
			jerseyNumber: number;
			stats: { blocks: number };
			id: string;
		};
		steals: {
			name: string;
			jerseyNumber: number;
			stats: { steals: number };
			id: string;
		};
		threesMade: {
			name: string;
			jerseyNumber: number;
			stats: { threesMade: number };
			id: string;
		};
	} = {
		points: { name: "", jerseyNumber: 0, stats: { points: 0 }, id: "" },
		rebounds: { name: "", jerseyNumber: 0, stats: { rebounds: 0 }, id: "" },
		assists: { name: "", jerseyNumber: 0, stats: { assists: 0 }, id: "" },
		blocks: { name: "", jerseyNumber: 0, stats: { blocks: 0 }, id: "" },
		steals: { name: "", jerseyNumber: 0, stats: { steals: 0 }, id: "" },
		threesMade: { name: "", jerseyNumber: 0, stats: { threesMade: 0 }, id: "" },
	};

	if (team?.players.length > 0) {
		team?.players.forEach((player) => {
			if (player.allStats?.length > 0) {
				const playerStats = player.averageStats;
				if (playerStats?.points > leaders.points.stats.points) {
					leaders.points.name = player.playerName;
					leaders.points.jerseyNumber = player.jerseyNumber;
					leaders.points.stats = playerStats;
					leaders.points.id = player._id;
				}
				if (playerStats?.rebounds > leaders.rebounds.stats.rebounds) {
					leaders.rebounds.name = player.playerName;
					leaders.rebounds.jerseyNumber = player.jerseyNumber;
					leaders.rebounds.stats = playerStats;
					leaders.rebounds.id = player._id;
				}
				if (playerStats?.assists > leaders.assists.stats.assists) {
					leaders.assists.name = player.playerName;
					leaders.assists.jerseyNumber = player.jerseyNumber;
					leaders.assists.stats = playerStats;
					leaders.assists.id = player._id;
				}
				if (playerStats?.blocks > leaders.blocks.stats.blocks) {
					leaders.blocks.name = player.playerName;
					leaders.blocks.jerseyNumber = player.jerseyNumber;
					leaders.blocks.stats = playerStats;
					leaders.blocks.id = player._id;
				}
				if (playerStats?.steals > leaders.steals.stats.steals) {
					leaders.steals.name = player.playerName;
					leaders.steals.jerseyNumber = player.jerseyNumber;
					leaders.steals.stats = playerStats;
					leaders.steals.id = player._id;
				}
				if (playerStats?.threesMade > leaders.threesMade.stats.threesMade) {
					leaders.threesMade.name = player.playerName;
					leaders.threesMade.jerseyNumber = player.jerseyNumber;
					leaders.threesMade.stats = playerStats;
					leaders.threesMade.id = player._id;
				}
			}
		});
	}

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<div className="mb-8 flex flex-col items-center text-center md:mt-16">
				<h1 className="text-4xl lg:text-[61px]">{team?.teamName}</h1>
				<h6 className="rounded bg-neutral-500 px-2 py-1 uppercase">
					{team.division.divisionName}
				</h6>
			</div>
			<TeamSections
				upcomingGames={upcomingTeamGames}
				team={team}
				allAvg={allAvg}
			/>
		</section>
	);
}
