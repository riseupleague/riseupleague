"use client";

import { useState, useEffect } from "react";
import FilterByDivision from "../filters/FilterByDivision";

export default function TeamsFilterPage({ divisions }) {
	const [divisionsWithTeams, setDivisionsWithTeams] = useState(divisions);
	console.log(divisionsWithTeams);
	return (
		<div>
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
