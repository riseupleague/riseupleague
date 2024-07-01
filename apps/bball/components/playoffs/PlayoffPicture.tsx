"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

const PlayoffPicture = ({ divisions }): JSX.Element => {
	let initialDivisions = divisions;
	let filterPlaceholder = "All Divisions";

	const router = useRouter();
	const searchParams = useSearchParams();
	const params = searchParams.get("divisionId");

	// if URL has a 'divisionId' param, filter divisions automatically
	if (params && params !== "default") {
		initialDivisions = filterDivisions(divisions, params);
		filterPlaceholder = initialDivisions[0].divisionName;
	}

	const [divisionsWithTeams, setDivisionsWithTeams] =
		useState(initialDivisions);

	const divisionsNameAndId = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

	let initialDivId = divisionsNameAndId[0]._id;
	if (params) initialDivId = params;

	const [selectedDivision, setSelectedDivision] = useState(initialDivId);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		// update URL query when division changes
		router.push(`/standings?divisionId=${event}`);

		if (selectedDivisionId !== "default") {
			// filter the divisions based on the selected division name
			const filteredDivisions = filterDivisions(divisions, selectedDivisionId);

			setSelectedDivision(selectedDivisionId);
			setDivisionsWithTeams(filteredDivisions);
		} else {
			setDivisionsWithTeams(divisions);
		}
	};

	return (
		<div>
			<FilterByDivision
				handleDivisionChange={handleDivisionChange}
				divisions={divisionsNameAndId}
				placeholder={filterPlaceholder}
			/>

			<div className="mt-5 flex flex-col gap-10">
				{divisionsWithTeams.map((division) => (
					<div key={division._id}>
						<h3 className="font-barlow my-4 text-2xl font-semibold uppercase text-neutral-100">
							{division.divisionName}
						</h3>

						<Table className="font-barlow uppercase">
							<TableHeader>
								<TableRow className="border-b-neutral-500">
									<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										#
									</TableHead>
									<TableHead className="w-1/2 p-1 text-left text-sm sm:w-auto sm:text-lg">
										Team
									</TableHead>
									<TableHead className="w-1/12 p-1 text-sm sm:text-lg">
										W
									</TableHead>
									<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										L
									</TableHead>
									<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										GP
									</TableHead>
									<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										W%
									</TableHead>
									<TableHead className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
										PD
									</TableHead>
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
											<TableRow
												key={index}
												className="border-b-neutral-500 text-sm sm:text-lg"
											>
												<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
													{index + 1}
												</TableCell>
												<TableCell className="w-1/2 p-1 text-left sm:w-auto">
													<Link
														href={`/teams/${team._id}`}
														className="flex w-fit hover:underline"
													>
														{team.teamName}
													</Link>
												</TableCell>
												<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
													{team.wins || 0}
												</TableCell>
												<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
													{team.losses || 0}
												</TableCell>
												<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
													{team.gp}
												</TableCell>
												<TableCell className="w-1/12 p-1 text-sm sm:w-auto sm:text-lg">
													{team.wpct?.toFixed(3)}
												</TableCell>
												<TableCell
													className={`w-1/12 p-1 text-sm sm:w-auto sm:text-lg ${
														positivePD ? "text-green-500" : "text-primary"
													}
													`}
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
};

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};

export default PlayoffPicture;
