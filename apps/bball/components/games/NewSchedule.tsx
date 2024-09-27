"use client";

import { useState } from "react";
import FilterByDate from "../filters/FilterByDate";
import FilterByDivision from "../filters/FilterByDivision";
import NewScheduleCard from "./NewScheduleCard";
import { Separator } from "@ui/components/separator";
import FilterByCity from "../filters/FilterByCity";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const NewSchedule = ({
	gamesByDate,
	divisions,
	cities,
	formattedEstDate,
}): JSX.Element => {
	const [games, setGames] = useState(gamesByDate);
	const [divisionsToShow, setDivisionsToShow] = useState(divisions);

	// Get the current date and time
	const utcTime = new Date();
	const estTime = utcToZonedTime(utcTime, "America/Toronto");
	const formattedEst = format(estTime, "MMM do, yyyy");

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;
		const selectedGames = gamesByDate[0].games.filter(
			(game) => game.division._id === selectedDivisionId
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

	return (
		<section>
			<div className="flex flex-col gap-4 lg:flex-row">
				<FilterByDate formattedEstDate={formattedEstDate} />
				{cities?.length > 1 && (
					<FilterByCity
						handleCitiesChange={handleCitiesChange}
						cities={cities}
						placeholder={"All Cities"}
					/>
				)}
				{divisionsToShow?.length > 1 && (
					<FilterByDivision
						handleDivisionChange={handleDivisionChange}
						divisions={divisionsToShow}
						placeholder={"All Divisions"}
					/>
				)}
			</div>

			{gamesByDate.length === 0 && (
				<p className="text-primary mt-10 text-2xl">
					No games scheduled for {formattedEst}
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
											<NewScheduleCard game={game} key={index} />
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

export default NewSchedule;
