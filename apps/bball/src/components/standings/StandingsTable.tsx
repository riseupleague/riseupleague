"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import FilterByDivision from "@/src/components/filters/FilterByDivision";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StandingsTable({ divisions }) {
	const [divisionsWithTeams, setDivisionsWithTeams] = useState(divisions);
	const [selectedDivision, setSelectedDivision] = useState(""); // Initialize with an empty string

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionName = event.target.value;
		if (selectedDivisionName !== "") {
			// Filter the divisions based on the selected division name
			const filteredDivisions = divisions.filter(
				(division) => division.divisionName === selectedDivisionName
			);

			setSelectedDivision(selectedDivisionName);
			setDivisionsWithTeams(filteredDivisions);
		} else {
			setDivisionsWithTeams(divisions);
		}
	};
	return (
		<div>
			<select
				value={selectedDivision}
				onChange={handleDivisionChange}
				className="w-1/4 rounded-md border px-2 py-1 text-black"
			>
				<option value="">All Divisions</option>
				{divisions.map((division) => (
					<option key={division._id} value={division.divisionName}>
						{division.divisionName}
					</option>
				))}
			</select>

			<div className="flex flex-col gap-10">
				{divisionsWithTeams.map((division) => (
					<div key={division._id}>
						<h3 className="mx-auto mb-4 hidden w-11/12 text-2xl font-bold uppercase text-white sm:block sm:w-auto">
							{division.divisionName}
						</h3>

						<Table>
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
								{division.teams?.map((team, index) => {
									return (
										<TableRow key={index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell
												className={`w-1/2 text-left sm:w-auto ${
													team.teamBanner && "flex items-center gap-1"
												}`}
											>
												{team.teamBanner && (
													<img
														src={team.teamBanner}
														className="max-h-8 w-auto md:hidden"
													/>
												)}
												<Link href={`/teams/${team._id}`}>
													<p className="hover:underline">{team.teamName}</p>
												</Link>
											</TableCell>
											<TableCell>{team.wins || 0}</TableCell>
											<TableCell>{team.losses || 0}</TableCell>
											<TableCell>{team.gp}</TableCell>
											<TableCell>{team.wpct.toFixed(3)}</TableCell>
											<TableCell
												className={
													team.pointDifference > 0
														? "text-green-500"
														: "text-red-500"
												}
											>
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
