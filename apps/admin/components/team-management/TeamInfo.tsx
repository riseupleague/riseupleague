const TeamInfo = ({ team }): JSX.Element => {
	const teamCaptain = team.players.find(
		(player) => player.teamCaptain === true
	);
	return (
		<div className="mb-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-1">
			<h5>Team Name: {team?.teamName}</h5>
			<h5>
				Team Captain:{" "}
				{teamCaptain ? (
					teamCaptain.playerName
				) : (
					<span className="text-primary">None</span>
				)}
			</h5>
			<h5>Team Name Short: {team?.teamNameShort}</h5>
			<h5 className="normal-case">Team Code: {team?.teamCode}</h5>
			<h5>Wins: {team?.wins}</h5>
			<h5>Losses: {team?.losses}</h5>
			<h5>Point Difference: {team?.pointDifference}</h5>
			<h5>Payment: {team?.paid ? "full" : "individual"}</h5>
		</div>
	);
};

export default TeamInfo;
