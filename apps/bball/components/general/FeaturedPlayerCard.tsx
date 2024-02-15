"use client";

import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";
import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import TeamLogo from "./icons/TeamLogo";
import { extractInstagramUsername } from "@/utils/extractInstagram";
import Image from "next/image";

export default function FeaturedPlayerCard({ player }) {
	// let badges = new Array(5).fill("");
	// let playerIg = player.instagram;

	// // remove '@' when trying to view IG profile
	// if (playerIg[0] === "@") playerIg = playerIg.substring(1);

	// // get and sort average stats
	// let avgStats = [
	// 	{
	// 		label: "APG",
	// 		average: player.averageStats?.assists,
	// 	},
	// 	{
	// 		label: "RPG",
	// 		average: player.averageStats?.rebounds,
	// 	},
	// 	{
	// 		label: "BPG",
	// 		average: player.averageStats?.blocks,
	// 	},
	// 	{
	// 		label: "SPG",
	// 		average: player.averageStats?.steals,
	// 	},
	// ].sort((a, b) => (a.average < b.average ? 1 : -1));

	// avgStats = [
	// 	{
	// 		label: "PPG",
	// 		average: player.averageStats?.points,
	// 	},
	// 	...avgStats,
	// ];

	// // find badges
	// const allStats = player.allStats;

	// // 20 pt game
	// if (allStats?.filter((game) => game.points >= 20).length > 0) {
	// 	badges.unshift(twentyPtBadge.src);
	// 	badges.pop();
	// }

	// // 30 pt game
	// if (allStats?.filter((game) => game.points >= 30).length > 0) {
	// 	badges.unshift(thirtyPtBadge.src);
	// 	badges.pop();
	// }

	console.log("player:", player);

	const currentGame = player.allStats.find(
		(stat) => stat.game === player.currentGame
	);

	return (
		<>
			{!player.potg && (
				<div className="h-full rounded border border-neutral-600 bg-neutral-700">
					<div className="flex flex-col">
						{/* pic / name / team / division */}
						<div className="flex items-center justify-between gap-3 border-b border-neutral-600 px-2 py-3.5 md:min-h-[120px] md:px-6 2xl:min-h-0">
							<TeamLogo
								primary={player.team?.primaryColor || ""}
								secondary={player.team?.secondaryColor || ""}
								tertiary={player.team?.tertiaryColor || ""}
								width={35}
								height={34}
								circleHeight={3}
								circleWidth={4}
							/>
							<div className="flex w-full flex-col">
								<div className="flex w-full justify-between">
									<h6 className="font-barlow text-xs font-medium uppercase text-neutral-500">
										{player.team?.teamName} | #{player.jerseyNumber}
									</h6>
									<Badge variant="playerCard">
										{player.division.divisionName}
									</Badge>
								</div>
								<Link
									href={`/players/${player._id}`}
									className="font-barlow w-fit truncate text-lg uppercase text-neutral-100 transition hover:opacity-80"
								>
									{player.playerName}
								</Link>
								{player.instagram !== "" && (
									<Link
										href={`https://www.instagram.com/${extractInstagramUsername(
											player.instagram
										)}`}
										target="_blank"
										className="font-barlow mt-1 flex w-fit gap-1 text-sm text-neutral-400 transition-all hover:text-neutral-200"
									>
										IG:{" "}
										<span className="lowercase">
											{extractInstagramUsername(player.instagram)}
										</span>
									</Link>
								)}
							</div>
						</div>

						{/* stats table */}
						<div className="h-fit border-b border-neutral-600"></div>

						{/* badges */}
						{/* <div className="flex justify-center gap-x-2 border-b border-neutral-600 px-5 py-3">
				{badges.map((badge, index) => {
					const hasBadge = badge.length > 0;

					return (
						<div
							className={`flex h-[60px] w-[60px] justify-center rounded-xl bg-neutral-600 ${
								hasBadge &&
								"cursor-pointer transition hover:scale-150 hover:border hover:border-neutral-300"
							}`}
							key={index}
						>
							{hasBadge ? (
								<Image
									src={badge}
									alt={""}
									width={200}
									height={200}
									className="h-full w-auto"
								/>
							) : (
								""
							)}
						</div>
					);
				})}
			</div> */}

						{/* avg stats */}
						<div className="flex justify-center gap-2 border-b border-neutral-600 px-4 py-3 md:gap-4">
							<div className="font-barlow flex w-full flex-col justify-center rounded-lg bg-neutral-600 py-4">
								<h6 className="text-center">PTS</h6>
								<h3 className="text-center text-[31px] font-medium">
									{currentGame.points}
								</h3>
							</div>
							<div className="font-barlow flex w-full flex-col justify-center rounded-lg bg-neutral-600 py-4">
								<h6 className="text-center">REBS</h6>
								<h3 className="text-center text-[31px] font-medium">
									{currentGame.rebounds}
								</h3>
							</div>
							<div className="font-barlow flex w-full flex-col justify-center rounded-lg bg-neutral-600 py-4">
								<h6 className="text-center">ASTS</h6>
								<h3 className="text-center text-[31px] font-medium">
									{currentGame.assists}
								</h3>
							</div>
						</div>
					</div>

					{/* view player profile */}
					<div className="px-2.5 py-4">
						<Link href={`/players/${player._id}`}>
							<Button className="w-full">View Player Profile</Button>
						</Link>
					</div>
				</div>
			)}

			{player.potg && (
				<div className="rounded-lg bg-[#11161F] p-5 ">
					<div className="relative rounded-bl-3xl border-8 border-blue-500">
						<Image
							className="rounded-bl-3xl "
							src={player.potg?.image}
							alt="preview player of the game image"
						/>

						<span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform rounded bg-blue-500 px-10 py-3 text-white">
							Elite Division
						</span>
					</div>
					<div className="mt-10 flex text-white">
						<div className="flex w-1/4 flex-col">
							<span>Team | #2</span>
							<span>{player.playerName}</span>
							<span>{extractInstagramUsername(player.instagram)}</span>
						</div>
						<div className="flex w-3/4 justify-evenly">
							<div className="flex flex-col">
								<span>PTS</span>
								<span>{currentGame.points}</span>
							</div>
							<div className="flex flex-col">
								<span>ASTS</span>
								<span>{currentGame.assists}</span>
							</div>
							<div className="flex flex-col">
								<span>REBS</span>
								<span>{currentGame.rebounds}</span>
							</div>
							<div className="flex flex-col">
								<span>STLS</span>
								<span>{currentGame.steals}</span>
							</div>
							<div className="flex flex-col">
								<span>BLKS</span>
								<span>{currentGame.blocks}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
