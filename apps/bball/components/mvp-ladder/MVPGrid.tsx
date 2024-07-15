"use client";

import { redirect, useRouter } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import MVPCard from "./MVPCard";
import FilterBySeason from "../filters/FilterBySeason";

const MVPGrid = ({
	allPlayersWithScore,
	selectedDivision,
	divisions,
	seasons,
	season,
}): JSX.Element => {
	const router = useRouter();
	const filterPlaceholder = selectedDivision.divisionName;

	const handleSeasonChange = (event) => {
		const newSelectedSeason = seasons.find((season) => season._id === event);
		redirect(
			`/leaders/mvp-ladder/${newSelectedSeason._id}/${newSelectedSeason.divisions[0]}`
		);
	};
	// Handle the select change event
	const handleDivisionChange = async (selectedDivisionId) => {
		router.push(`/leaders/mvp-ladder/${season._id}/${selectedDivisionId}`);
	};

	return (
		<div className="relative">
			<div className="items-left my-8 flex flex-col gap-4 md:flex-row">
				<FilterBySeason
					seasons={seasons}
					handleSeasonChange={handleSeasonChange}
					currentSeason={season}
				/>
				<FilterByDivision
					handleDivisionChange={handleDivisionChange}
					divisions={divisions}
					placeholder={filterPlaceholder}
				/>
			</div>

			<div className="relative my-8 grid grid-cols-1 overflow-auto">
				{allPlayersWithScore.length > 0 ? (
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
							<div className="flex w-fit items-center text-sm sm:w-6 sm:text-lg">
								GP
							</div>
							<div className="text-primary flex w-fit items-center text-sm font-semibold sm:w-6 sm:text-lg">
								Score
							</div>
						</article>
						{allPlayersWithScore
							.map((player, index) => (
								<MVPCard
									player={player}
									key={index}
									rank={index + 1}
									mvpScore={player.mvpScore}
								/>
							))
							.slice(0, 10)}
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

			<div className="text-sm sm:text-xl">
				<p className="my-4">
					At Rise Up League, we currently only track PTS, REB, AST, STL, and BLK
					stats. We currently are not counting efficiency stats like FGM/FGA,
					3PM/3PA, FTA/FTM, etc.
				</p>

				<p className="my-4">
					We calculate <span className="text-primary">MVP Score</span> with the
					following:
				</p>

				<ul className="flex list-inside list-disc flex-col gap-1">
					<li>
						Player <span className="text-primary">must</span> have played in at
						least 5 regular season games.
					</li>
					<li>
						<span className="text-primary">Sum</span> of the following:
					</li>
					<ul className="ml-4 flex list-inside list-disc flex-col gap-1">
						<li>PPG * 3.0</li>
						<li>RPG * 2.0</li>
						<li>APG * 2.0</li>
						<li>SPG * 2.0</li>
						<li>BPG * 2.0</li>
						<li>(Win Percentage * 3.0)</li>
					</ul>
				</ul>

				<p className="my-4">
					Example: <br />A player averaging 22.4ppg, 10.2rpg, 3.4apg, 0.8bpg,
					0.2spg. <br /> His team has a 6-1 record.
				</p>

				<p className="my-4">Calculation:</p>
				<ul className="ml-4 flex list-inside list-disc flex-col gap-1 sm:w-1/2">
					<li>22.4 PPG * 3.0 = 67.2</li>
					<li>10.2 RPG * 2.0 = 20.4</li>
					<li>3.4 APG * 2.0 = 6.8</li>
					<li>0.8 SPG * 2.0 = 1.6</li>
					<li>0.2 BPG * 2.0 = 0.4</li>
					<li>0.857 Win Percent * 3.0 = 2.571</li>
					<hr />
					<li className="text-primary">Final MVP Score: 98.971</li>
				</ul>
			</div>
		</div>
	);
};

export default MVPGrid;
