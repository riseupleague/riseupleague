"use client";

import { useRef } from "react";
import FutureGame from "./FutureGame";
import { format, utcToZonedTime } from "date-fns-tz";
import { convertToEST } from "@/utils/convertToEST";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

const FutureGames = ({ allUpcomingGames }): JSX.Element => {
	const separatedGames = [];

	allUpcomingGames.forEach((game) => {
		let formattedDate;
		if (game.division._id === "660d6a75ab30a11b292cd290") {
			// convert utc date
			const gameDate = new Date(game.date);
			const utcDate = utcToZonedTime(gameDate, "UTC");

			const month = format(utcDate, "MMM");
			const day = format(utcDate, "d");

			formattedDate = `${month} ${day}`;

			// convert utc date
		} else {
			// convert to toronto date
			const gameDate = convertToEST(new Date(game.date));
			const month = format(gameDate, "MMM");
			const day = format(gameDate, "d");
			formattedDate = `${month} ${day}`;
		}

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
		<div className="flex">
			<button
				className="hidden bg-neutral-500 px-3 text-gray-100 sm:block"
				onClick={scrollLeft}
			>
				<IoMdArrowDropleft className="size-8" />
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
								let date;
								let torontoTime;
								let roundedTime;

								if (game.division._id === "660d6a75ab30a11b292cd290") {
									date = game.date;
									const utcDate = utcToZonedTime(date, "UTC");

									torontoTime = format(new Date(utcDate), "p");
								} else {
									date = convertToEST(game.date);
									torontoTime = format(new Date(date), "p");
								}

								if (
									torontoTime.endsWith(":59 PM") ||
									torontoTime.endsWith(":59 AM")
								) {
									// If the time is 7:59 PM or 7:59 AM, round it up to the next hour
									roundedTime = (parseInt(torontoTime) + 1).toString() + ":00";
								} else {
									// Otherwise, keep the hour and minutes as they are
									roundedTime = torontoTime;
								}

								return (
									<FutureGame
										key={index}
										date={date}
										game={game}
										time={roundedTime}
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
				<IoMdArrowDropright className="size-8" />
			</button>
		</div>
	);
};

export default FutureGames;
