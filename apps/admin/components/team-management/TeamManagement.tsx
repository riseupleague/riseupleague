"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import TeamsTable from "./TeamsTable";

const TeamManagement = ({ seasons, currentSeason, divisions }) => {
	const [season, setSeason] = useState(currentSeason);
	const [division, setDivision] = useState(divisions[0]);

	const handleSeasonChange = (e) => {
		const season = seasons.find((season) => season._id === e);
		setSeason(season);

		redirect(`/team-management/season/${season._id}`);
	};

	const handleDivisionChange = (e) => {
		const division = divisions.find((division) => division._id === e);
		setDivision(division);
	};

	return (
		<section>
			<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
				<FilterBySeason
					currentSeason={season}
					seasons={seasons}
					handleSeasonChange={handleSeasonChange}
				/>

				<FilterByDivision
					currentDivision={division}
					divisions={divisions}
					handleDivisionChange={handleDivisionChange}
				/>
			</div>

			<div className="my-8">
				<h2>Teams</h2>
				<TeamsTable teams={division?.teams} />
			</div>
		</section>
	);
};

export default TeamManagement;
