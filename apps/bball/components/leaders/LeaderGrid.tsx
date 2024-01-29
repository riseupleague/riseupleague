"use client";

import { Input } from "@ui/components/input";
import { useState } from "react";
import LeaderCard from "./LeaderCard";
import FilterByDivision from "../filters/FilterByDivision";
import { useRouter, useSearchParams } from "next/navigation";
import FilterByStat from "../filters/FilterByStat";

export default function LeaderGrid({ allPlayers, divisions }) {
	const [players, setPlayers] = useState(allPlayers);
	const [currentStat, setCurrentStat] = useState("Points");

	let initialDivisions = divisions;
	let filterPlaceholder = "All Divisions";

	const router = useRouter();
	const searchParams = useSearchParams();
	const params = searchParams.get("divisionId");

	// if URL has a 'divisionId' param, filter divisions automatically
	if (params && params !== "default") {
		initialDivisions = filterDivisions(divisions, params);
		filterPlaceholder = divisions[0].divisionName;
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
		router.push(`/leaders?divisionId=${event}?stat=${currentStat}`);

		if (selectedDivisionId !== "default") {
			const filteredPlayers = allPlayers.filter(
				(player) => player?.division?._id === selectedDivisionId
			);
			setPlayers(filteredPlayers);
		} else {
			setPlayers(allPlayers);
		}
	};

	// Handle the select change event
	const handleStatChange = (selectedStat) => {
		// update URL query when division changes
		router.push(`/leaders?divisionId=${selectedDivision}?stat=${selectedStat}`);

		const rankedPlayers = players.sort(
			(a, b) =>
				a.averageStats[selectedStat].toFixed(1) <
				b.averageStats[selectedStat].toFixed(1)
		);

		setPlayers(rankedPlayers);
	};

	return (
		<>
			<div className="items-left my-8 flex flex-col justify-between gap-4">
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
					placeholder={filterPlaceholder}
				/>
				<FilterByStat handleStatChange={handleStatChange} />
			</div>

			<div className="grid grid-cols-1">
				<article className="font-barlow flex rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 uppercase ">
					<div className="flex w-1/12 items-center text-sm sm:text-lg">
						Rank #
					</div>
					<div className="flex w-2/6 items-center text-sm sm:text-lg">Name</div>
					<div className="flex w-2/6 items-center text-sm sm:text-lg">Team</div>
					<div className="flex w-1/12 items-center text-sm sm:text-lg">PPG</div>
					<div className="flex w-1/12 items-center text-sm sm:text-lg">RPG</div>
					<div className="flex w-1/12 items-center text-sm sm:text-lg">APG</div>
					<div className="flex w-1/12 items-center text-sm sm:text-lg">SPG</div>
					<div className="flex w-1/12 items-center text-sm sm:text-lg">BPG</div>
				</article>
				{players
					.map((player, index) => (
						<LeaderCard player={player} key={index} rank={index + 1} />
					))
					.slice(0, 10)}
			</div>
		</>
	);
}

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};
