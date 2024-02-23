"use client";

import { useState } from "react";
import FilterByDate from "../filters/FilterByDate";
import FilterByDivision from "../filters/FilterByDivision";

const NewSchedule = ({ gamesByDate, divisionsWithStats }): JSX.Element => {
	console.log(gamesByDate);

	let initialDivisions = divisionsWithStats;
	let filterPlaceholder = "All Divisions";
	const [divisionsWithTeams, setDivisionsWithTeams] =
		useState(initialDivisions);

	const divisionsNameAndId = divisionsWithStats.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

	let initialDivId = divisionsNameAndId[0]._id;

	const [selectedDivision, setSelectedDivision] = useState(initialDivId);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		if (selectedDivisionId !== "default") {
			// filter the divisions based on the selected division name
			const filteredDivisions = filterDivisions(
				divisionsWithStats,
				selectedDivisionId
			);

			setSelectedDivision(selectedDivisionId);
			setDivisionsWithTeams(filteredDivisions);
		} else {
			setDivisionsWithTeams(divisionsWithStats);
		}
	};

	return (
		<section>
			<div className="flex flex-col gap-4 md:flex-row">
				<FilterByDate />
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
					placeholder={filterPlaceholder}
				/>
			</div>

			{/* render schedule games */}
			<div className="my-8">games</div>
		</section>
	);
};

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};

export default NewSchedule;
