"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterByDivision from "@/components/filters/FilterByDivision";
import PlayoffDivisionBracket from "./PlayoffDivisionBracket";

const PlayoffPicture = ({ divisions }): JSX.Element => {
	let initialDivisions = divisions;
	let filterPlaceholder = "All Divisions";

	const router = useRouter();
	const searchParams = useSearchParams();
	const params = searchParams.get("divisionId");
	const gridSpots = [0, 5, 7, 10, 12, 17, 20, 21, 24, 29, 31, 34, 36, 41];

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
		router.push(`/standings/playoffs?divisionId=${event}`);

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
						<PlayoffDivisionBracket division={division} />
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
