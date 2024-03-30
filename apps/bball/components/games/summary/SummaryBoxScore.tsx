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
import SummaryPOTG from "./SummaryPOTG";

const SummaryBoxScore = ({ game }): JSX.Element => {
	const [currentTeam, setCurrentTeam] = useState(game.homeTeam);

	return (
		<div>
			<h2 className="text-center">Box Score</h2>

			{game.playerOfTheGame && (
				<SummaryPOTG playerOfTheGame={game.playerOfTheGame} game={game} />
			)}

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
					{currentTeam.players
						.sort((a, b) => (a.playerName > b.playerName ? 1 : -1))
						.map((player, index) => {
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
											{player.playerName}{" "}
											<span className="text-neutral-400">
												| #{player.jerseyNumber}
											</span>
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
};

export default SummaryBoxScore;
