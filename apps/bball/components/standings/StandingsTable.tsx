"use client";

import { useState } from "react";
import FilterByDivision from "@/components/filters/FilterByDivision";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";

export default function StandingsTable({ divisions }) {
	const [divisionsWithTeams, setDivisionsWithTeams] = useState(divisions);
	const divisionsNameAndId = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });
	const [selectedDivision, setSelectedDivision] = useState(
		divisionsNameAndId[0]._id
	);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		if (selectedDivisionId !== "default") {
			// Filter the divisions based on the selected division name
			const filteredDivisions = divisions.filter(
				(division) => division._id === selectedDivisionId
			);

			setSelectedDivision(selectedDivisionId);
			setDivisionsWithTeams(filteredDivisions);
		} else {
			setDivisionsWithTeams(divisions);
		}
	};

	return (
		<div>
			<FilterByDivision
				selectedDivision={selectedDivision}
				handleDivisionChange={handleDivisionChange}
				divisions={divisionsNameAndId}
			/>

			<div className="mt-5 flex flex-col gap-10">
				{divisionsWithTeams.map((division) => (
					<div key={division._id}>
						<h3 className="font-barlow my-4 text-2xl font-semibold uppercase text-neutral-100">
							{division.divisionName}
						</h3>

						<Table className="font-barlow uppercase">
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead className="w-1/2 text-left sm:w-auto">
										Team
									</TableHead>
									<TableHead>W</TableHead>
									<TableHead>L</TableHead>
									<TableHead>GP</TableHead>
									<TableHead>W%</TableHead>
									<TableHead>PD</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{division.teams
									.sort((a, b) =>
										a.pointDifference > b.pointDifference ? 1 : -1
									)
									.sort((a, b) =>
										a.wpct?.toFixed(3) < b.wpct?.toFixed(3) ? 1 : -1
									)
									.map((team, index) => {
										const positivePD = team.pointDifference > 0;

										return (
											<TableRow key={index} className="text-sm md:text-lg">
												<TableCell>{index + 1}</TableCell>
												<TableCell className={`w-1/2 text-left sm:w-auto`}>
													<Link
														href={`/teams/${team._id}`}
														className="flex w-fit hover:underline"
													>
														{team.teamName}
													</Link>
												</TableCell>
												<TableCell>{team.wins || 0}</TableCell>
												<TableCell>{team.losses || 0}</TableCell>
												<TableCell>{team.gp}</TableCell>
												<TableCell>{team.wpct?.toFixed(3)}</TableCell>
												<TableCell
													className={
														positivePD ? "text-green-500" : "text-primary"
													}
												>
													{positivePD ? "+" : ""}
													{team.pointDifference || 0}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</div>
				))}
			</div>
		</div>
	);
}
