"use client";

import { useState } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import MVPCard from "./MVPCard";

const HomeMVPGrid = ({ allPlayers, divisions }): JSX.Element => {
	const divisionIdParam = divisions[0]._id;
	const numberOfPlayers = 3;

	let filterPlaceholder = divisions[0].divisionName;
	let initialDivisions = divisions.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// if URL param exists, set initial division ID
	if (divisionIdParam) {
		initialDivisions = filterDivisions(divisions, divisionIdParam);
		filterPlaceholder = initialDivisions[0].divisionName;
	}

	// set initial division
	const [selectedDivision, setSelectedDivision] = useState(
		initialDivisions[0]._id
	);

	// calculate mvp score and sort
	const allPlayersWithScore = allPlayers
		.map((player) => {
			return {
				...player,
				mvpScore: calculateMvpScore(
					player.averageStats,
					player.team?.wins,
					player.team?.losses
				),
			};
		})
		.sort((a, b) => (a.mvpScore < b.mvpScore ? 1 : -1))
		.filter((player) => player.mvpScore > 0);

	// set initial player list
	const [players, setPlayers] = useState(
		allPlayersWithScore.filter(
			(player) =>
				player.division._id === selectedDivision &&
				player.playerName !== "Admin Test"
		)
	);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		if (selectedDivisionId !== "default") {
			const filteredPlayers = allPlayersWithScore
				.filter((player) => player?.division?._id === selectedDivisionId)
				.sort((a, b) => (a.mvpScore < b.mvpScore ? 1 : -1));

			setPlayers(filteredPlayers);
		} else {
			setPlayers(allPlayers);
		}
	};

	return (
		<div className="relative">
			<div className="items-left my-8 flex flex-col justify-between gap-4">
				<FilterByDivision
					handleDivisionChange={handleDivisionChange}
					divisions={divisions}
					placeholder={filterPlaceholder}
				/>
			</div>

			<div className="relative my-8 grid grid-cols-1 overflow-auto">
				{players.length > 0 ? (
					<>
						<article className="font-barlow flex justify-between rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 uppercase sm:pr-6">
							<div className="flex w-2 items-center text-sm sm:text-lg">#</div>
							<div className="flex w-1/6 items-center text-sm sm:text-lg">
								Name
							</div>
							<div className="flex w-1/6 items-center text-sm sm:text-lg">
								Team
							</div>
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								PPG
							</div>
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								RPG
							</div>
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								APG
							</div>
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								SPG
							</div>
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								BPG
							</div>
							<div className="text-primary flex w-fit items-center text-sm font-bold sm:w-6 sm:text-lg">
								Score
							</div>
						</article>
						{players
							.map((player, index) => (
								<MVPCard
									player={player}
									key={index}
									rank={index + 1}
									mvpScore={player.mvpScore}
								/>
							))
							.slice(0, numberOfPlayers)}
					</>
				) : (
					<div>
						<h3 className="text-primary mx-auto max-w-md text-center">
							Not enough data for this division. <br /> Select another division
							or come back at a later time!
						</h3>
					</div>
				)}
			</div>
		</div>
	);
};

const filterDivisions = (divisions, id) => {
	return divisions.filter((division) => division._id === id);
};

const calculateMvpScore = (avgStats, wins, losses) => {
	let wpct;
	const avgStatsSum =
		avgStats.points * 3 +
		avgStats.rebounds * 2 +
		avgStats.assists * 2 +
		avgStats.steals * 2 +
		avgStats.blocks * 2;

	if (!wins && !losses) wpct = 0;
	else wpct = wins === 0 && losses === 0 ? 0 : wins / (wins + losses);

	return avgStatsSum * wpct;
};

export default HomeMVPGrid;
