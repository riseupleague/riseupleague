"use client";

import { useState } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import TeamsCard from "./TeamsCard";

const TeamsFilterPage = ({ divisions }): JSX.Element => {
	const [divisionsWithTeams, setDivisionsWithTeams] = useState(divisions);
	const divisionsNameAndId = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({
		divisionName: "All Divisions",
		_id: "default",
	});
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

			{divisionsWithTeams.map((division) => (
				<div key={division._id}>
					<h3 className="my-6">
						{division.location ? (
							<>
								{division.location}
								{" - "}
							</>
						) : undefined}

						{division.divisionName}
					</h3>
					<div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{division.teams
							.sort((a, b) =>
								a.teamName.toLowerCase() > b.teamName.toLowerCase() ? 1 : -1
							)
							.map((team) => (
								<TeamsCard key={team._id} team={team} />
							))}
					</div>
				</div>
			))}
		</div>
	);
};

export default TeamsFilterPage;
