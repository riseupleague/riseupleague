"use client";

import CalendarGames from "./CalendarGames";
import ScheduleCard from "./ScheduleCard";

const ScheduleFilterPage = ({ gamesByDate }): JSX.Element => {
	const gameSchedule = gamesByDate.length > 0 ? gamesByDate[0] : {};

	const currentDate = new Date();
	const linkDate = Math.floor(currentDate.getTime() / 1000);

	const date = new Date(linkDate * 1000).toLocaleDateString("en-US", {
		timeZone: "America/Toronto",
		month: "short",
		day: "2-digit",
		weekday: "long",
	});

	return (
		<div className="relative">
			<div>
				<CalendarGames linkDate={linkDate} />
			</div>

			{Object.keys(gameSchedule).length > 0 && (
				<div>
					<h3>{gameSchedule.date}</h3>
					<hr />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{gameSchedule.games?.map((game) => {
							return <ScheduleCard game={game} key={game._id} />;
						})}
					</div>
				</div>
			)}

			{Object.keys(gameSchedule).length === 0 && (
				<h3>No games scheduled for {date}</h3>
			)}
		</div>
	);
};

export default ScheduleFilterPage;
