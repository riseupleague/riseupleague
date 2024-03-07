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
		<Link
			href={`/players/${player._id}`}
			className="r ounded border border-neutral-600 bg-neutral-700 transition duration-300 ease-in-out hover:bg-gray-800"
		>
			<div className="flex flex-col">
				{/* Image */}

				{player.playerImage && player.playerImage !== "" ? (
					<div className="relative m-3 rounded-bl-3xl border-8 border-blue-500">
						<Image
							className="!h-full !w-full"
							src={player.playerImage}
							alt="preview player of the game image"
							width={200}
							height={300}
						/>
					</div>
				) : (
					<div className="relative m-3  rounded-bl-3xl border-8 border-blue-500 ">
						<Image
							className="mt-32 !h-full !w-full rounded-bl-2xl"
							src={"/images/default-profile-pic.png"}
							alt="preview player of the game image"
							width={300}
							height={500}
						/>
					</div>
				)}

				<div className="m-2 flex items-center justify-between">
					<div>
						<p className="font-barlow text-md overflow-hidden whitespace-nowrap uppercase md:text-2xl">
							{player.playerName}
						</p>
						{player.instagram && (
							<p className="text-sm text-neutral-500">
								IG: {extractInstagramUsername(player.instagram)}
							</p>
						)}
					</div>
					<p className="font-barlow overflow-hidden whitespace-nowrap text-2xl text-neutral-500 md:text-4xl">
						#{player.jerseyNumber}
					</p>
				</div>
			</div>
		</Link>
	);
}
