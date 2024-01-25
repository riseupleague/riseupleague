"use client";

import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";
import { Button } from "@ui/components/button";
import TeamLogo from "./icons/TeamLogo";

export default function FeaturedPlayerCard({ player }) {
	let badges = new Array(5).fill("");
	let playerIg = player.instagram;

	// remove '@' when trying to view IG profile
	if (playerIg[0] === "@") playerIg = playerIg.substring(1);

	// get and sort average stats
	let avgStats = [
		{
			label: "APG",
			average: player.averageStats?.assists,
		},
		{
			label: "RPG",
			average: player.averageStats?.rebounds,
		},
		{
			label: "BPG",
			average: player.averageStats?.blocks,
		},
		{
			label: "SPG",
			average: player.averageStats?.steals,
		},
	].sort((a, b) => (a.average < b.average ? 1 : -1));

	avgStats = [
		{
			label: "PPG",
			average: player.averageStats?.points,
		},
		...avgStats,
	];

	// find badges
	const allStats = player.allStats;

	// 20 pt game
	if (allStats?.filter((game) => game.points >= 20).length > 0) {
		badges.unshift(twentyPtBadge.src);
		badges.pop();
	}

	// 30 pt game
	if (allStats?.filter((game) => game.points >= 30).length > 0) {
		badges.unshift(thirtyPtBadge.src);
		badges.pop();
	}

	return (
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
							<div className="font-barlow flex items-center justify-center rounded-md bg-neutral-600 px-1 text-center text-xs uppercase">
								{player.division.divisionName}
							</div>
						</div>
						<Link
							href={`/players/${player._id}`}
							className="font-barlow w-fit truncate text-lg uppercase text-neutral-100 transition hover:opacity-80"
						>
							{player.playerName}
						</Link>
						{player.instagram !== "" && (
							<Link
								href={`https://www.instagram.com/${playerIg}`}
								target="_blank"
								className="font-barlow mt-1 flex w-fit gap-1 text-sm text-neutral-400 transition-all hover:text-neutral-200"
							>
								IG: <span className="lowercase">{playerIg}</span>
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
					{avgStats.slice(0, 3).map((stat, index) => (
						<div
							key={index}
							className="font-barlow flex w-full flex-col justify-center rounded-lg bg-neutral-600 py-4"
						>
							<h6 className="text-center">{stat.label}</h6>
							<h3 className="text-center text-[31px] font-medium">
								{stat.average.toFixed(1)}
							</h3>
						</div>
					))}
				</div>
			</div>

			{/* view player profile */}
			<div className="px-2.5 py-4">
				<Link href={`/players/${player._id}`}>
					<Button className="w-full">View Player Profile</Button>
				</Link>
			</div>
		</div>
	);
}
