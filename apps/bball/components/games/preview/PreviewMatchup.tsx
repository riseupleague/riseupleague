"use client";

import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import { Fragment, useState } from "react";
import { Button } from "@ui/components/button";

export default function PreviewMatchup({ game }) {
	const [currentTeam, setCurrentTeam] = useState(game.homeTeam);

	return (
		<div>
			<h2 className="font-oswald my-8 text-center text-3xl font-bold uppercase">
				Preview Matchup
			</h2>

			<div className="my-8 flex justify-center">
				<Button
					onClick={() => setCurrentTeam(game.homeTeam)}
					className={`w-1/2 border-0 px-0 text-xl md:px-12 ${
						game.homeTeam.teamName === currentTeam.teamName &&
						"text-primary underline"
					}`}
					variant="secondary"
				>
					{game.homeTeam.teamName}
				</Button>
				<Button
					onClick={() => setCurrentTeam(game.awayTeam)}
					className={`w-1/2 border-0 px-0 text-xl md:px-12 ${
						game.awayTeam.teamName === currentTeam.teamName &&
						"text-primary underline"
					}`}
					variant="secondary"
				>
					{game.awayTeam.teamName}
				</Button>
			</div>

			<Table className="font-barlow">
				<TableHeader>
					<TableRow className="md:text-md h-10 border-b-neutral-500 text-sm uppercase md:text-lg">
						<TableHead className="w-1/2 p-1 text-left sm:w-1/6">
							player
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm md:text-lg">pts</TableHead>
						<TableHead className="w-1/12 p-1 text-sm md:text-lg">reb</TableHead>
						<TableHead className="w-1/12 p-1 text-sm md:text-lg">ast</TableHead>
						<TableHead className="w-1/12 p-1 text-sm md:text-lg">blk</TableHead>
						<TableHead className="w-1/12 p-1 text-sm md:text-lg">stl</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentTeam.players.map((player, index) => {
						return (
							<TableRow
								key={index}
								className="h-10 border-b-neutral-500 text-sm md:text-lg"
							>
								<TableCell className="w-1/2 p-1 text-left sm:w-1/12">
									<Link
										href={`/players/${player._id}`}
										className="transition-all hover:underline"
									>
										{player.playerName}
									</Link>
								</TableCell>
								<TableCell className="w-1/12 p-1">
									{player.averageStats.points.toFixed(1)}
								</TableCell>
								<TableCell className="w-1/12 p-1">
									{player.averageStats.rebounds.toFixed(1)}
								</TableCell>
								<TableCell className="w-1/12 p-1">
									{player.averageStats.assists.toFixed(1)}
								</TableCell>
								<TableCell className="w-1/12 p-1">
									{player.averageStats.blocks.toFixed(1)}
								</TableCell>
								<TableCell className="w-1/12 p-1">
									{player.averageStats.steals.toFixed(1)}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
