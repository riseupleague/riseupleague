import { convertToEST } from "@/utils/convertToEST";
import { isLiveGame } from "@/utils/isLiveGame";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const GameInfo = ({ game }) => {
	const date = convertToEST(new Date(game.date));
	const day = date.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const monthDay = date.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
	const time = format(date, "h:mm a");

	const gameIsLive = isLiveGame(date);
	const gameStatus = game.status ? "finished" : "upcoming";
	return (
		<div>
			<div className="font-oswald my-8 flex w-full items-center justify-center md:gap-16">
				{/* home team */}
				<div className="flex w-full flex-col items-center">
					<h2
						className={`my-4 ${
							game?.homeTeamScore > game?.awayTeamScore && "text-primary"
						}`}
					>
						{game?.homeTeamScore}
					</h2>
					<span className="text-md my-2 font-bold md:text-3xl">
						{game?.homeTeam.teamName}
					</span>
				</div>

				{/* game info */}
				<div className="font-oswald my-4 flex w-full flex-col items-center text-center">
					<h2 className={`${gameIsLive && "text-primary"} my-8`}>
						{gameIsLive ? "Live" : gameStatus}
					</h2>
					<h4 className="text-xl md:text-4xl">
						{day} {monthDay} @ {time}
					</h4>
					<h5 className="text lg md:text-3xl">{game?.location}</h5>
				</div>

				{/* away team */}
				<div className="flex w-full flex-col items-center">
					<h2
						className={`my-4 ${
							game?.awayTeamScore > game?.homeTeamScore && "text-primary"
						}`}
					>
						{game?.awayTeamScore}
					</h2>
					<span className="my-2 text-lg font-bold md:text-3xl ">
						{game?.awayTeam?.teamName}
					</span>
				</div>
			</div>
			{game.status && !gameIsLive && (
				<div className="text-center">
					<h4>
						Winner:{" "}
						<span className="text-primary">
							{game?.awayTeamScore > game?.homeTeamScore
								? game?.awayTeam?.teamName
								: game?.homeTeam?.teamName}
						</span>
					</h4>
					<h4>POTG: {game?.playerOfTheGame?.playerName}</h4>
				</div>
			)}
		</div>
	);
};

export default GameInfo;
