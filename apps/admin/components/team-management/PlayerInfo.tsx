const PlayerInfo = ({ player }): JSX.Element => {
	return (
		<div className="mb-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-1">
			<h5>Player Name: {player?.playerName}</h5>
			<h5>Jersey Number: {player?.jerseyNumber}</h5>
			<h5>Jersey Name: {player?.jerseyName}</h5>
			<h5>Jersey Size: {player?.jerseySize}</h5>
			<h5>Instagram Handle: {player?.instagram}</h5>
			<h5>
				Team Captain:&nbsp;
				<span
					className={`${player?.teamCaptain ? "text-green-400" : "text-primary"}`}
				>
					{player?.teamCaptain ? "TRUE" : "FALSE"}
				</span>
			</h5>
		</div>
	);
};

export default PlayerInfo;
