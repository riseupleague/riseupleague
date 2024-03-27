"use client";

import { convertToEST } from "@/utils/convertToEST";
import { isWithin24Hours } from "@/utils/isWithin24Hours";
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
import { format } from "date-fns";
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

					<TableHead className="text-left text-base md:text-xl">Team</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Division
					</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Date Joined
					</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Customer
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{players.map((player, index) => {
					console.log(player?.createdAt);
					const dateCreated = convertToEST(new Date(player?.createdAt));
					const dateFormatted = format(dateCreated, "ccc MMM do, uuuu");
					const time = format(dateCreated, "h:mma");
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
								{player?.createdAt ? (
									<>
										{isWithin24Hours(dateCreated) && (
											<span className="text-sm text-red-500">New</span>
										)}
									</>
								) : (
									""
								)}
							</TableCell>
							<TableCell className="text-left text-base md:text-lg">
								<span className="transition-all hover:text-neutral-300 hover:underline">
									{player?.team?.teamName || (
										<span className="text-primary">Free Agent</span>
									)}{" "}
								</span>
							</TableCell>
							<TableCell className="text-left text-base md:text-lg">
								<span className="transition-all hover:text-neutral-300 hover:underline">
									{player?.division?.divisionName}{" "}
								</span>
							</TableCell>

							<TableCell className="text-left text-base md:text-lg">
								{dateFormatted} at {time}
							</TableCell>
							<TableCell className="text-left text-base md:text-lg">
								<Link
									href={`/customer-management/${player?.user?._id}`}
									className="transition-all hover:text-neutral-300 hover:underline"
								>
									{player?.user?.name}{" "}
								</Link>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default PlayersTable;
