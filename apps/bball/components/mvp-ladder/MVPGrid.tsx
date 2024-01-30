"use client";

import { useState } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import { useRouter, useSearchParams } from "next/navigation";
import MVPCard from "./MVPCard";

export default function MVPGrid({ allPlayers, divisions }) {
	const [players, setPlayers] = useState(allPlayers);

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
		router.push(`/mvp-ladder?divisionId=${event}`);

		if (selectedDivisionId !== "default") {
			const filteredPlayers = allPlayers.filter(
				(player) => player?.division?._id === selectedDivisionId
			);
			setPlayers(filteredPlayers);
		} else {
			setPlayers(allPlayers);
		}
	};

	return (
		<div className="relative">
			<div className="text-xl">
				<p className="my-4">
					At Rise Up League, we currently only track PTS, REB, AST, STL, and BLK
					stats. We currently are not counting efficiency stats like FGM, 3PA,
					FTA, etc.
				</p>

				<p className="my-4">
					The way that we calculate the MVP using these stats is as follows:
				</p>

				<ul className="flex list-inside list-disc flex-col gap-1">
					<li>
						Player <span className="text-primary">must</span> have played in at
						least 5 regular season games.
					</li>
					<li>Sum of the following multiplied by Team Win Percentage:</li>
					<ul className="ml-4 flex list-inside list-disc flex-col gap-1">
						<li>PPG * 3.0</li>
						<li>RPG * 2.0</li>
						<li>APG * 2.0</li>
						<li>SPG * 2.0</li>
						<li>BPG * 2.0</li>
					</ul>
				</ul>

				<p className="my-4">
					Example: <br />A player averaging 22.4ppg, 10.2rpg, 3.4apg, 0.8bpg,
					0.2spg - and his team has a 6-1 record.
				</p>

				<p className="my-4">Calculation:</p>
				<ul className="ml-4 flex list-inside list-disc flex-col gap-1 sm:w-1/2">
					<li>22.4 PPG * 3.0 = 67.2</li>
					<li>10.2 RPG * 2.0 = 20.4</li>
					<li>3.4 APG * 2.0 = 6.8</li>
					<li>0.8 SPG * 2.0 = 1.6</li>
					<li>0.2 BPG * 2.0 = 0.2</li>
					<hr />
					<li>96.2 * Team Win Percentage (0.857%) = 82.4434</li>
					<li className="text-primary">Final MVP Score: 82.4434</li>
				</ul>
			</div>

			<div className="items-left my-8 flex flex-col justify-between gap-4">
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
					placeholder={filterPlaceholder}
				/>
			</div>

			<div className="relative grid grid-cols-1 overflow-auto">
				<article className="font-barlow flex rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 uppercase ">
					<div className="flex w-1/12 items-center text-sm sm:text-lg">#</div>
					<div className="flex w-2/6 items-center text-sm sm:text-lg">Name</div>
					<div className="flex w-2/6 items-center text-sm sm:text-lg">Team</div>
					<div className="flex w-fit items-center text-sm sm:w-1/12 sm:text-lg">
						PPG
					</div>
					<div className="flex w-fit items-center text-sm sm:w-1/12 sm:text-lg">
						RPG
					</div>
					<div className="flex w-fit items-center text-sm sm:w-1/12 sm:text-lg">
						APG
					</div>
					<div className="flex w-fit items-center text-sm sm:w-1/12 sm:text-lg">
						SPG
					</div>
					<div className="flex w-fit items-center text-sm sm:w-1/12 sm:text-lg">
						BPG
					</div>
					<div className="text-primary flex w-fit items-center text-sm font-bold sm:w-1/12 sm:text-lg">
						MVP Score
					</div>
				</article>
				{players
					.map((player, index) => (
						<MVPCard player={player} key={index} rank={index + 1} />
					))
					.slice(0, 10)}
			</div>
		</div>
	);
}

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};
