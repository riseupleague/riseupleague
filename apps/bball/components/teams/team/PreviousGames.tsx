"use client";

import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";

const PreviousGames = ({ team }): JSX.Element => {
	return (
		<div className="mt-10">
			<h3 className="my-6">Previous Games</h3>

			<hr />

			<Table>
				<TableHeader>
					<TableRow className="font-barlow border-b border-neutral-500 uppercase">
						<TableHead className="w-1/4 p-1 text-left text-sm sm:w-1/6 sm:text-lg lg:w-1/12">
							W/L
						</TableHead>
						<TableHead className="w-1/2 p-1 text-left text-sm sm:w-auto sm:text-lg">
							Game
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
							PTS
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm  sm:w-auto sm:text-lg">
							REB
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
							AST
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
							BLK
						</TableHead>
						<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
							STL
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{team?.seasonStatistics?.map((stats, index) => {
						if (stats.game?.status) {
							const isHomeTeam =
								stats.game?.homeTeam.teamName === team.teamName;

							const opponent = isHomeTeam
								? stats.game?.awayTeam.teamName
								: stats.game?.homeTeam.teamName;

							const isWin =
								(isHomeTeam &&
									stats.game?.homeTeamScore >= stats.game?.awayTeamScore) ||
								(!isHomeTeam &&
									stats.game?.awayTeamScore >= stats.game?.homeTeamScore);

							return (
								<TableRow
									key={index}
									className="font-barlow border-b-neutral-500"
								>
									<TableCell className="w-1/4 p-1 text-left text-sm sm:w-1/6 sm:text-lg lg:w-1/12">
										<span
											className={`${isWin ? "text-green-600" : "text-primary"}`}
										>
											{isWin ? "W " : "L "}
										</span>
										{stats.game?.homeTeamScore} - {stats.game?.awayTeamScore}
									</TableCell>
									<TableCell className="w-1/2 p-1 text-left text-sm sm:w-auto sm:text-lg">
										<Link
											href={`/games/summary/${stats.game?._id}`}
											className="hover:underline"
										>
											vs {opponent}
										</Link>
									</TableCell>
									<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										{stats.points}
									</TableCell>
									<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										{stats.rebounds}
									</TableCell>
									<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										{stats.assists}
									</TableCell>
									<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										{stats.blocks}
									</TableCell>
									<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										{stats.steals}
									</TableCell>
								</TableRow>
							);
						}
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default PreviousGames;
