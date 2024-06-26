"use client";

import React, { useState } from "react";
import GameCard from "./GameCard";
import FilterDivisionGamesByDate from "../filters/FilterDivisionGamesByDate";
import CreateGame from "../game-management/CreateGame";

const DivisionScheduleList = ({ division }) => {
	const games = division.games;
	const [filteredGames, setFilteredGames] = useState(games);

	const [currentDate, setCurrentDate] = useState("");
	const uniqueDatesArray = games.reduce((uniqueDates, game) => {
		const date = new Date(game.date);
		const formattedDate = date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		// Check if the formatted date already exists in the uniqueDates array
		if (!uniqueDates.includes(formattedDate)) {
			// If not, add it to the array
			uniqueDates.push(formattedDate);
		}

		return uniqueDates;
	}, []);

	const gamesByWeek = filteredGames.reduce((acc, game) => {
		const { week } = game;
		if (!acc[week]) {
			acc[week] = [];
		}
		acc[week].push(game);
		return acc;
	}, {});

	const handleDateChange = async (selectedDate) => {
		// Parse selectedDate into a Date object
		const dateObject = new Date(selectedDate);

		// Check if the dateObject is valid
		if (!isNaN(dateObject.getTime())) {
			// Format the date
			const formattedSelectedDate = dateObject.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});

			setCurrentDate(formattedSelectedDate);
			// Now you can use formattedSelectedDate for filtering or any other purposes

			// Filter games array to only include games with the selected date
			const gamesOnSelectedDate = games.filter((game) => {
				const gameDate = new Date(game.date);
				const formattedGameDate = gameDate.toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				});

				return formattedGameDate === formattedSelectedDate;
			});

			setFilteredGames(gamesOnSelectedDate);
		} else {
			console.error("Invalid date:", selectedDate);
		}
	};

	return (
		<>
			<div className="my-10 flex items-center justify-between">
				<div>
					<FilterDivisionGamesByDate
						currentDate={currentDate}
						dates={uniqueDatesArray}
						handleDateChange={handleDateChange}
					/>
				</div>
				<CreateGame division={division} />
			</div>
			{Object.keys(gamesByWeek).map((week, weekIndex) => (
				<div key={weekIndex} className="mb-4 mt-20">
					<div className="mb-10 flex items-center gap-20">
						<p className="text-xl font-semibold">Week {week}</p>
					</div>
					<div className="my-8 flex flex-col gap-2">
						{gamesByWeek[week].map((game, index) => (
							<GameCard game={game} key={index} />
						))}
					</div>
				</div>
			))}
			{/* <div className="my-8 flex flex-col gap-2">
				{filteredGames.map((game, index) => {
					return <GameCard game={game} key={index} />;
				})}
			</div> */}
		</>
	);
};

export default DivisionScheduleList;
