"use client";

import StatTrackerTabs from "./StatTrackerTabs";

const StatTracker = ({ game }) => {
	return (
		<div>
			<header className="sticky top-0 bg-neutral-600">
				<div className="container mx-auto grid max-w-lg grid-cols-3 items-center px-4 py-6">
					<p className="text-2xl">{game.homeTeam.teamNameShort}</p>
					<p className="text-center text-5xl font-semibold">
						{game.homeTeamScore} - {game.awayTeamScore}
					</p>
					<p className="text-right text-2xl">{game.awayTeam.teamNameShort}</p>
				</div>
			</header>

			<main className="container mx-auto min-h-fit py-4">
				<StatTrackerTabs game={game} />
			</main>
		</div>
	);
};

export default StatTracker;
