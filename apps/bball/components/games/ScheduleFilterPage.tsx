"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
	const [selectedDivision, setSelectedDivision] = useState("");
	const [selectedTeam, setSelectedTeam] = useState("");
	const [allTeams, setAllTeams] = useState(teamsNameDivisionAndId);
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

	// Handle the select change event for filtering by division and team
	const handleFilterChange = (event) => {
		const { name, value } = event.target;

		if (name === "division") {
			setSelectedDivision(value);
			// First, filter by division

			const filteredTeams = teamsNameDivisionAndId.filter((team) => {
				if (value === "") {
					return true;
				}
				return team.division.divisionName === value;
			});

			setAllTeams(filteredTeams);

			const filteredGames = allUpcomingGames
				.filter((game) => {
					if (value === "") {
						setSelectedTeam("");
						return true;
					}
					return game.division.divisionName === value;
				})
				.filter((game) => {
					if (filteredTeams.find((team) => team.teamName === selectedTeam)) {
						const homeTeamMatch =
							selectedTeam === "" || game.homeTeam.teamName === selectedTeam;

						const awayTeamMatch =
							selectedTeam === "" || game.awayTeam.teamName === selectedTeam;

						return homeTeamMatch || awayTeamMatch;
					} else {
						return true;
					}
				});

			setGames(filteredGames);
		} else if (name === "team") {
			setSelectedTeam(value);
			// First, filter by division
			const filteredGames = allUpcomingGames
				.filter((game) => {
					if (selectedDivision === "") {
						return true;
					}
					return game.division.divisionName === selectedDivision;
				})
				.filter((game) => {
					const homeTeamMatch =
						value === "" || game.homeTeam.teamName === value;

					const awayTeamMatch =
						value === "" || game.awayTeam.teamName === value;

					return homeTeamMatch || awayTeamMatch;
				});
			setGames(filteredGames);
		}
	};

	return (
		<div>
			<div className="mb-10 flex gap-5">
				<select
					name="division"
					value={selectedDivision}
					onChange={handleFilterChange}
					className="w-1/4 rounded-md border px-2 py-1 text-black"
				>
					<option value="">All Divisions</option>
					{divisionsNameAndId.map((division) => (
						<option key={division._id} value={division.divisionName}>
							{division.divisionName}
						</option>
					))}
				</select>
				<select
					name="team"
					value={selectedTeam}
					onChange={handleFilterChange}
					className="w-1/4 rounded-md border px-2 py-1 text-black"
				>
					<option value="">All Teams</option>
					{allTeams.map((team) => (
						<option key={team._id} value={team.teamName}>
							{team.teamName}
						</option>
					))}
				</select>
			</div>
			{gamesByDate.map((games) => (
				<div key={games.date}>
					<h3 className="font-semibold">{games.date}</h3>
					<ul className="mx-auto w-11/12">
						{games?.games.map((game) => {
							const isoDate = game.date;

							const date = new Date(isoDate);

							const time = date.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							});
							return (
								<li
									key={game._id}
									style={{ backgroundColor: "#18181A" }}
									className="my-14 flex w-full flex-col items-center py-8 text-left text-white  shadow-md focus:outline-none lg:flex-row  lg:justify-between lg:px-5 "
								>
									<div className="mb-8 flex w-full  flex-grow flex-col  items-center lg:mb-0">
										<span className="text-main text-lg">
											{game.division.divisionName}
										</span>
										<div className="mx-auto flex flex-row items-center sm:flex-col">
											<div className="flex  items-center">
												<div className="flex items-center px-1">
													<svg
														width="18"
														height="18"
														viewBox="0 0 24 24"
														fill="#fff"
													>
														<path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
													</svg>
												</div>
												<div
													className=" w-full px-1 text-center text-xs font-medium"
													style={{ fontSize: "0.7rem" }}
												>
													{game.location}
												</div>
											</div>
										</div>
									</div>

									<div className="flex  w-full flex-grow   items-center justify-center">
										<div className="flex flex-1  flex-col items-center justify-center">
											{game.status === true && (
												<span
													className={`mb-2 text-3xl font-bold  ${
														game.homeTeamScore !== undefined &&
														game.awayTeamScore !== undefined &&
														game.homeTeamScore > game.awayTeamScore
															? "text-main"
															: ""
													}    `}
												>
													{game.homeTeamScore}
												</span>
											)}
											<Link
												href={`/teams/${game.homeTeam._id}`}
												className="text-md text-xl font-semibold hover:underline"
											>
												{game.homeTeam.teamNameShort
													? game.homeTeam.teamNameShort
													: game.homeTeam.teamName}
											</Link>
											<span className="text-sm font-light">
												{game.homeTeam.wins}-{game.homeTeam.losses}
											</span>
										</div>
										<div className=" mx-4  flex h-20 flex-1 flex-col items-center lg:h-auto">
											<div className="flex flex-col items-center justify-center">
												<span className="mb-2 text-xl font-bold lg:text-2xl xl:text-3xl">
													{game.status === true ? "Final" : time}
												</span>
											</div>
											{game.status === false && (
												<span className="my-auto mb-20 block font-normal sm:hidden">
													vs
												</span>
											)}
										</div>
										<div className="flex  flex-1 flex-col items-center justify-center">
											{game.status === true && (
												<span
													className={`mb-2 text-3xl font-bold  ${
														game.homeTeamScore !== undefined &&
														game.awayTeamScore !== undefined &&
														game.awayTeamScore > game.homeTeamScore
															? "text-main"
															: ""
													}    `}
												>
													{game.awayTeamScore}
												</span>
											)}
											<Link
												href={`/teams/${game.awayTeam?._id}`}
												className="text-md text-xl font-semibold hover:underline"
											>
												{game.awayTeam?.teamNameShort
													? game.awayTeam?.teamNameShort
													: game.awayTeam?.teamName}
											</Link>
											<span className="text-sm font-light">
												{game.awayTeam?.wins}-{game.awayTeam?.losses}
											</span>
										</div>
									</div>
									{game.status === false ? (
										<div className="flex w-full   flex-grow justify-center">
											<Link
												href={`/games/preview/${game._id}`}
												className="mt-5 w-10/12 rounded-full border px-12 py-2 text-center font-semibold hover:border-orange-500 sm:mt-0 sm:w-fit sm:rounded-none"
											>
												Preview
											</Link>
										</div>
									) : (
										<div className="flex w-full   flex-grow justify-center">
											<Link
												href={`/games/summary/${game._id}`}
												className="mt-5 w-10/12 rounded-full border px-12 py-2 text-center font-semibold hover:border-orange-500 sm:mt-0 sm:w-fit sm:rounded-none"
											>
												Summary
											</Link>
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			))}
		</div>
	);
}
