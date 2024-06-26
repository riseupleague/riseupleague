"use client";

import { useState } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import { Separator } from "@ui/components/separator";
import FilterByCity from "../filters/FilterByCity";
import GameCard from "../league-schedule/GameCard";
import FilterGamesByDate from "../filters/FilterGamesByDate";
import { Label } from "@ui/components/label";

const GamesListByDate = ({
	gamesByDate,
	divisions,
	cities,
	dateInSeconds,
}): JSX.Element => {
	const [games, setGames] = useState(gamesByDate);
	const [divisionsToShow, setDivisionsToShow] = useState(divisions);
	const [division, setDivision] = useState(divisions[0] || null);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const division = divisions.find((division) => division._id === event);
		setDivision(division);
		const selectedGames = gamesByDate[0].games.filter(
			(game) => game.division._id === event
		);
		setGames([{ date: gamesByDate[0].date, games: selectedGames }]);
	};

	// Handle the select change event
	const handleCitiesChange = (event) => {
		const selectedCity = event;
		const selectedGames = gamesByDate[0].games.filter(
			(game) => game.division.city === selectedCity
		);
		setGames([{ date: gamesByDate[0].date, games: selectedGames }]);
		const filteredDivisions = divisions.filter((division) => {
			return division.city === selectedCity;
		});
		setDivisionsToShow(filteredDivisions);
	};
	const currentDate = new Date(dateInSeconds * 1000);
	const options = {
		month: "long" as const,
		day: "numeric" as const,
		year: "numeric" as const,
	}; // Specify month, day, and year as string literals
	const formattedDate = currentDate.toLocaleDateString("en-US", options);
	return (
		<section>
			<div className="flex flex-col gap-4 md:flex-row">
				<FilterGamesByDate dateInSeconds={dateInSeconds} />
				{cities?.length > 1 && (
					<FilterByCity
						handleCitiesChange={handleCitiesChange}
						cities={cities}
						placeholder={"All Cities"}
					/>
				)}

				{divisionsToShow?.length > 1 && (
					<FilterByDivision
						currentDivision={division}
						divisions={divisionsToShow}
						handleDivisionChange={handleDivisionChange}
					/>
				)}
			</div>

			{gamesByDate.length === 0 && (
				<p className="text-primary mt-10 text-2xl">
					No games scheduled for {formattedDate}
				</p>
			)}

			{gamesByDate.length > 0 && (
				<>
					{/* render schedule games */}
					<div className="my-8">
						{games.map((date, index) => {
							return (
								<div key={index}>
									<h3 className="text-2xl">{date.date}</h3>
									<Separator className="border-b border-neutral-600" />

									<div className="grid grid-cols-1 gap-3 py-7">
										{date.games?.map((game, index) => (
											<GameCard game={game} key={index} />
										))}
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</section>
	);
};

export default GamesListByDate;
