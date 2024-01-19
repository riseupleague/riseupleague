"use client";

import React, { useRef } from "react";
import FutureGame from "./FutureGame";
import { format } from "date-fns-tz";
import { convertToEST } from "@/utils/convertToEST";
import ScrollRightIcon from "@/components/icons/ScrollRightIcon";
import ScrollLeftIcon from "@/components/icons/ScrollLeftIcon";
import { startOfDay } from "date-fns";

export default function FutureGames({ allUpcomingGames }): JSX.Element {
	const currentDate = startOfDay(new Date());

	const allGames = allUpcomingGames?.filter((game) => {
		console.log(
			new Date(game.date),
			convertToEST(new Date(game.date)),
			game.date
		);

		return new Date(game.date) >= currentDate;
	});
	const separatedGames = [];

	allGames.forEach((game) => {
		const gameDate = new Date(game.date);
		const month = format(gameDate, "MMM");
		const day = format(gameDate, "d");
		const formattedDate = `${month} ${day}`;

		// Check if there's an object with the same date, if not, create one
		const existingDateObject = separatedGames.find((obj) => {
			return obj.date === formattedDate;
		});

		if (existingDateObject) {
			existingDateObject.games.push(game);
		} else {
			const newDateObject = { date: formattedDate, games: [game] };
			separatedGames.push(newDateObject);
		}
	});

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
				className="hidden bg-neutral-500 px-3 text-gray-100 sm:block"
				onClick={scrollLeft}
			>
				<ScrollRightIcon />
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
						<div className="bg-secondary flex h-full flex-col items-center gap-1 p-[18px] text-center text-xs uppercase md:text-lg">
							{dateGroup.date}
						</div>
						{dateGroup.games
							.sort((gameA, gameB) => {
								const dateA = new Date(gameA.date).getTime();
								const dateB = new Date(gameB.date).getTime();
								return dateA - dateB;
							})
							.map((game, index) => {
								const homeTeamWon = game.homeTeamScore > game.awayTeamScore;
								let date = game.date;
								let torontoTime = format(new Date(date), "p");

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
				className="hidden bg-neutral-500 px-3 text-gray-100 sm:block"
				onClick={scrollRight}
			>
				<ScrollLeftIcon />
			</button>
		</div>
	);
}
