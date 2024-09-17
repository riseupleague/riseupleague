import PlayoffMatchup from "./PlayoffMatchup";

const PlayoffDivisionBracket = ({ division }) => {
	if (division.teams.length !== 8)
		return <UnavailableBracket division={division} />;

	const gridSpots = [0, 4, 6, 7, 8, 10, 14];
	const sortedTeams = division.teams
		.sort((a, b) => (a.pointDifference > b.pointDifference ? 1 : -1))
		.sort((a, b) => (a.wpct?.toFixed(3) < b.wpct?.toFixed(3) ? 1 : -1));
	const teamsWithSeed = sortedTeams.map((team, index) => {
		return { ...team, seed: index + 1 };
	});

	const findMatchup = (index, teams) => {
		if (index === 0) return [teams[0], teams[7]];
		else if (index === 4) return [teams[1], teams[6]];
		else if (index === 14) return [teams[2], teams[5]];
		else if (index === 10) return [teams[3], teams[4]];
		else return teams;
	};

	return (
		<div className="font-barlow overflow-x-scroll">
			<h3 className="font-barlow my-4 text-2xl font-semibold uppercase text-neutral-100">
				{division.divisionName}
			</h3>

			<div className="mb-4 grid auto-cols-min grid-cols-5 [&>div>p]:text-sm [&>div]:text-center">
				<div>
					<h5>Quarter Finals</h5>
					<p>Best of 1</p>
				</div>
				<div>
					<h5>Semi Finals</h5>
					<p>Best of 1</p>
				</div>
				<div>
					<h5>🏆 Finals 🏆</h5>
					<p>Best of 1</p>
				</div>
				<div>
					<h5>Semi Finals</h5>
					<p>Best of 1</p>
				</div>
				<div>
					<h5>Quarter Finals</h5>
					<p>Best of 1</p>
				</div>
			</div>

			<div className="grid auto-cols-max grid-cols-5 grid-rows-3 gap-4 overflow-scroll">
				{Array(15)
					.fill("")
					.map((_, index) => {
						const matchupTeams = findMatchup(index, teamsWithSeed);

						return gridSpots.includes(index) ? (
							<PlayoffMatchup key={index} index={index} teams={matchupTeams} />
						) : (
							<div></div>
						);
					})}
			</div>
		</div>
	);
};

const UnavailableBracket = ({ division }) => (
	<div>
		<h3 className="text-primary font-barlow my-4 text-2xl font-semibold uppercase">
			No playoff bracket available for {division.divisionName} ({division.city})
			at this time.
		</h3>
	</div>
);

export default PlayoffDivisionBracket;
