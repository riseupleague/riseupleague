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

const PreviousGames = ({ player }) => {
	return (
		<div className="mt-10">
			<h3 className="my-6">Previous Games</h3>

			<hr />

			<Table>
				<TableHeader>
					<TableRow className="font-barlow border-b border-neutral-500 uppercase">
						<TableHead className="w-1/2 p-1 text-left text-sm sm:w-auto sm:text-lg">
							Game
						</TableHead>
						<TableHead className="p-1 text-sm sm:text-lg">PTS</TableHead>
						<TableHead className="p-1 text-sm sm:text-lg">REB</TableHead>
						<TableHead className="p-1 text-sm sm:text-lg">AST</TableHead>
						<TableHead className="p-1 text-sm sm:text-lg">BLK</TableHead>
						<TableHead className="p-1 text-sm sm:text-lg">STL</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{player?.allStats?.map((stats, index) => {
						if (stats.game?.status) {
							return (
								<TableRow
									key={index}
									className="font-barlow border-b-neutral-500 text-sm sm:text-lg"
								>
									<TableCell className="w-1/2 p-1 text-left sm:w-auto">
										<Link
											href={`/games/summary/${stats.game?._id}`}
											className="hover:underline"
										>
											{stats.game?.gameName}
										</Link>
									</TableCell>
									<TableCell className="w-1/12 p-1 sm:w-auto">
										{stats.points}
									</TableCell>
									<TableCell className="w-1/12 p-1 sm:w-auto">
										{stats.rebounds}
									</TableCell>
									<TableCell className="w-1/12 p-1 sm:w-auto">
										{stats.assists}
									</TableCell>
									<TableCell className="w-1/12 p-1 sm:w-auto">
										{stats.blocks}
									</TableCell>
									<TableCell className="w-1/12 p-1 sm:w-auto">
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
