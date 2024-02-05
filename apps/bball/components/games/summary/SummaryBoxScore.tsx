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

export default function SummaryBoxScore({ game }) {
	const [currentTeam, setCurrentTeam] = useState(game.homeTeam);
	const allPlayers = [...game.homeTeam.players, ...game.awayTeam.players];

	// get potg
	const playerOfTheGame = allPlayers.filter(
		(player) => player._id === game.playerOfTheGame
	)[0];

	// get team name
	const potgTeam =
		playerOfTheGame._id === game.homeTeam._id ? game.homeTeam : game.awayTeam;

	// get stats
	const potgStats = playerOfTheGame.allStats.filter(
		(playerGame) => playerGame.game === game._id
	)[0];

	// trim ig if '@' sign included
	let playerIg = playerOfTheGame.instagram;
	if (playerIg[0] === "@") playerIg = playerIg.substring(1);

	return (
		<div>
			<h2 className="text-center">Box Score</h2>

			{/* POTG */}
			<div className="mx-auto my-8 flex max-w-3xl flex-col rounded border border-neutral-600 bg-neutral-800 p-4 md:p-8">
				<h3 className="mb-8 text-center">Player of the Game:</h3>
				<div className="flex flex-col gap-8 md:flex-row md:gap-0">
					{/* name / team / ig / # / picture  */}
					<div className="font-barlow flex w-full flex-col justify-center gap-1 md:w-1/2">
						<p className="text-base text-neutral-500">
							<Link
								href={`/teams/${potgTeam._id}`}
								className="uppercase transition-all hover:text-neutral-300"
							>
								{potgTeam.teamName}
							</Link>{" "}
							| # {playerOfTheGame.jerseyNumber}
						</p>
						<Link
							href={`/players/${playerOfTheGame._id}`}
							className="w-fit text-3xl uppercase transition-all hover:text-neutral-400"
						>
							{playerOfTheGame.playerName}
						</Link>
						{playerIg && (
							<Link
								href={`https://www.instagram.com/${playerIg}`}
								target="_blank"
								className="w-fit text-xl lowercase text-neutral-500 transition-all hover:text-neutral-400"
							>
								<span className="uppercase">IG: </span>
								{playerIg}
							</Link>
						)}
					</div>

					{/* pts reb ast stl blk */}
					<div className="grid w-full grid-cols-5 gap-2 text-center uppercase md:w-1/2">
						<p>PTS</p>
						<p>REB</p>
						<p>AST</p>
						<p>BLK</p>
						<p>STL</p>
						<p className="text-3xl">{potgStats.points}</p>
						<p className="text-3xl">{potgStats.rebounds}</p>
						<p className="text-3xl">{potgStats.assists}</p>
						<p className="text-3xl">{potgStats.blocks}</p>
						<p className="text-3xl">{potgStats.steals}</p>
					</div>
				</div>
			</div>

			{/* team tabs */}
			<div className="my-8 flex justify-center">
				<Button
					onClick={() => setCurrentTeam(game.homeTeam)}
					className={`border-primary w-1/2 rounded-none border-0 px-0 text-xl md:px-12 ${
						game.homeTeam.teamName === currentTeam.teamName &&
						"text-primary border-b"
					}`}
					variant="secondary"
				>
					{game.homeTeam.teamName}
				</Button>
				<Button
					onClick={() => setCurrentTeam(game.awayTeam)}
					className={`border-primary w-1/2 rounded-none border-0 px-0 text-xl md:px-12 ${
						game.awayTeam.teamName === currentTeam.teamName &&
						"text-primary border-b"
					}`}
					variant="secondary"
				>
					{game.awayTeam.teamName}
				</Button>
			</div>

			{/* box score table */}
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
						// DNP stat
						let DNP = player.allStats.filter(
							(playerGame) => playerGame.game === game._id
						)[0]
							? false
							: true;

						return (
							<TableRow
								key={index}
								className="h-10 border-b-neutral-500 text-sm capitalize md:text-lg"
							>
								<TableCell className="w-1/2 p-1 text-left sm:w-1/12">
									<Link
										href={`/players/${player._id}`}
										className="transition-all hover:underline"
									>
										{player.playerName}
									</Link>
								</TableCell>
								{!DNP ? (
									player.allStats.map((stat, index) => {
										if (stat.game === game._id) {
											return (
												<Fragment key={index}>
													<TableCell className="w-1/12 p-1">
														{stat.points === null ? "DNP" : stat.points}
													</TableCell>
													<TableCell className="w-1/12 p-1">
														{stat.rebounds}
													</TableCell>
													<TableCell className="w-1/12 p-1">
														{stat.assists}
													</TableCell>
													<TableCell className="w-1/12 p-1">
														{stat.blocks}
													</TableCell>
													<TableCell className="w-1/12 p-1">
														{stat.steals}
													</TableCell>
												</Fragment>
											);
										}
									})
								) : (
									<Fragment key={index}>
										<TableCell className="w-1/12 p-1 text-neutral-500">
											DNP
										</TableCell>
										<TableCell className="w-1/12 p-1 text-neutral-500">
											DNP
										</TableCell>
										<TableCell className="w-1/12 p-1 text-neutral-500">
											DNP
										</TableCell>
										<TableCell className="w-1/12 p-1 text-neutral-500">
											DNP
										</TableCell>
										<TableCell className="w-1/12 p-1 text-neutral-500">
											DNP
										</TableCell>
									</Fragment>
								)}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
