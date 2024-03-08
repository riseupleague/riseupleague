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
			className="rounded-lg bg-[#11161F]  transition duration-300 ease-in-out hover:bg-gray-800"
		>
			<div className="p-5">
				<div className="relative rounded-bl-3xl border-8 border-white">
					<Image
						className="!h-full !w-full"
						src={player.potg?.image}
						alt="preview player of the game image"
						width={400}
						height={600}
					/>

					<Badge className="absolute left-1/2 top-0 z-10 block -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded border border-neutral-500 bg-neutral-500 px-10 py-3 uppercase text-white hover:bg-neutral-500">
						{" "}
						{player.division.divisionName}
					</Badge>
				</div>
				<div className="mt-5 flex flex-col text-white">
					<div className="flex justify-between">
						<div className="flex flex-col">
							<Link href={`/teams/${player.team._id}`}>
								{player.team.teamName} | #{player.jerseyNumber}
							</Link>
							<Link
								href={`/players/${player._id}`}
								className="font-barlow  text-lg uppercase text-neutral-100 transition hover:opacity-80"
							>
								{player.playerName}
							</Link>
						</div>
						{player.instagram && (
							<span>ig: {extractInstagramUsername(player.instagram)}</span>
						)}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-5 justify-between pb-5">
				<div className="flex flex-col font-semibold">
					<span className="text-md bg-neutral-600 py-2 text-center font-normal">
						PTS
					</span>
					<span className="mt-3 text-center  text-3xl font-bold">
						{currentGame.points}
					</span>
				</div>
				<div className="flex flex-col  font-semibold">
					<span className="text-md bg-neutral-600 py-2 text-center font-normal">
						ASTS
					</span>
					<span className="mt-3 text-center  text-3xl font-bold">
						{currentGame.assists}
					</span>
				</div>
				<div className="flex flex-col  font-semibold">
					<span className="text-md bg-neutral-600 py-2 text-center font-normal">
						REBS
					</span>
					<span className="mt-3 text-center  text-3xl font-bold">
						{currentGame.rebounds}
					</span>
				</div>
				<div className="flex flex-col  font-semibold">
					<span className="text-md bg-neutral-600 py-2 text-center font-normal">
						STLS
					</span>
					<span className="mt-3 text-center  text-3xl font-bold">
						{currentGame.steals}
					</span>
				</div>
				<div className="flex flex-col  font-semibold">
					<span className="text-md bg-neutral-600 py-2 text-center font-normal">
						BLKS
					</span>
					<span className="mt-3 text-center  text-3xl font-bold">
						{currentGame.blocks}
					</span>
				</div>
			</div>
		</Link>
	);
}
