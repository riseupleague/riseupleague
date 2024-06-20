"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import TeamsTable from "./TeamsTable";
import CreateTeam from "./CreateTeam";
import { Label } from "@ui/components/label";

const TeamManagement = ({ seasons, currentSeason, divisions }) => {
	const [season, setSeason] = useState(currentSeason);
	const [division, setDivision] = useState(divisions[0] || null);

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
				<div className="space-y-2">
					<Label>Filter By Season:</Label>
					<FilterBySeason
						currentSeason={season}
						seasons={seasons}
						handleSeasonChange={handleSeasonChange}
					/>
				</div>

				<div className="space-y-2">
					<Label>Filter By Division:</Label>
					<FilterByDivision
						currentDivision={division}
						divisions={divisions}
						handleDivisionChange={handleDivisionChange}
					/>
				</div>
			</div>

			<div className="my-8">
				<h2 className="my-4">{division?.divisionName} Teams</h2>
				<TeamsTable teams={division?.teams} />

				<div className="my-8">
					<CreateTeam divisionId={division?._id} seasonId={season?._id} />
				</div>
			</div>
		</section>
	);
};

export default TeamManagement;
