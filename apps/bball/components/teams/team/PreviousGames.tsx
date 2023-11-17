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

const PreviousGames = ({ team }) => {
	return (
		<div className="mt-10">
			<h3 className="my-6">Previous Games</h3>

			<hr />

			<Table>
				<TableHeader>
					<TableRow className="font-barlow border-b border-neutral-500 uppercase">
						<TableHead className="bg-transparent text-center text-sm sm:w-auto sm:text-lg">
							W/L
						</TableHead>
						<TableHead className="w-1/3 bg-transparent text-left text-sm sm:w-auto sm:text-lg">
							Game
						</TableHead>
						<TableHead className="bg-transparent text-sm sm:text-lg">
							PTS
						</TableHead>
						<TableHead className="bg-transparent text-sm sm:text-lg">
							REB
						</TableHead>
						<TableHead className="bg-transparent text-sm sm:text-lg">
							AST
						</TableHead>
						<TableHead className="bg-transparent text-sm sm:text-lg">
							BLK
						</TableHead>
						<TableHead className="bg-transparent text-sm sm:text-lg">
							STL
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{team?.seasonStatistics?.map((stats, index) => {
						if (stats.game?.status) {
							const isHomeTeam =
								stats.game?.homeTeam.teamName === team.teamName;
							const isWin =
								(isHomeTeam &&
									stats.game?.homeTeamScore >= stats.game?.awayTeamScore) ||
								(!isHomeTeam &&
									stats.game?.awayTeamScore >= stats.game?.homeTeamScore);

							return (
								<TableRow
									key={index}
									className="font-oswald border-b-neutral-500"
								>
									<TableCell>
										<span
											className={`${isWin ? "text-green-600" : "text-primary"}`}
										>
											{isWin ? "W " : "L "}
										</span>
										{stats.game?.homeTeamScore} - {stats.game?.awayTeamScore}
									</TableCell>
									<TableCell className="w-1/2 text-left sm:w-auto">
										<Link
											href={`/games/summary/${stats.game?._id}`}
											className="hover:underline"
										>
											{stats.game?.gameName}
										</Link>
									</TableCell>
									<TableCell>{stats.points}</TableCell>
									<TableCell>{stats.rebounds}</TableCell>
									<TableCell>{stats.assists}</TableCell>
									<TableCell>{stats.blocks}</TableCell>
									<TableCell>{stats.steals}</TableCell>
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
