import AverageStatistics from "@/components/players/player/AverageStatistics";
import Link from "next/link";
import { getTeamAllAvgFromId } from "@/api-helpers/controllers/teams-controller";
import TeamSections from "@/components/teams/team/TeamSections";

export default async function Players({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	const { id } = params; // Destructure the 'id' property from 'params'
	const resTeam = await getTeamAllAvgFromId(id);
	const { team, allAvg } = await resTeam.json();

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
			if (player.allStats.length > 0) {
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
			<div className="mb-8 mt-16">
				<h1 className="font-oswald text-3xl font-medium uppercase">
					{team?.teamName}
				</h1>
				<div className="text-white">
					<Link href={`/teams/${team?._id}`}>
						<span className="hover:underline">{team?.teamName}</span>
					</Link>{" "}
				</div>
			</div>
			<TeamSections team={team} allAvg={allAvg} />
		</section>
	);
}
