"use client";

import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";
import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import TeamLogo from "./icons/TeamLogo";
import { extractInstagramUsername } from "@/utils/extractInstagram";
import Image from "next/image";

export default function playerOfTheGame({ player }) {
	const currentGame = player.allStats.find(
		(stat) => stat.game === player.currentGame
	);

	return (
		<Link
			href={`/players/${player._id}`}
			className="rounded-lg bg-[#11161F] p-5 transition duration-300 ease-in-out hover:bg-gray-800"
		>
			<div className="relative rounded-bl-3xl border-8 border-blue-500">
				<Image
					className=""
					src={player.potg?.image}
					alt="preview player of the game image"
					style={{ width: "100% !important", height: "100% !important" }} // Set width and height to auto
					width={400}
					height={600}
				/>

				<Badge
					className="absolute left-1/2 top-0 z-10 block -translate-x-1/2 -translate-y-1/2 transform rounded border border-neutral-500 bg-neutral-500 px-10 py-3 uppercase text-white hover:bg-neutral-500"
					style={{ whiteSpace: "nowrap" }}
				>
					{" "}
					{player.division.divisionName}
				</Badge>
			</div>
			<div className="mt-10 flex text-white">
				<div className="flex w-1/4 flex-col">
					<Link href={`/teams/${player.team._id}`}>
						{player.team.teamName} | #{player.jerseyNumber}
					</Link>
					<Link
						href={`/players/${player._id}`}
						className="font-barlow  text-lg uppercase text-neutral-100 transition hover:opacity-80"
					>
						{player.playerName}
					</Link>
					<span>{extractInstagramUsername(player.instagram)}</span>
				</div>
				<div className="flex w-3/4 justify-evenly">
					<div className="flex flex-col  font-semibold">
						<span className="text-lg">PTS</span>
						<span className="text-center text-xl font-bold">
							{currentGame.points}
						</span>
					</div>
					<div className="flex flex-col  font-semibold">
						<span className="text-lg">ASTS</span>
						<span className="text-center text-xl font-bold">
							{currentGame.assists}
						</span>
					</div>
					<div className="flex flex-col  font-semibold">
						<span className="text-lg">REBS</span>
						<span className="text-center text-xl font-bold">
							{currentGame.rebounds}
						</span>
					</div>
					<div className="flex flex-col  font-semibold">
						<span className="text-lg">STLS</span>
						<span className="text-center text-xl font-bold">
							{currentGame.steals}
						</span>
					</div>
					<div className="flex flex-col  font-semibold">
						<span className="text-lg">BLKS</span>
						<span className="text-center text-xl font-bold">
							{currentGame.blocks}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
