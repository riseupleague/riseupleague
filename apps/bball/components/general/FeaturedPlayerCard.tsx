"use client";

import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";
import { extractInstagramUsername } from "@utils/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function FeaturedPlayerCard({ player }) {
	let badges = new Array(5).fill("");
	let playerIg = player?.instagram || "";

	const path = usePathname();
	const isUserPage = path.includes("/user/player");
	const isRegistered = player?.user;
	const showUnregistered = isUserPage && !isRegistered;

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

				{player.playerImage ? (
					<div className="xs:h-72 relative m-3 flex h-60 items-center justify-center overflow-hidden rounded-bl-3xl border-8 border-white md:h-80">
						<Image
							className="!h-full !w-full rounded-bl-2xl object-cover"
							src={player.playerImage.image}
							alt="preview player of the game image"
							width={200}
							height={300}
						/>
					</div>
				) : (
					<div className="xs:h-72 relative m-3 flex h-60 items-center justify-center overflow-hidden rounded-bl-3xl border-8 border-white md:h-80">
						<Image
							className="mt-24 !h-full !w-full rounded-bl-2xl object-cover xl:mt-28 2xl:mt-32"
							src={"/images/default-profile-pic.png"}
							alt="preview player of the game image"
							width={200}
							height={300}
						/>
					</div>
				)}

				{showUnregistered && (
					<p className="text-primary text-center font-semibold uppercase">
						Unregistered
					</p>
				)}

				<div className="m-2 flex items-center justify-between">
					<div>
						<p className="font-barlow text-md overflow-hidden whitespace-nowrap uppercase md:text-2xl">
							{player.playerName}
						</p>
						{player.instagram && (
							<p className="text-sm text-neutral-500">
								IG:{" "}
								<span className="lowercase">
									{extractInstagramUsername(player.instagram)}
								</span>
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
