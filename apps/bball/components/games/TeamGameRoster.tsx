"use client";
import { useState } from "react";
import Link from "next/link";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";

export default function TeamGameRoster({ game }) {
	const [players, setPlayers] = useState(game.homeTeam.players);

	return (
		<div className=" mx-auto my-10 w-11/12">
			<div>
				<h3
					style={{ borderColor: "#282828" }}
					className="font-barlow border-b py-10 text-2xl font-semibold text-white"
				>
					Players
				</h3>
				<ul
					style={{
						borderColor: "#282828",
					}}
					className="no-scrollbar  mb-10 flex  gap-10 pt-10"
				>
					<li
						className={` font-barlow cursor-pointer  pb-8 text-start text-lg font-semibold ${
							players === game.homeTeam.players
								? "border-primary text-primary border-b-2 "
								: "text-white text-opacity-50"
						}`}
						onClick={() => setPlayers(game.homeTeam.players)}
					>
						<span className="uppercase">{game.homeTeam.teamName}</span>
					</li>
					<li
						className={` font-barlow cursor-pointer  pb-8 text-start text-lg font-semibold ${
							players === game.awayTeam.players
								? "border-primary text-primary border-b-2 "
								: "text-white text-opacity-50"
						}`}
						onClick={() => setPlayers(game.awayTeam.players)}
					>
						<span className="uppercase">{game.awayTeam.teamName}</span>
					</li>
				</ul>
			</div>
			<Table>
				<TableHeader>
					<TableRow className="font-oswald">
						<TableHead className="w-1/3 text-left sm:w-1/6">PLAYER</TableHead>
						<TableHead>PTS</TableHead>
						<TableHead>REB</TableHead>
						<TableHead>AST</TableHead>
						<TableHead>BLK</TableHead>
						<TableHead>STL</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{players?.map((player, index) => (
						<TableRow className="font-oswald font-semibold" key={index}>
							<TableCell className=" w-1/3 border-r  border-neutral-600 text-left  sm:w-1/6">
								<Link
									href={`/players/${player._id}`}
									className="hover:underline"
								>
									{player.playerName}
								</Link>
							</TableCell>
							<TableCell>{player.averageStats.points.toFixed(1)}</TableCell>
							<TableCell>{player.averageStats.rebounds.toFixed(1)}</TableCell>
							<TableCell>{player.averageStats.assists.toFixed(1)}</TableCell>
							<TableCell>{player.averageStats.blocks.toFixed(1)}</TableCell>
							<TableCell>{player.averageStats.steals.toFixed(1)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
