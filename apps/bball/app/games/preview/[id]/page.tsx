import { connectToDatabase } from "@/api-helpers/utils";

import CompareBarCharts from "@/components/games/CompareBarCharts";
import { getGameById } from "@/api-helpers/controllers/games-controller";
import Link from "next/link";
import TeamGameRoster from "@/components/games/TeamGameRoster";

interface HighestStats {
	home: Record<string, any>; // You might want to specify the type for category data
	away: Record<string, any>;
}

export default async function GamePreview({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resGame = await getGameById(params.id);
	const { game } = await resGame.json();

	let highestAverageStats: HighestStats = {
		home: {},
		away: {},
	};

	const getHighestAverageStats = (homeTeam, awayTeam) => {
		const categories = ["points", "rebounds", "assists", "blocks", "steals"];

		const highestStats = {
			home: {},
			away: {},
		};

		categories.forEach((category) => {
			const homeTeamHighest = homeTeam.players.reduce(
				(highest, player, index) => {
					if (index === 0) {
						return player;
					}
					if (player.averageStats[category] > highest.averageStats[category]) {
						return player;
					}
					return highest;
				},
				homeTeam.players[0]
			);
			highestStats.home[category] = homeTeamHighest;

			const awayTeamHighest = awayTeam.players.reduce(
				(highest, player, index) => {
					if (index === 0) {
						return player;
					}
					if (player.averageStats[category] > highest.averageStats[category]) {
						return player;
					}
					return highest;
				},
				awayTeam.players[0]
			);

			highestStats.away[category] = awayTeamHighest;
		});

		return highestStats;
	};

	// Update the variables directly
	highestAverageStats = getHighestAverageStats(game.homeTeam, game.awayTeam);

	// If you need to update it when the player data changes, you can update the 'players' variable again.

	const statTypes = ["points", "rebounds", "assists", "blocks", "steals"];

	const isoDate = game.date;

	const date = new Date(isoDate);

	const day = date.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const month = date.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
	const time = date
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
		.replace(/\u202f/, " ");

	return (
		<section className="container mx-auto  min-h-[100dvh] ">
			<h1 className="font-barlow mb-16 mt-8 text-center text-5xl font-medium uppercase"></h1>
			<div className="mx-auto my-10 w-11/12 ">
				<div
					key={game._id}
					className="flex w-full flex-col items-center pb-12 text-left text-white  shadow-md focus:outline-none lg:flex-row  lg:justify-between lg:px-5"
				>
					<div className="flex  w-full flex-grow   items-center justify-center">
						<div className="flex flex-1  flex-col items-center justify-center sm:items-end">
							<div className="flex flex-col items-center justify-center">
								<Link
									href={`/teams/${game.homeTeam._id}`}
									className="text-md text-xl font-semibold hover:underline"
								>
									{game.homeTeam.teamNameShort}
								</Link>
								<span className="sm:text-md text-sm font-semibold">
									{game.homeTeam.wins}-{game.homeTeam.losses}
								</span>
							</div>
						</div>
						<div className=" mx-4  flex h-40 flex-1 flex-col items-center lg:h-auto">
							<div className="flex flex-col items-center justify-center">
								<div className="flex  items-center">
									<span className="px-1 text-lg font-medium">{day}</span>
									<span className="px-1 text-lg font-medium">{month}</span>
								</div>
								<span className="mb-2 text-xl font-bold sm:text-3xl">
									{time}
								</span>

								<div
									className=" mt-2 w-full px-1 text-center text-xs font-medium"
									style={{ fontSize: "0.7rem" }}
								>
									{game.location}
								</div>
							</div>
						</div>
						<div className="flex  flex-1 flex-col items-center justify-center sm:items-start">
							<div className="flex flex-col items-center justify-center">
								<Link
									href={`/teams/${game.awayTeam._id}`}
									className="text-md text-xl font-semibold hover:underline"
								>
									{game.awayTeam.teamNameShort}
								</Link>
								<span className="sm:text-md text-sm font-semibold">
									{game.awayTeam.wins}-{game.awayTeam.losses}
								</span>
							</div>
						</div>
					</div>
				</div>
				<h3
					style={{ borderColor: "#282828" }}
					className="font-barlow border-b py-10 text-2xl font-semibold text-white"
				>
					Team Comparison
				</h3>
				<div className="mx-auto mt-10 md:w-1/2">
					<CompareBarCharts
						one={game.homeTeam}
						two={game.awayTeam}
						oneName={game.homeTeam.teamName}
						twoName={game.awayTeam.teamName}
					/>
				</div>
				<h3
					style={{ borderColor: "#282828" }}
					className="font-barlow border-b py-10 text-2xl font-semibold text-white"
				>
					Team Summary
				</h3>
				<div className="mt-10">
					{statTypes.map((statType) => {
						const homePoints =
							highestAverageStats.home?.[statType]?.averageStats.points;
						const homeRebounds =
							highestAverageStats.home?.[statType]?.averageStats.rebounds;
						const homeAssists =
							highestAverageStats.home?.[statType]?.averageStats.assists;
						const homeBlocks =
							highestAverageStats.home?.[statType]?.averageStats.blocks;
						const homeSteals =
							highestAverageStats.home?.[statType]?.averageStats.steals;
						const awayPoints =
							highestAverageStats.away?.[statType]?.averageStats.points;
						const awayRebounds =
							highestAverageStats.away?.[statType]?.averageStats.rebounds;
						const awayAssists =
							highestAverageStats.away?.[statType]?.averageStats.assists;
						const awayBlocks =
							highestAverageStats.away?.[statType]?.averageStats.blocks;
						const awaySteals =
							highestAverageStats.away?.[statType]?.averageStats.steals;

						return (
							<div className="flex w-full" key={statType}>
								<div
									style={{ borderColor: "#282828", backgroundColor: "#18181A" }}
									className="flex flex-1 items-center justify-between border px-2 py-3 sm:px-5 "
								>
									<div className="text-white">
										<p className="text-sm font-semibold">
											{highestAverageStats.home?.[statType]?.playerName}
										</p>
										<div>
											<p className="text-xs text-gray-500">{`${homePoints} PPG, ${homeRebounds} RPG, ${homeAssists} APG, ${homeBlocks} BPG, ${homeSteals} SPG`}</p>
										</div>
									</div>
									<div>
										<div className="text-xl font-semibold text-white">
											{
												highestAverageStats.home?.[statType]?.averageStats[
													statType
												]
											}
										</div>
									</div>
								</div>
								<span className="mx-1 flex items-center text-xl font-bold text-gray-600 sm:mx-3">
									{statType === "points"
										? "PPG"
										: statType === "rebounds"
										? "RPG"
										: statType === "assists"
										? "APG"
										: statType === "blocks"
										? "BPG"
										: statType === "steals"
										? "SPG"
										: ""}
								</span>
								<div
									style={{ borderColor: "#282828", backgroundColor: "#18181A" }}
									className="flex flex-1 items-center justify-between border  px-2 py-3 sm:px-5"
								>
									<div className="text-xl font-semibold text-white">
										{
											highestAverageStats.away?.[statType]?.averageStats[
												statType
											]
										}
									</div>
									<div className="text-end text-white">
										<p className="text-sm font-semibold">
											{highestAverageStats.away?.[statType]?.playerName}
										</p>
										<div>
											<p className="text-xs text-gray-500">{`${awayPoints} PPG, ${awayRebounds} RPG, ${awayAssists} APG, ${awayBlocks} BPG, ${awaySteals} SPG`}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<TeamGameRoster game={game} />
		</section>
	);
}
