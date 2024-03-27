"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import PlayersTable from "./PlayersTable";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";

const PlayerManagement = ({ seasons, currentSeason, players }) => {
	const [season, setSeason] = useState(currentSeason);
	// const [division, setDivision] = useState(divisions[0] || null);

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

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();

		// empty search
		if (searchValue === "") return setFilteredPlayers(players);

		const playersFiltered = players.filter((player) =>
			player.playerName.toLowerCase().includes(searchValue)
		);

		setFilteredPlayers(playersFiltered);
	};

	return (
		<section>
			<div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
				<FilterBySeason
					currentSeason={season}
					seasons={seasons}
					handleSeasonChange={handleSeasonChange}
				/>
				<Input
					type="search"
					onChange={handleSearch}
					placeholder="Search Player"
					className="font-barlow my-8 rounded border border-neutral-600 bg-neutral-700 px-4 py-3 text-lg sm:w-1/4"
				/>
			</div>

			<div className="my-8">
				<PlayersTable players={filteredPlayers} />
			</div>
		</section>
	);
};

export default PlayerManagement;
