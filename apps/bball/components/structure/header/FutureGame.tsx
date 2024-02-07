"use client";

import TeamLogo from "@/components/general/icons/TeamLogo";
import Link from "next/link";
import Image from "next/image";
import WinnerIcon from "@/public/images/winner-icon.png";
import { useState } from "react";

export default function FutureGame({ date, game, time, homeTeamWon }) {
	const [isHovered, setIsHovered] = useState(false);
	const gameStatus = game.status ? "summary" : "preview";

	const liveGame = isLiveGame(date);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative"
		>
			<div className="flex w-fit flex-col gap-2 bg-neutral-900 px-5 py-4 pt-4 uppercase">
				<div className={liveGame ? "text-primary" : ""}>
					{game.status ? <>{liveGame ? "LIVE" : "Final"}</> : time}
				</div>

				{/* home */}
				<div className="flex w-full justify-between gap-[100px] font-bold">
					<div className="flex items-center gap-2">
						<TeamLogo
							primary={game.homeTeam?.primaryColor || ""}
							secondary={game.homeTeam?.secondaryColor || ""}
							tertiary={game.homeTeam?.tertiaryColor || ""}
							circleWidth={1.3}
							circleHeight={1.3}
							width={15}
							height={14}
						/>
						<div>{game.homeTeam?.teamNameShort}</div>
					</div>
					{game.status ? (
						<p className="m-0 flex w-5 items-center gap-2 lg:text-lg">
							{game.homeTeamScore}
							{homeTeamWon && (
								<Image
									src={WinnerIcon.src}
									alt="Winner icon"
									width={540}
									height={480}
									style={{ objectFit: "contain" }}
									className="h-3 w-5"
								/>
							)}
						</p>
					) : null}
				</div>
				{/* away */}
				<div className="flex w-full justify-between gap-[100px] font-bold">
					<div className="flex items-center gap-2">
						<TeamLogo
							primary={game.awayTeam?.primaryColor || ""}
							secondary={game.awayTeam?.secondaryColor || ""}
							tertiary={game.awayTeam?.tertiaryColor || ""}
							circleWidth={1.3}
							circleHeight={1.3}
							width={15}
							height={14}
						/>
						<div>{game.awayTeam?.teamNameShort}</div>
					</div>

					{game.status ? (
						<p className="m-0 flex w-5 items-center gap-2 lg:text-lg">
							{game.awayTeamScore}
							{!homeTeamWon && (
								<Image
									src={WinnerIcon.src}
									alt="Winner icon"
									width={540}
									height={480}
									style={{ objectFit: "contain" }}
									className="h-3 w-5"
								/>
							)}
						</p>
					) : null}
				</div>
				{/* division */}
				<div
					className={`${
						game.division.divisionColor && game.division.divisionColor !== ""
							? game.division.divisionColor
							: "text-primary"
					} mt-1 w-fit text-sm font-semibold uppercase`}
				>
					{game.division.divisionName}
				</div>
			</div>
			{isHovered && (
				<Link
					href={`/games/${gameStatus}/${game._id}`}
					className="text-primary absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center bg-neutral-900 text-center"
				>
					<span>{game.homeTeam?.teamName}</span>
					<span>vs.</span>
					<span>{game.awayTeam?.teamName}</span>
					<span className="text-sm capitalize">{gameStatus}</span>
				</Link>
			)}
		</div>
	);
}

const isLiveGame = (date) => {
	const HOUR = 1000 * 60 * 60;
	const anHourAgo = Date.now() - HOUR;

	return date > anHourAgo && Date.now() > date;
};
