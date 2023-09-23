"use client";

import { useState, useEffect } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import TeamsCard from "./TeamsCard";

export default function TeamsFilterPage({ divisions }) {
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

			{divisionsWithTeams.map((division) => (
				<div key={division._id}>
					<h3 className="font-barlow my-4 gap-1 text-lg font-semibold uppercase">
						{division.divisionName}
					</h3>
					<div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{division.teams
							.sort((a, b) => (a.teamName > b.teamName ? 1 : -1))
							.map((team) => (
								<TeamsCard key={team._id} team={team} />
							))}
					</div>
				</div>
			))}
		</div>
	);
}
