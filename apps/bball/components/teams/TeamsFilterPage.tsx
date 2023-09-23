"use client";

import { useState, useEffect } from "react";
import FilterByDivision from "../filters/FilterByDivision";

export default function TeamsFilterPage({ divisions }) {
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

			{divisionsWithTeams.map((division) => (
				<div key={division._id}>
					<h3 className="font-semibold">{division.divisionName}</h3>
					<ul>
						{division.teams.map((team) => (
							<li key={team._id}>{team.teamName}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
