"use client";

import { Button } from "@ui/components/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import Link from "next/link";

const PlayersTable = ({ players }) => {
	return (
		<Table>
			<TableCaption className="text-lg text-neutral-300">
				{players?.length} player{players?.length !== 1 && "s"}
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-left text-base md:text-xl">Name</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Date Joined
					</TableHead>
					<TableHead className="text-left text-base md:text-xl">Team</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Division
					</TableHead>
					<TableHead className="text-left text-base md:text-xl">User</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{players
					.sort((a, b) => a.playerName.localeCompare(b.playerName))
					.map((player, index) => {
						return (
							<TableRow key={index}>
								<TableCell className="text-left text-base md:text-lg">
									<span className="transition-all hover:text-neutral-300 hover:underline">
										{player?.playerName}{" "}
										{/* {team?.paid ? (
											<span className="text-sm uppercase text-green-500">
												- Paid full
											</span>
										) : (
											""
										)} */}
									</span>
								</TableCell>
								<TableCell className="text-center text-base md:text-lg">
									{player?.createdAt}
								</TableCell>
								<TableCell className="text-left text-base md:text-lg">
									<span className="transition-all hover:text-neutral-300 hover:underline">
										{player?.division?.divisionName}{" "}
									</span>
								</TableCell>
								<TableCell className="text-left text-base md:text-lg">
									<span className="transition-all hover:text-neutral-300 hover:underline">
										{player?.team?.teamName}{" "}
									</span>
								</TableCell>
								<TableCell className="text-left text-base md:text-lg">
									<span className="transition-all hover:text-neutral-300 hover:underline">
										{player?.user}{" "}
									</span>
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
};

export default PlayersTable;
