"use client";

import LocationMarker from "@/components/general/icons/LocationMarker";
import TeamLogo from "@/components/general/icons/TeamLogo";
import { Button } from "@ui/components/button";
import Link from "next/link";

import { Separator } from "@ui/components/separator";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/ui/dialog";
import { useState } from "react";

export default function ChooseSchedule({ team, user }) {
	const divisionTeams = team.division.teams;
	const gamesMade = team.division.games;
	console.log(gamesMade);
	const scheduleAvailable = divisionTeams < 6 ? false : true;
	// const scheduleAvailable = true;

	const teamCaptain = team.players.filter((player) => player.teamCaptain)[0];
	// const isTeamCaptain = user._id === teamCaptain.user;
	const isTeamCaptain = true;

	const otherTeams = divisionTeams.filter(
		(otherTeam) => otherTeam !== team._id
	);

	const { startTime, endTime } = team.division;
	const [selectedGames, setSelectedGames] = useState([]);
	// Function to convert time to seconds
	const timeToSeconds = (time) => {
		const [hours, minutes] = time.split(":").map(Number);
		return hours * 3600 + minutes * 60;
	};

	// Function to convert seconds to time (hh:mm)
	const secondsToTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`;
	};

	const handleGameSelect = (weekNumber, gameIndex, gameStartTime, homeTeam) => {
		const selectedGame = {
			homeTeam: homeTeam,
			week: weekNumber,
			index: gameIndex,
			time: gameStartTime,
		};

		// Check if the game is already selected for the same week, if yes, remove it; otherwise, add it
		const isGameSelectedInWeek = selectedGames.some(
			(game) => game.week === selectedGame.week
		);

		if (isGameSelectedInWeek) {
			setSelectedGames((prevSelectedGames) =>
				prevSelectedGames.filter((game) => game.week !== selectedGame.week)
			);
		}

		setSelectedGames((prevSelectedGames) => [
			...prevSelectedGames,
			selectedGame,
		]);
	};

	const generateGameSlots = (weekNumber) => {
		const gameSlots = [];
		const startTimeSeconds = timeToSeconds(startTime);
		const endTimeSeconds = timeToSeconds(endTime);
		const gameDurationSeconds = 3600; // Assuming each game is 1 hour

		for (let i = 0; i < 4; i++) {
			const gameStartTimeSeconds = startTimeSeconds + i * gameDurationSeconds;
			const gameEndTimeSeconds = gameStartTimeSeconds + gameDurationSeconds;

			const gameStartTime = secondsToTime(gameStartTimeSeconds);
			const gameEndTime = secondsToTime(gameEndTimeSeconds);
			const gameMade = gamesMade.find((game) => timeToSeconds(game.time));

			if (gameMade && gameMade.homeTeam) {
			}
			gameSlots.push(
				<article
					key={`game-${weekNumber}-${i}`}
					className={`flex flex-col rounded border ${
						selectedGames.some(
							(game) => game.week === weekNumber && game.index === i
						)
							? "border-primary" // Add red border if the game is selected
							: "border-neutral-600"
					} bg-neutral-700`}
				>
					<div className="flex-1">
						<div className="grid grid-cols-3">
							{/* home team */}
							<div className="flex flex-col items-center gap-[10px] p-4">
								<TeamLogo
									primary={""}
									secondary={""}
									tertiary={""}
									width={45}
									height={44}
									circleHeight={4}
									circleWidth={4}
								/>
								<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
									Home Team
								</span>
							</div>

							{/* division / time / location */}
							<div className="font-barlow flex flex-col justify-center py-4 text-center uppercase">
								<div className="mb-4 flex justify-center">
									<p className="w-fit rounded bg-neutral-600 px-2 py-1 text-center text-xs">
										{team.division.divisionName}
									</p>
								</div>
								<p className="text-center">{`${gameStartTime} - ${gameEndTime}`}</p>
							</div>

							{/* away team */}
							<div className="flex flex-col items-center gap-[10px] p-4">
								<TeamLogo
									primary={""}
									secondary={""}
									tertiary={""}
									width={45}
									height={44}
									circleHeight={4}
									circleWidth={4}
								/>
								<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
									Away Team
								</span>
							</div>
						</div>
						<div className="font-barlow mb-3 flex items-center justify-center gap-1 text-lg">
							<div className="translate-y-[1px]">
								<LocationMarker />
							</div>
							<p className="text-sm text-neutral-400">
								{team.division.location}
							</p>
						</div>
					</div>

					{/* Select button */}
					<div className="flex p-4">
						<Button
							className="w-full "
							onClick={() =>
								handleGameSelect(weekNumber, i, gameStartTime, false)
							}
						>
							Select
						</Button>
					</div>
				</article>
			);
		}

		return gameSlots;
	};

	// Generate calendar for weeks 1 to 7
	const calendar = [];
	for (let week = 1; week <= 7; week++) {
		calendar.push(
			<div key={`week-${week}`} className="mb-10">
				<h2 className="mb-4">{`Week ${week}`}</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{generateGameSlots(week)}
				</div>
			</div>
		);
	}

	return (
		<div className="font-barlow">
			<h3 className="text-center">Division: {team.division.divisionName}</h3>
			<h6 className="my-2 text-center">
				{team.division.day} @ {team.division.location} from{" "}
				{team.division.startTime} - {team.division.endTime}
			</h6>

			<Separator className="my-3 border border-neutral-500 sm:my-12" />
			{scheduleAvailable ? (
				// if division has 6 teams or more
				<>
					{isTeamCaptain ? (
						// show schedule for team captain
						<>
							<p className="my-4 text-lg">
								Every team must play every other team once.
							</p>

							<Alert variant="destructive" className="border-primary">
								<div className="flex items-center gap-2">
									<AlertCircle />
									<AlertTitle>
										Since you were not the first team to select your schedule
										times, you must play the following team(s):
									</AlertTitle>
								</div>

								<Separator className="mt-4 border border-neutral-500" />

								<AlertDescription>
									<div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
										{otherTeams.map((team, index) => (
											<article key={index} className="text-lg">
												Team #{index + 1}
												<pre>{team}</pre>
											</article>
										))}
									</div>
								</AlertDescription>
							</Alert>
							<div className="my-20">{calendar}</div>

							{/* {schedule?.map((week, index) => (
								<article key={index} className="my-10">
									<h4>Week {index + 1}</h4>

									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
										{week.map((slot, idx) => {
											let slotCounter = 0;

											if (slot.homeTeam !== null) slotCounter++;
											if (slot.awayTeam !== null) slotCounter++;

											return (
												<Dialog key={idx}>
													<Button
														asChild
														className="flex flex-col gap-2 text-neutral-900"
													>
														<DialogTrigger>
															<p className="text-2xl">
																{slot1Hours + idx}:{slot1Minutes} -{" "}
																{slot1Hours + idx + 1}:{slot1Minutes}
															</p>
															<p className="text-base font-medium">
																{slotCounter}/2 slots filled
															</p>
															<span className="font-medium">
																{slot.homeTeam || "?"} vs {slot.awayTeam || "?"}
															</span>
														</DialogTrigger>
													</Button>
													<DialogContent className="rounded border-neutral-400 bg-neutral-900">
														<DialogHeader>
															<DialogTitle>
																<h4>
																	{slot1Hours + idx}:{slot1Minutes} -{" "}
																	{slot1Hours + idx + 1}:{slot1Minutes}
																</h4>
															</DialogTitle>
															<DialogDescription>
																<p className="text-lg">
																	Select an available slot.
																</p>
															</DialogDescription>
														</DialogHeader>

														<Separator className="border border-neutral-500" />

														<p>Home Team:</p>
														<Button
															onClick={() => handleReserveSlot(slot, "home")}
															className="disabled:bg-secondary font-medium disabled:cursor-not-allowed disabled:text-neutral-300"
														>
															Available
														</Button>
														<p>Away Team:</p>
														<Button
															onClick={() => handleReserveSlot(slot, "away")}
															type="submit"
															className="disabled:bg-secondary font-medium disabled:cursor-not-allowed disabled:text-neutral-300"
														>
															Available
														</Button>
													</DialogContent>
												</Dialog>
											);
										})}
									</div>
								</article>
							))} */}
						</>
					) : (
						// tell user that the schedule is only available for team captain
						<div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
							<h3 className="text-primary">
								Your schedule is available, but only the team captain may select
								the team schedule.
							</h3>
							<h4>
								Your team captain is:{" "}
								<span className="text-primary">{teamCaptain.playerName}</span>{" "}
							</h4>
							<div className="flex gap-4">
								<Button variant="default">
									<Link
										href="https://www.instagram.com/riseup.bball/"
										target="_blank"
									>
										Rise Up Instagram
									</Link>
								</Button>
								<Button variant="default">
									<Link href="/">Back to Homepage</Link>
								</Button>
							</div>
						</div>
					)}
				</>
			) : (
				// division has less than 6 teams, show different messaging
				<div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
					<h3 className="text-primary ">
						This division must have at least 6 teams in order for you to choose
						your schedule.
					</h3>
					<h4>Follow our Instagram for division updates!</h4>
					<div className="flex gap-4">
						<Button variant="default">
							<Link
								href="https://www.instagram.com/riseup.bball/"
								target="_blank"
							>
								Instagram
							</Link>
						</Button>
						<Button variant="default">
							<Link href="/">Back to Homepage</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

// export default function ChooseSchedule({ team, user }) {
// 	const { startTime, endTime } = team.division;

// 	// Function to convert time to seconds
// 	const timeToSeconds = (time) => {
// 		const [hours, minutes] = time.split(":").map(Number);
// 		return hours * 3600 + minutes * 60;
// 	};

// 	// Function to convert seconds to time (hh:mm)
// 	const secondsToTime = (seconds) => {
// 		const hours = Math.floor(seconds / 3600);
// 		const minutes = Math.floor((seconds % 3600) / 60);
// 		return `${hours.toString().padStart(2, "0")}:${minutes
// 			.toString()
// 			.padStart(2, "0")}`;
// 	};

// 	const generateGameSlots = (weekNumber) => {
// 		const gameSlots = [];
// 		const startTimeSeconds = timeToSeconds(startTime);
// 		const endTimeSeconds = timeToSeconds(endTime);
// 		const gameDurationSeconds = 3600; // Assuming each game is 1 hour

// 		for (let i = 0; i < 4; i++) {
// 			const gameStartTimeSeconds = startTimeSeconds + i * gameDurationSeconds;
// 			const gameEndTimeSeconds = gameStartTimeSeconds + gameDurationSeconds;

// 			const gameStartTime = secondsToTime(gameStartTimeSeconds);
// 			const gameEndTime = secondsToTime(gameEndTimeSeconds);

// 			gameSlots.push(
// 				<article
// 					key={`game-${weekNumber}-${i}`}
// 					className="flex flex-col rounded border border-neutral-600 bg-neutral-700"
// 				>
// 					<div className="flex-1">
// 						<div className="grid grid-cols-3">
// 							{/* home team */}
// 							<div className="flex flex-col items-center gap-[10px] p-4">
// 								<TeamLogo
// 									primary={""}
// 									secondary={""}
// 									tertiary={""}
// 									width={45}
// 									height={44}
// 									circleHeight={4}
// 									circleWidth={4}
// 								/>
// 								<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
// 									Team A
// 								</span>
// 							</div>

// 							{/* division / time / location */}
// 							<div className="font-barlow flex flex-col justify-center py-4 text-center uppercase">
// 								<div className="mb-4 flex justify-center">
// 									<p className="w-fit rounded bg-neutral-600 px-2 py-1 text-center text-xs">
// 										{team.division.divisionName}
// 									</p>
// 								</div>
// 								<p className="text-center">{`${gameStartTime} - ${gameEndTime}`}</p>
// 							</div>

// 							{/* away team */}
// 							<div className="flex flex-col items-center gap-[10px] p-4">
// 								<TeamLogo
// 									primary={""}
// 									secondary={""}
// 									tertiary={""}
// 									width={45}
// 									height={44}
// 									circleHeight={4}
// 									circleWidth={4}
// 								/>
// 								<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
// 									Team B
// 								</span>
// 							</div>
// 						</div>
// 						<div className="font-barlow mb-3 flex items-center justify-center gap-1 text-lg">
// 							<div className="translate-y-[1px]">
// 								<LocationMarker />
// 							</div>
// 							<p className="text-sm text-neutral-400">
// 								{team.division.location}
// 							</p>
// 						</div>
// 					</div>

// 					{/* preview/summary button */}
// 					<div className="flex p-4">
// 						<Button className="w-full capitalize">Join Game</Button>
// 					</div>
// 				</article>
// 			);
// 		}

// 		return gameSlots;
// 	};

// 	// Generate calendar for weeks 1 to 7
// 	const calendar = [];
// 	for (let week = 1; week <= 7; week++) {
// 		calendar.push(
// 			<div key={`week-${week}`} className="mb-10">
// 				<h2 className="mb-4">{`Week ${week}`}</h2>
// 				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// 					{generateGameSlots(week)}
// 				</div>
// 			</div>
// 		);
// 	}

// 	return <div>{calendar}</div>;
// }
