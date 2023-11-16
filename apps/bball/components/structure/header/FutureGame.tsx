"use client";

import TeamLogo from "@/components/general/icons/TeamLogo";
import Link from "next/link";
import Image from "next/image";
import WinnerIcon from "@/public/images/winner-icon.png";
import { useState } from "react";

export default function FutureGame({ game, time, homeTeamWon }) {
	const [isHovered, setIsHovered] = useState(false);
	const gameStatus = time ? "preview" : "summary";

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative"
		>
			<div className="flex w-fit flex-col gap-2 bg-neutral-900 px-5 pb-2 pt-4 uppercase">
				<h4>{time ? time : "Final"}</h4>
				{/* home */}
				<h3 className="flex w-full justify-between gap-[100px] font-bold">
					<div className="flex items-center gap-2">
						<TeamLogo
							primary={game.homeTeam.primaryColor}
							secondary={game.homeTeam.secondaryColor}
							tertiary={game.homeTeam.tertiaryColor}
							circleWidth={1.3}
							circleHeight={1.3}
							width={15}
							height={14}
						/>
						<h5>{game.homeTeam.teamNameShort}</h5>
					</div>
					{game.status ? (
						<p className="m-0 flex w-5 items-center gap-2">
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
					) : (
						<p className="m-0 flex w-5 items-center gap-2"></p>
					)}
				</h3>
				{/* away */}
				<h3 className="flex w-full justify-between gap-[100px] font-bold">
					<div className="flex items-center gap-2">
						<TeamLogo
							primary={game.awayTeam.primaryColor}
							secondary={game.awayTeam.secondaryColor}
							tertiary={game.awayTeam.tertiaryColor}
							circleWidth={1.3}
							circleHeight={1.3}
							width={15}
							height={14}
						/>
						<h5>{game.awayTeam.teamNameShort}</h5>
					</div>

					{game.status ? (
						<p className="m-0 flex w-5 items-center gap-2">
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
					) : (
						<p className="m-0 flex w-5 items-center gap-2"></p>
					)}
				</h3>
				{/* division */}
				<h3 className="text-primary mt-1 w-fit text-sm font-semibold uppercase">
					{game.division.divisionName}
				</h3>
			</div>
			{isHovered && (
				<Link
					href={`/games/${gameStatus}/${game._id}`}
					className="z-1 text-primary absolute top-0 flex h-full w-full flex-col items-center justify-center bg-neutral-900 transition-all hover:underline"
				>
					<span>
						{game.homeTeam.teamNameShort} vs {game.awayTeam.teamNameShort}
					</span>
					<span className="capitalize">{gameStatus}</span>
				</Link>
			)}
		</div>
	);
}
