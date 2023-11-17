"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import WinnerIcon from "@/public/images/winner-icon.png";
import Image from "next/image";
import TeamLogo from "@/components/general/icons/TeamLogo";
import FutureGame from "./FutureGame";

export default function FutureGames({ separatedGames }): JSX.Element {
	const containerRef = useRef(null);

	const scrollLeft = () => {
		const container = containerRef.current;
		container.scrollTo({
			left: container.scrollLeft - container.offsetWidth,
			behavior: "smooth",
		});
	};

	const scrollRight = () => {
		const container = containerRef.current;
		container.scrollTo({
			left: container.scrollLeft + container.offsetWidth,
			behavior: "smooth",
		});
	};

	return (
		<div className="flex ">
			<button
				style={{ backgroundColor: "#16161A" }}
				className={` hidden px-3 text-gray-100 sm:block`}
				onClick={scrollLeft}
			>
				<svg
					className="h-6 w-6 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="#ffffff"
				>
					<path d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<div
				ref={containerRef}
				className="flex items-center overflow-x-auto overflow-y-hidden xl:overflow-x-hidden"
			>
				{separatedGames.map((dateGroup, dateIndex) => (
					<article
						className="bg-secondary flex max-h-[140px] items-center border-r border-neutral-600"
						key={dateIndex}
					>
						{/* date */}
						<div className="bg-secondary flex h-full flex-col items-center gap-1 p-[18px] text-center text-xs uppercase md:text-lg">
							{dateGroup.date}
						</div>
						{dateGroup.games
							.sort((gameA, gameB) => {
								// Convert the date strings to timestamps and then subtract
								const dateA = new Date(gameA.date).getTime();
								const dateB = new Date(gameB.date).getTime();
								return dateA - dateB;
							})
							.map((game, index) => {
								const homeTeamWon = game.homeTeamScore > game.awayTeamScore;
								let torontoTime;
								if (!game.status) {
									const dateStr = game.date;
									const date = new Date(dateStr);

									// Convert the date to Toronto time
									torontoTime = date
										.toLocaleTimeString("en-US", {
											minute: "2-digit",
											hour: "numeric",
											hour12: true,
										})
										.replace(/ /g, "\u202F"); // Replace regular spaces with non-breaking spaces
								}

								return (
									<FutureGame
										key={index}
										game={game}
										time={torontoTime}
										homeTeamWon={homeTeamWon}
									/>
								);
							})}
					</article>
				))}
			</div>
			<button
				style={{ backgroundColor: "#16161A" }}
				className={` hidden px-3 text-gray-100 sm:block`}
				onClick={scrollRight}
			>
				<svg
					className="h-6 w-6 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="#ffffff"
				>
					<path d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	);
}
