"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import PlayersTable from "./PlayersTable";
import { Label } from "@ui/components/label";

const PlayerManagement = ({ seasons, currentSeason, players }) => {
	const [season, setSeason] = useState(currentSeason);
	// const [division, setDivision] = useState(divisions[0] || null);

	// const uniquePlayers = Object.values(
	// 	players.reduce((unique, player) => {
	// 		if (!unique[player.user]) {
	// 			unique[player.user] = player;
	// 		}
	// 		return unique;
	// 	}, {})
	// );
	const [filteredPlayers, setFilteredPlayers] = useState(players);
	const handleSeasonChange = (e) => {
		const season = seasons.find((season) => season._id === e);
		setSeason(season);

		redirect(`/player-management/season/${season._id}`);
	};

	// const handleDivisionChange = (e) => {
	// 	const division = divisions.find((division) => division._id === e);
	// 	setDivision(division);
	// };

	return (
		<section>
			<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
				<FilterBySeason
					currentSeason={season}
					seasons={seasons}
					handleSeasonChange={handleSeasonChange}
				/>
				{/* 
				<FilterByDivision
					currentDivision={division}
					divisions={divisions}
					handleDivisionChange={handleDivisionChange}
				/> */}
			</div>

			<div className="my-8">
				<h2 className="my-4">{currentSeason?.seasonName} Players</h2>
				<PlayersTable players={filteredPlayers} />
			</div>
		</section>
	);
};

export default PlayerManagement;
