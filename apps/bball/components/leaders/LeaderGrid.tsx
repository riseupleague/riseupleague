"use client";

import { useState } from "react";
import LeaderCard from "./LeaderCard";
import FilterByDivision from "../filters/FilterByDivision";
import { useRouter, useSearchParams } from "next/navigation";
import FilterByStat from "../filters/FilterByStat";

export default function LeaderGrid({ allPlayers, divisions }) {
	const [players, setPlayers] = useState(
		allPlayers.sort((a, b) =>
			a.averageStats?.points < b.averageStats?.points ? 1 : -1
		)
	);
	const [currentStat, setCurrentStat] = useState("points");

	let initialDivisions = divisions;
	let filterPlaceholder = "All Divisions";

	const router = useRouter();
	const searchParams = useSearchParams();
	const params = searchParams.get("divisionId");

	// if URL has a 'divisionId' param, filter divisions automatically
	if (params && !params.includes("default")) {
		console.log(params);
		initialDivisions = filterDivisions(divisions, params);
		filterPlaceholder = divisions[0].divisionName;
	}

	const divisionsNameAndId = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

	let initialDivId = "default";
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
			setPlayers(
				filteredPlayers.sort((a, b) =>
					a.averageStats[currentStat] < b.averageStats[currentStat] ? 1 : -1
				)
			);
		} else {
			setPlayers(
				allPlayers.sort((a, b) =>
					a.averageStats[currentStat] < b.averageStats[currentStat] ? 1 : -1
				)
			);
		}
	};

	// Handle the select change event
	const handleStatChange = (selectedStat) => {
		// update URL query when division changes
		router.push(`/leaders?divisionId=${selectedDivision}?stat=${selectedStat}`);

		const rankedPlayers = players.sort((a, b) =>
			a.averageStats[selectedStat] < b.averageStats[selectedStat] ? 1 : -1
		);

		setPlayers(rankedPlayers);
		setCurrentStat(selectedStat);
	};

	return (
		<div className="relative">
			<div className="items-left my-8 flex flex-col justify-between gap-4">
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
					placeholder={filterPlaceholder}
				/>
				<FilterByStat handleStatChange={handleStatChange} />
			</div>

			<div className="relative grid grid-cols-1 overflow-auto">
				<article className="font-barlow flex justify-between rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 uppercase sm:pr-6">
					<div className="flex w-2 items-center text-sm sm:text-lg">#</div>
					<div className="flex w-1/6 items-center text-sm sm:text-lg">Name</div>
					<div className="flex w-1/6 items-center text-sm sm:text-lg">Team</div>
					<div
						className={`${currentStat === "points" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-6 sm:text-lg`}
					>
						PPG
					</div>
					<div
						className={`${currentStat === "rebounds" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-6 sm:text-lg`}
					>
						RPG
					</div>
					<div
						className={`${currentStat === "assists" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-6 sm:text-lg`}
					>
						APG
					</div>
					<div
						className={`${currentStat === "steals" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-6 sm:text-lg`}
					>
						SPG
					</div>
					<div
						className={`${currentStat === "blocks" && "text-primary font-bold"} flex w-fit items-center text-sm sm:w-6 sm:text-lg`}
					>
						BPG
					</div>
				</article>
				{players
					.map((player, index) => (
						<LeaderCard
							player={player}
							key={index}
							rank={index + 1}
							currentStat={currentStat}
						/>
					))
					.slice(0, 10)}
			</div>
		</div>
	);
}

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};
