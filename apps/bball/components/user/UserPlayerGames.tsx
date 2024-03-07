import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import Link from "next/link";
import { convertToEST } from "@/utils/convertToEST";
import { format } from "date-fns";
const UserPlayerGames = ({ games }) => {
	return (
		<div>
			{" "}
			<Table className="font-barlow">
				<TableHeader>
					<TableRow className="md:text-md h-10 border-b-neutral-500 text-sm uppercase md:text-lg">
						<TableHead className="w-1/3 p-1 text-left sm:w-1/6">Game</TableHead>
						<TableHead className="w-1/3 p-1 text-sm md:text-lg">
							Date & Time
						</TableHead>

						<TableHead className="w-1/3 p-1 text-sm md:text-lg">
							Location
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{games?.map((game, index) => {
						const date = convertToEST(new Date(game.date));
						const formattedDate = format(date, "E L/d @ h:mm a");

						return (
							<TableRow
								key={index}
								className="h-10 border-b-neutral-500 text-sm md:text-lg"
							>
								<TableCell className="w-1/3 p-1 text-left sm:w-1/12">
									<Link
										href={`/games/preview/${game?._id}`}
										className="transition-all hover:underline"
									>
										{game?.gameName}
									</Link>
								</TableCell>
								<TableCell className="w-1/3 p-1">{formattedDate}</TableCell>
								<TableCell className="w-1/3 p-1">{game.location}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default UserPlayerGames;
