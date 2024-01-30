"use client";

import { useState } from "react";
import LeaderCard from "./LeaderCard";
import FilterByDivision from "../filters/FilterByDivision";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterByStat from "../filters/FilterByStat";

export default function LeaderGrid({ allPlayers, divisions }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	let queryDivisionId = searchParams.get("divisionId");
	let queryStat = searchParams.get("stat");

	const initialDivisions = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	initialDivisions.unshift({ divisionName: "All Divisions", _id: "default" });

	const [currentStat, setCurrentStat] = useState(queryStat || "points");
	const [selectedDivision, setSelectedDivision] = useState(
		queryDivisionId || "default"
	);

	const [players, setPlayers] = useState(
		allPlayers.sort((a, b) =>
			a.averageStats[currentStat] < b.averageStats[currentStat] ? 1 : -1
		)
	);

	let divisionFilterPlaceholder = queryDivisionId
		? initialDivisions[0].divisionName
		: "All Divisions";

	let statFilterPlaceholder = queryStat ? queryStat : "Points";

	// update URL query when division changes
	router.push(
		`${pathname}?divisionId=${selectedDivision}&stat=${currentStat}`,
		{
			scroll: false,
		}
	);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		// update URL query when division changes
		router.push(`${pathname}?divisionId=${event}&stat=${currentStat}`, {
			scroll: false,
		});

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
		let currentPlayers = allPlayers;

		// update URL query when division changes
		router.push(
			`${pathname}?divisionId=${selectedDivision}&stat=${selectedStat}`,
			{
				scroll: false,
			}
		);

		if (searchParams.get("divisionId") !== "default") {
			currentPlayers = allPlayers.filter(
				(player) => player.division._id === searchParams.get("divisionId")
			);
		}

		const rankedPlayers = currentPlayers.sort((a, b) =>
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
					divisions={initialDivisions}
					placeholder={divisionFilterPlaceholder}
				/>
				<FilterByStat
					handleStatChange={handleStatChange}
					filterPlaceholder={statFilterPlaceholder}
				/>
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
