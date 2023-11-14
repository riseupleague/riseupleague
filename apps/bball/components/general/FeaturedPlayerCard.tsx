"use client";

import Image from "next/image";
import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";
import { Button } from "@ui/components/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";

export default function FeaturedPlayerCard({ player, division }) {
	let badges = new Array(5).fill("");

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
		<div className="flex h-full flex-col rounded border border-neutral-600 bg-neutral-700">
			<div className="flex-1">
				{/* pic / name / team / division */}
				<div className="flex justify-between gap-3 border-b border-neutral-600 px-6 py-3.5">
					<figure className="h-[52px] w-[52px] rounded-full bg-[#d9d9d9]"></figure>
					<div className="flex w-full flex-col">
						<div className="flex w-full justify-between">
							<h6 className="font-barlow font-medium uppercase text-neutral-500">
								team {player.team?.substring(0, 5)}... | #{player.jerseyNumber}
							</h6>
							<div className="flex justify-center rounded-md bg-neutral-600 px-4 py-1">
								<p className="font-barlow text-xs font-medium uppercase">
									{division}
								</p>
							</div>
						</div>
						<Link
							href={`/players/${player._id}`}
							className="font-barlow w-fit truncate text-2xl uppercase text-neutral-100 transition hover:opacity-80"
						>
							{player.playerName}
						</Link>
					</div>
				</div>

				{/* stats table */}
				<div className="h-fit border-b border-neutral-600"></div>

				{/* badges */}
				<div className="flex justify-center gap-x-2 border-b border-neutral-600 px-5 py-3">
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
				</div>

				{/* previous games table */}
				<Table>
					<TableHeader>
						<TableRow className="font-oswald border-b-neutral-600 uppercase">
							<TableHead className="px-2 text-sm font-normal">game</TableHead>
							{/* <TableHead className="px-2 text-sm font-normal">matchup</TableHead> */}
							<TableHead className="px-2 text-sm font-normal">pts</TableHead>
							<TableHead className="px-2 text-sm font-normal">reb</TableHead>
							<TableHead className="px-2 text-sm font-normal">ast</TableHead>
							<TableHead className="px-2 text-sm font-normal">stl</TableHead>
							<TableHead className="px-2 text-sm font-normal">blk</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{allStats
							?.map((game, index) => (
								<TableRow
									className="font-oswald border-b-0 text-sm uppercase"
									key={index}
								>
									<TableCell className="py-2">
										{allStats.length - index}
									</TableCell>
									{/* <TableCell className="py-2">???</TableCell> */}
									<TableCell className="py-2">{game.points}</TableCell>
									<TableCell className="py-2">{game.rebounds}</TableCell>
									<TableCell className="py-2">{game.assists}</TableCell>
									<TableCell className="py-2">{game.steals}</TableCell>
									<TableCell className="py-2">{game.blocks}</TableCell>
								</TableRow>
							))
							.slice(0, 4)}
					</TableBody>
				</Table>

				{/* avg stats */}
				<div className="flex justify-center gap-4 border-b border-neutral-600 px-4 py-3">
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
