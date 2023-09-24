"use client";

import { useState, useEffect } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import FilterByTeam from "../filters/FilterByTeam";
import ScheduleCard from "./ScheduleCard";

interface Game {
	_id: string;
	gameName: string;
	date: string;
	homeTeam: {
		_id: string;
		teamName: string;
		teamNameShort: string;
		wins?: number; // Make it optional with the "?"
		losses?: number; // Make it optional with the "?"
	};
	awayTeam: {
		_id: string;
		teamName: string;
		teamNameShort: string;
		wins?: number; // Make it optional with the "?"
		losses?: number; // Make it optional with the "?"
	};
	status: boolean;
	division: {
		_id: string;
		divisionName: string;
	};
	location: string;
	homeTeamScore?: number;
	awayTeamScore?: number;
}

interface DateObject {
	date: string;
	games: Game[];
}
export default function ScheduleFilterPage({
	allUpcomingGames,
	divisionsNameAndId,
	teamsNameDivisionAndId,
}) {
	const [games, setGames] = useState(allUpcomingGames);
	const [allTeams, setAllTeams] = useState(teamsNameDivisionAndId);
	const [selectedDivision, setSelectedDivision] = useState("All Divisions");
	const [selectedTeam, setSelectedTeam] = useState("All Teams");
	const [gamesByDate, setGamesByDate] = useState<DateObject[]>([]);

	useEffect(() => {
		// Inside the useEffect, you can create gamesByDateArray and set state
		const gamesByDateArray: DateObject[] = [];

		games.forEach((game) => {
			const date = new Date(game.date);
			const formattedDate = date.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			const existingDateObject = gamesByDateArray.find(
				(dateObject) => dateObject.date === formattedDate
			);

			if (existingDateObject) {
				existingDateObject.games.push(game);
			} else {
				gamesByDateArray.push({ date: formattedDate, games: [game] });
			}
		});

		// Set the games state with the computed gamesByDateArray
		setGamesByDate(gamesByDateArray);

		if (selectedDivision === "" && selectedTeam === "") {
			setGames(allUpcomingGames);
		}
	}, [games, selectedDivision, selectedTeam, allUpcomingGames]); // Ensure this effect runs when allUpcomingGames changes

	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;

		setSelectedDivision(selectedDivisionId);

		// get all teams with division id
		const filteredTeams = teamsNameDivisionAndId.filter(
			(team) => team.division._id === selectedDivisionId
		);
		setAllTeams(filteredTeams);

		// get all games with division id
		const filteredGames = allUpcomingGames.filter(
			(game) => game.division._id === selectedDivisionId
		);
		setGames(filteredGames);

		// select first team in the list
		setSelectedTeam(filteredTeams[0].teamName);
	};

	const handleTeamChange = (event) => {
		const selectedTeamId = event;

		setSelectedTeam(selectedTeamId);

		let filteredGames;

		if (selectedDivision === "All Divisions") {
			filteredGames = allUpcomingGames.filter(
				(game) =>
					game.homeTeam?._id === selectedTeamId ||
					game.awayTeam?._id === selectedTeamId
			);
		} else {
			// get all games with division id
			filteredGames = allUpcomingGames.filter(
				(game) =>
					game.division._id === selectedDivision &&
					(game.homeTeam?._id === selectedTeamId ||
						game.awayTeam?._id === selectedTeamId)
			);
		}

		setGames(filteredGames);
	};

	return (
		<div>
			<div className="mb-10 flex flex-col md:flex-row gap-5">
				<FilterByDivision
					selectedDivision={selectedDivision}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
				/>
				<FilterByTeam
					selectedTeam={selectedTeam}
					handleTeamChange={handleTeamChange}
					teams={allTeams}
				/>
			</div>
			{gamesByDate.map((games) => (
				<div key={games.date}>
					<h3 className="font-barlow my-4 text-sm uppercase md:text-2xl">
						{games.date}
					</h3>
					<hr className="my-4 border border-neutral-600" />
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{games?.games.map((game, index) => {
							const isoDate = game.date;

							const date = new Date(isoDate);

							const time = date.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							});
							return <ScheduleCard game={game} key={index} />;
						})}
					</div>
				</div>
			))}
		</div>
	);
}
