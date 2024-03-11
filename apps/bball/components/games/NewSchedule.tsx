"use client";

import { useState } from "react";
import FilterByDate from "../filters/FilterByDate";
import FilterByDivision from "../filters/FilterByDivision";
import NewScheduleCard from "./NewScheduleCard";
import { convertToEST } from "@/utils/convertToEST";
import { format } from "date-fns";
import { Separator } from "@ui/components/separator";

const NewSchedule = ({ gamesByDate, divisionsWithStats }): JSX.Element => {
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
			<div className="my-8">
				{gamesByDate.map((date, index) => {
					return (
						<div key={index}>
							<h3 className="text-2xl">{date.date}</h3>
							<Separator className="border-b border-neutral-600" />

							<div className="grid grid-cols-1 gap-3 py-7">
								{date.games?.map((game, index) => (
									<NewScheduleCard game={game} key={index} />
								))}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};

export default NewSchedule;
