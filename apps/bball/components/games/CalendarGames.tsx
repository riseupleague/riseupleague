"use client";
import { useState } from "react";
import {
	format,
	startOfWeek,
	addDays,
	isSameDay,
	lastDayOfWeek,
	addWeeks,
	subWeeks,
} from "date-fns";
import Link from "next/link";

const CalendarGames = ({ linkDate }) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	const changeWeekHandle = (btnType) => {
		if (btnType === "prev") {
			setCurrentMonth(subWeeks(currentMonth, 1));
		}
		if (btnType === "next") {
			setCurrentMonth(addWeeks(currentMonth, 1));
		}
	};

	const renderHeader = () => {
		const dateFormat = "MMM yyyy";
		return (
			<div className="my-5 flex items-center justify-between py-2">
				<div className="mb-8 flex w-full items-center justify-end">
					<div className="flex items-center">
						<button
							onClick={() => changeWeekHandle("prev")}
							className="hover:text-primary text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-chevron-left h-6 w-6"
							>
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</button>
						<span className="text-primary mx-4 text-lg font-medium">
							{format(currentMonth, dateFormat)}
						</span>
						<button
							onClick={() => changeWeekHandle("next")}
							className="hover:text-primary text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-chevron-right h-6 w-6"
							>
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</button>
					</div>
				</div>
			</div>
		);
	};

	const renderCells = () => {
		const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
		const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
		const dateFormat = "d";
		const rows = [];
		let days = [];
		let day = startDate;
		let formattedDate = "";
		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = format(day, dateFormat);
				const cloneDay = day;

				// Convert the date to seconds
				const currentDateInSeconds = Math.floor(cloneDay.getTime() / 1000);
				const isLinkDate =
					Number(linkDate) === currentDateInSeconds ? true : false;
				days.push(
					<Link
						href={`/schedule/${currentDateInSeconds}`}
						className={`relative mr-1 flex-1 cursor-pointer rounded-lg p-2 text-center sm:mr-3 ${
							isSameDay(day, new Date())
								? "bg-gray-900 text-white"
								: isSameDay(day, selectedDate)
									? "text-primary" // Add "text-primary" class when selectedDate matches
									: isLinkDate
										? "text-primary" // Add "text-primary" class when linkDate matches
										: "text-white"
						}`}
						// onClick={() => {
						// 	const dayStr = format(cloneDay, "ccc dd MMM yy");
						// 	onDateClickHandle(cloneDay, dayStr);
						// }}
					>
						<span className="mt-1 block text-xs font-medium">
							{format(day, "EEE")}
						</span>
						<span className="block font-medium">{formattedDate}</span>
					</Link>
				);
				day = addDays(day, 1);
			}

			rows.push(<div className="flex">{days}</div>);
			days = [];
		}

		return <div className="body">{rows}</div>;
	};

	return (
		<div className="calendar rounded-lg bg-neutral-900 p-4 shadow-md">
			{renderHeader()}
			{renderCells()}
		</div>
	);
};

export default CalendarGames;
