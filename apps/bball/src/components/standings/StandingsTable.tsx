"use client";

import FilterByDivision from "@/src/components/filters/FilterByDivision";
import { useState } from "react";
import Link from "next/link";

export default function StandingsTable({ divisions }) {
	const [divisionsWithTeams, setDivisionsWithTeams] = useState(divisions);
	const [selectedDivision, setSelectedDivision] = useState("All Divisions");

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		if (selectedDivisionId !== "") {
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
				divisions={divisions}
			/>

			<div className="flex flex-col gap-10">
				{divisionsWithTeams.map((division) => (
					<div key={division._id}>
						<h3 className="font-barlow my-4 text-2xl font-semibold uppercase text-neutral-100">
							{division.divisionName}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
}
