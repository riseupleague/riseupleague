"use client";

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

const TeamsTable = ({ teams }) => {
	return (
		<Table>
			<TableCaption className="text-lg text-neutral-300">
				{teams?.length} team{teams?.length !== 1 && "s"}
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-left text-base md:text-xl">
						Team Name
					</TableHead>
					<TableHead className="text-center text-base md:text-xl">
						# Players
					</TableHead>
					<TableHead className="text-left text-base md:text-xl">
						Team Captain
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teams
					.sort((a, b) => (a.teamName > b.teamName ? 1 : -1))
					.map((team, index) => {
						const teamCaptain = team?.players?.find(
							(player) => player?.teamCaptain
						);

						return (
							<TableRow key={index}>
								<TableCell className="text-left text-base md:text-lg">
									<Link
										href={`/team-management/team/${team?._id}`}
										className="transition-all hover:text-neutral-300 hover:underline"
									>
										{team?.teamName}
									</Link>
								</TableCell>
								<TableCell className="text-center text-base md:text-lg">
									{team?.players?.length}
								</TableCell>
								<TableCell className="text-left text-base md:text-lg">
									{teamCaptain}
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
};

export default TeamsTable;
