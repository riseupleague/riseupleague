"use client";

import { useEffect, useState } from "react";

export default function SeasonCountdown() {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const now = new Date();
	const season3Start = new Date("2023-10-22T00:00:00.000Z");

	const formatTime = (time) => {
		return time < 10 ? `0${time}` : time;
	};

	useEffect(() => {
		const totalSeconds: number = (season3Start - now) / 1000;
		setDays(formatTime(Math.floor(totalSeconds / 3600 / 24)));
	}, [now, season3Start]);

	return (
		<section className="font-barlow container mx-auto flex w-full flex-col px-6 py-2 md:text-right">
			<h3 className="text-white">SEASON 4 | {days} DAYS LEFT</h3>
			<h4 className="text-2xl text-white">WINTER 24’ SEASON</h4>
		</section>
	);
}
