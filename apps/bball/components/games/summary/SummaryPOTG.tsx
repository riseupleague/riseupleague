"use client";

import Link from "next/link";

const SummaryPOTG = ({ playerOfTheGame, game }): JSX.Element => {
	// get game stats
	const potgStats = playerOfTheGame.allStats.filter(
		(playerGame) => playerGame.game === game._id
	)[0];

	// trim ig if '@' sign included
	let playerIg = playerOfTheGame?.instagram;
	if (playerIg && playerIg[0] === "@") playerIg = playerIg.substring(1);

	return (
		<div className="mx-auto my-8 flex max-w-3xl flex-col rounded border border-neutral-600 bg-neutral-800 p-4 md:p-8">
			<h3 className="mb-8 text-center">Player of the Game:</h3>
			<div className="flex flex-col gap-8 md:flex-row md:gap-0">
				{/* name / team / ig / # / picture  */}
				<div className="font-barlow flex w-full flex-col justify-center gap-1 md:w-1/2">
					<p className="text-base text-neutral-500">
						<Link
							href={`/teams/team/${playerOfTheGame._id}`}
							className="uppercase transition-all hover:text-neutral-300"
						>
							{playerOfTheGame.team.teamName}
						</Link>{" "}
						| #{playerOfTheGame.jerseyNumber}
					</p>
					<Link
						href={`/players/${playerOfTheGame._id}`}
						className="w-fit text-3xl uppercase transition-all hover:text-neutral-400"
					>
						{playerOfTheGame.playerName}
					</Link>
					{playerIg && (
						<Link
							href={`https://www.instagram.com/${playerIg}`}
							target="_blank"
							className="w-fit text-xl lowercase text-neutral-500 transition-all hover:text-neutral-400"
						>
							<span className="uppercase">IG: </span>
							{playerIg}
						</Link>
					)}
				</div>

				{/* pts reb ast stl blk */}
				<div className="grid w-full grid-cols-5 gap-2 text-center uppercase md:w-1/2">
					<p>PTS</p>
					<p>REB</p>
					<p>AST</p>
					<p>BLK</p>
					<p>STL</p>
					<p className="text-3xl">{potgStats.points}</p>
					<p className="text-3xl">{potgStats.rebounds}</p>
					<p className="text-3xl">{potgStats.assists}</p>
					<p className="text-3xl">{potgStats.blocks}</p>
					<p className="text-3xl">{potgStats.steals}</p>
				</div>
			</div>
		</div>
	);
};
export default SummaryPOTG;
