"use client";

import { useState } from "react";
import FilterByDate from "../filters/FilterByDate";
import FilterByDivision from "../filters/FilterByDivision";
import NewScheduleCard from "./NewScheduleCard";
import { Separator } from "@ui/components/separator";
import { format, startOfDay } from "date-fns";
import { useRouter } from "next/navigation";

const NewSchedule = ({
	selectedDate = startOfDay(new Date()),
	allGameDates,
	gamesByDate,
	divisionsWithStats,
}): JSX.Element => {
	const router = useRouter();
	const formattedDate = format(selectedDate, "EEEE, MMM dd");

	let filterPlaceholder = "All Divisions";

	const [scheduleGames, setScheduleGames] = useState(
		gamesByDate.length > 0 ? gamesByDate[0].games : []
	);

	const divisionsNameAndId = divisionsWithStats.map((division) => {
		return {
			divisionName: division.divisionName,
			_id: division._id,
		};
	});

	// Add "All Divisions" to the beginning of the array
	divisionsNameAndId.unshift({ divisionName: "All Divisions", _id: "" });

	let initialDivId = divisionsNameAndId[0]._id;

	const [selectedDivision, setSelectedDivision] = useState(initialDivId);

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		if (selectedDivisionId !== "default") {
			// filter the schedule games based on the selected division name
			const filteredGames = filterGames(gamesByDate[0], selectedDivisionId);

			setSelectedDivision(selectedDivisionId);
			setScheduleGames(filteredGames);
		} else {
			setScheduleGames(gamesByDate[0].games);
			setSelectedDivision("default");
		}
	};

	const handleDateChange = (e) => {
		const formattedDate = format(e, "yyyy-MM-dd");

		router.push(`/schedule/${formattedDate}`);
	};

	return (
		<section>
			<div className="flex flex-col gap-4 md:flex-row">
				<FilterByDate
					allGameDates={allGameDates}
					handleDateChange={handleDateChange}
				/>
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
					placeholder={filterPlaceholder}
				/>
			</div>

			{/* render schedule games */}
			<div className="my-8">
				<h3 className="text-3xl">{formattedDate}</h3>
				<Separator className="border-b border-neutral-600" />

				{scheduleGames?.length > 0 ? (
					scheduleGames?.map((game, index) => (
						<NewScheduleCard game={game} key={index} />
					))
				) : (
					<div>
						<h3 className="text-primary my-8 text-center">
							No games found for this division on {formattedDate}.
						</h3>
					</div>
				)}
			</div>
		</section>
	);
};

const filterGames = (date, id) => {
	const games = date.games.filter((game) => game.division._id === id);

	return games;
};

export default NewSchedule;
