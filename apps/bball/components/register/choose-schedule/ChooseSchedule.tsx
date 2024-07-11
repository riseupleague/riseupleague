"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamLogo from "@/components/general/icons/TeamLogo";
import { Button } from "@ui/components/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { convertToEST } from "@/utils/convertToEST";
import { format } from "date-fns";
import { Separator } from "@ui/components/separator";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@ui/components/dialog";

const ChooseSchedule = ({ team, user }): JSX.Element => {
	const router = useRouter();
	const [gamesMade, setGamesMade] = useState(team.division.games);
	const scheduleAvailable = gamesMade.length > 0 ? true : false;
	const teamCaptain = team.players[0];

	// Create an object to store games by week
	const gamesByWeek = {};

	// Iterate through the games and organize them by week
	gamesMade.forEach((game) => {
		const week = game.week;

		if (!gamesByWeek[week]) {
			gamesByWeek[week] = [];
		}

		gamesByWeek[week].push(game);
	});

	// Now gamesByWeek is an object where each key represents a week and the value is an array of games for that week
	const isTeamCaptain =
		user._id === teamCaptain.user || user.name === teamCaptain.playerName;

	const [teamsToRemove, setTeamsToRemove] = useState(
		team.division.teamsWithSchedule ? team.division.teamsWithSchedule : []
	);

	const [otherTeams, setOtherTeams] = useState(
		team.division.teamsWithSchedule ? team.division.teamsWithSchedule : []
	);

	const [selectedGames, setSelectedGames] = useState([]);
	const [isLoader, setIsLoader] = useState(false);

	const [open, setOpen] = useState(false);

	const handleGameSelect = (
		weekNumber,
		gameIndex,
		opponentTeam,
		team,
		time,
		date
	) => {
		if (teamsToRemove[0]?._id === opponentTeam) {
			const prevTeamsToRemove = teamsToRemove.filter((team) => {
				return team._id !== opponentTeam;
			});

			setTeamsToRemove(prevTeamsToRemove);
		}

		let selectedGame;

		if (date !== "") {
			const convertedDate = convertToEST(new Date(date));
			const formattedDate = format(convertedDate, "MMMM do");
			selectedGame = {
				team: team,
				week: weekNumber,
				index: gameIndex,
				opponentTeam: opponentTeam,
				status: true,
				time: time,
				date: formattedDate,
			};
		} else {
			selectedGame = {
				team: team,
				week: weekNumber,
				index: gameIndex,
				opponentTeam: opponentTeam,
				status: true,
				time: time,
			};
		}

		// Check if the game is already selected for the same week, if yes, remove it; otherwise, add it
		const isGameSelectedInWeek = selectedGames.some(
			(game) => game.week === selectedGame.week
		);

		if (isGameSelectedInWeek) {
			const FilteredGamesWithHomeTeamsSelected = gamesMade.filter((game) => {
				if (game.week === selectedGame.week) {
					return game.homeTeam?._id;
				}
			});
			const teamToRemove = FilteredGamesWithHomeTeamsSelected.find((game) => {
				return selectedGames.some((selected) => {
					return (
						selected.opponentTeam === game.homeTeam._id &&
						selected.status === true &&
						selected.week === selectedGame.week
					);
				});
			});

			if (teamToRemove) {
				if (teamToRemove.homeTeam._id !== teamsToRemove[0]?._id) {
					// The home team is in the otherTeams array
					const teamToAdd = otherTeams.find(
						(team) => team._id === teamToRemove.homeTeam._id
					);

					const prevTeamsToRemove = teamsToRemove.filter((team) => {
						return team._id !== opponentTeam;
					});
					setTeamsToRemove([teamToAdd, ...prevTeamsToRemove]);
					if (selectedGames.length === 7) {
						const updatedSelectedGames = selectedGames.filter((game) => {
							if (game.week !== 7) {
								return game.week !== 7;
							} else {
								return game.week !== 6;
							}
						});
						setSelectedGames(updatedSelectedGames);
					}
				}
			}

			setSelectedGames((prevSelectedGames) =>
				prevSelectedGames.filter((game) => game.week !== selectedGame.week)
			);
		}
		// Check if opponent team is already selected for a different week, if yes, remove it; otherwise, add it
		if (opponentTeam !== "") {
			const isOpponentSelectedInSchedule = selectedGames.some((game) => {
				return game.opponentTeam === selectedGame.opponentTeam;
			});

			if (isOpponentSelectedInSchedule) {
				setSelectedGames((prevSelectedGames) =>
					prevSelectedGames.filter(
						(game) => game.opponentTeam !== selectedGame.opponentTeam
					)
				);
			}
		}

		setSelectedGames((prevSelectedGames) => [
			...prevSelectedGames,
			selectedGame,
		]);
	};
	const handleGameDeselect = (gameId) => {
		const potentialTeamToAdd = selectedGames.find(
			(game) => game.index === gameId
		);

		const teamToAdd = otherTeams.find(
			(team) => team._id === potentialTeamToAdd.opponentTeam
		);
		if (teamToAdd) {
			setTeamsToRemove([teamToAdd, ...teamsToRemove]);
		}
		const filteredSelectedGames = selectedGames.filter(
			(game) => game.index !== gameId
		);
		setSelectedGames(filteredSelectedGames);
	};

	const handleSubmitGameSchedule = async () => {
		setIsLoader(true);
		const res = await fetch("/api/update-team-schedule", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				addedGames: selectedGames,
				teamId: team._id,
				divisionId: team.division._id,
				otherTeamsCount: otherTeams.length,
			}),
		});
		if (res.ok) {
			const data = await res.json(); // Parse the JSON once

			if (data.updated) {
				setIsLoader(false);
				router.push(`/teams/team/${team._id}`); // Use router.push instead of redirect
			} else {
				const { teamAddedFirst } = data;
				setGamesMade(teamAddedFirst.division.games);
				setOtherTeams(
					teamAddedFirst.division.teamsWithSchedule
						? teamAddedFirst.division.teamsWithSchedule
						: []
				);
				setTeamsToRemove(
					teamAddedFirst.division.teamsWithSchedule
						? teamAddedFirst.division.teamsWithSchedule
						: []
				);
				setSelectedGames([]);
				setOpen(true);
			}
		}
	};

	// Generate calendar for weeks 1 to 7
	const calendar = Array.from({ length: 7 }, (_, index) => index + 1);
	const selectedWeeks = selectedGames.map((game) => game.week);
	const allWeeks = [1, 2, 3, 4, 5, 6, 7];

	const missingWeeks = allWeeks.filter((week) => !selectedWeeks.includes(week));

	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Call handleResize on initial mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const sortedMissingWeeks = missingWeeks.sort(
			(weekA, weekB) => weekA - weekB
		);
		const scrollToGame = gamesMade.find(
			(game) => game.week === sortedMissingWeeks[0]
		);
		if (teamsToRemove.length > 0) {
			const teamElement = document.getElementById(`${teamsToRemove[0]._id}`);
			const container = teamElement?.closest(".teamContainer"); // Replace with the class or reference to your container
			if (isSmallScreen) {
				container?.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "center",
				});
			} else {
				container?.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "center",
				});
			}
		} else {
			const weekElement = document.getElementById(`week-${scrollToGame?.week}`);

			if (isSmallScreen) {
				const offset = -200; // set the desired offset in pixels

				const targetScrollPosition = weekElement?.offsetTop - offset;
				if (targetScrollPosition) {
					window.scrollTo({
						top: targetScrollPosition,
						behavior: "smooth",
					});
				} else {
					const addSchedule = document.getElementById(`addSchedule`);
					addSchedule?.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "center",
					});
				}
			} else {
				weekElement?.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "center",
				});
			}
		}
	}, [missingWeeks, gamesMade, teamsToRemove, isSmallScreen]);

	const convertMilitaryToRegularTime = (militaryTime) => {
		if (militaryTime) {
			// Parse the military time
			const [hours, minutes] = militaryTime.split(":").map(Number);

			// Determine whether it's morning or afternoon
			const period = hours < 12 ? "AM" : "PM";

			// Convert hours to 12-hour format
			const regularHours = hours % 12 || 12;

			// Format the result
			const regularTime = `${regularHours}:${String(minutes).padStart(
				2,
				"0"
			)} ${period}`;

			return regularTime;
		}
	};

	return (
		<div className="font-barlow ">
			<h3 className="text-center">Division: {team.division.divisionName}</h3>
			<h6 className="my-2 text-center">
				{team.division.day} @ {team.division.location} from{" "}
				{convertMilitaryToRegularTime(team.division.startTime)} -{" "}
				{convertMilitaryToRegularTime(team.division.endTime)}
			</h6>

			<Separator className="my-3 border border-neutral-500 sm:my-12" />
			{scheduleAvailable ? (
				// if division has 6 teams or more
				<>
					{isTeamCaptain ? (
						// show schedule for team captain
						<>
							<p className="my-4 text-4xl font-semibold uppercase">
								Every team must play every other team once.
							</p>
							<div className="relative">
								{teamsToRemove.length > 0 && (
									<Alert
										variant="destructive"
										className="border-primary  bg-neutral-900"
									>
										<div className="flex items-center gap-2">
											<AlertCircle />
											<AlertTitle>
												Since you were not the first team to select your
												schedule times, you must play the following team(s):
											</AlertTitle>
										</div>

										<Separator className="z-10 mt-4 border border-neutral-500" />
										<AlertDescription>
											<div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
												{teamsToRemove.map((team, index) => {
													return (
														<article key={index} className="text-lg">
															<pre
																className={`${
																	index === 0 &&
																	"text-primary text-3xl font-semibold"
																}`}
															>
																{team.teamName}
															</pre>
														</article>
													);
												})}
											</div>
										</AlertDescription>
									</Alert>
								)}
								<div className="my-20">
									{Object.keys(gamesByWeek).map((week) => {
										const gamesTaken = gamesByWeek[week].filter((game) => {
											if (game.homeTeam && game.awayTeam) {
												return game;
											}
										});
										let gamesTakenString;
										if (gamesTaken.length > 0) {
											gamesTakenString = (
												<span>
													{gamesTaken.length === 3
														? gamesTaken
																.map((game, i) =>
																	i === 2
																		? `${convertMilitaryToRegularTime(
																				game.time
																			)}`
																		: `${convertMilitaryToRegularTime(
																				game.time
																			)}, `
																)
																.join(" and ")
														: gamesTaken.length === 2
															? gamesTaken
																	.map((game, i) =>
																		i === 1
																			? `${convertMilitaryToRegularTime(
																					game.time
																				)}`
																			: `${convertMilitaryToRegularTime(
																					game.time
																				)} and `
																	)
																	.join(" ")
															: convertMilitaryToRegularTime(
																	gamesTaken[0]?.time
																)}
												</span>
											);
										}

										return (
											<div
												id={`week-${week}`}
												key={`week-${week}`}
												className="teamContainer mb-10"
											>
												<h2 className="mb-4 flex items-center gap-5">
													{`Game ${week}`}{" "}
													{gamesTaken.length > 0 && (
														<span className="text-lg">
															Time slots {gamesTakenString} are full and
															excluded from the list
														</span>
													)}
												</h2>
												<div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
													{gamesByWeek[week].map((game) => {
														const [startHours, startMinutes] = game.time
															.split(":")
															.map(Number);
														const gameEndTime = `${String(
															startHours + 1
														).padStart(2, "0")}:${startMinutes}`;

														const isGameSelected = selectedGames.find(
															(selectedGame) => {
																return selectedGame.index === game._id;
															}
														);
														let alreadySelectedTeam;
														if (teamsToRemove.length === 0) {
															alreadySelectedTeam = selectedGames.find(
																(selectedGame) => {
																	return (
																		selectedGame.opponentTeam ===
																		game.homeTeam?._id
																	);
																}
															)?.week;
														}

														const date = convertToEST(new Date(game.date));
														const formattedDate = format(date, "MMMM do");

														if (game.homeTeam && game.awayTeam) {
															return;
														}

														return (
															<article
																id={
																	game.homeTeam && game.awayTeam
																		? undefined
																		: `${game.homeTeam?._id}`
																}
																key={`game-${game._id}-${game.week}`}
																className={`flex flex-col rounded border ${
																	selectedGames.some(
																		(selectedGame) =>
																			selectedGame.index === game._id
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
																				primary={
																					game.homeTeam
																						? game.homeTeam.primaryColor
																						: ""
																				}
																				secondary={
																					game.homeTeam
																						? game.homeTeam.secondaryColor
																						: ""
																				}
																				tertiary={
																					game.homeTeam
																						? game.homeTeam.tertiaryColor
																						: ""
																				}
																				width={45}
																				height={44}
																				circleHeight={4}
																				circleWidth={4}
																			/>

																			<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
																				{game.homeTeam
																					? game.homeTeam?.teamName
																					: "Home Team"}
																			</span>
																		</div>

																		{/* division / time / location */}
																		<div className="font-barlow flex flex-col justify-center py-4 text-center uppercase">
																			<div className="mb-4 flex justify-center">
																				<p className="w-fit rounded bg-neutral-600 px-2 py-1 text-center text-xs">
																					{team.division.divisionName}
																				</p>
																			</div>
																			<p className="text-center text-lg">
																				{formattedDate}
																			</p>
																			<p className="text-center text-3xl">{`${convertMilitaryToRegularTime(
																				game.time
																			)}`}</p>
																		</div>

																		{/* away team */}
																		<div className="flex flex-col items-center gap-[10px] p-4">
																			<TeamLogo
																				primary={
																					game.awayTeam
																						? game.awayTeam.primaryColor
																						: ""
																				}
																				secondary={
																					game.awayTeam
																						? game.awayTeam.secondaryColor
																						: ""
																				}
																				tertiary={
																					game.awayTeam
																						? game.awayTeam.tertiaryColor
																						: ""
																				}
																				width={45}
																				height={44}
																				circleHeight={4}
																				circleWidth={4}
																			/>
																			<span className="font-barlow flex items-center justify-center text-center align-middle text-sm transition hover:opacity-80 lg:h-10">
																				{game.awayTeam
																					? game.awayTeam?.teamName
																					: "Away Team"}
																			</span>
																		</div>
																	</div>
																</div>

																{/* Select button */}
																{game.homeTeam && game.awayTeam ? (
																	<div className="flex p-4">
																		<Button className="w-full " disabled>
																			Taken
																		</Button>
																	</div>
																) : (
																	<div className="flex p-4">
																		{isGameSelected ? (
																			<Button
																				onClick={() =>
																					handleGameDeselect(game._id)
																				}
																				className="w-full "
																			>
																				Deselect
																			</Button>
																		) : (
																			<>
																				{teamsToRemove[0]?._id ===
																				game.homeTeam?._id ? (
																					<Button
																						className="bg-primary hover:bg-primaryDark w-full text-white "
																						onClick={() =>
																							handleGameSelect(
																								game.week,
																								game._id,
																								game.homeTeam
																									? game.homeTeam?._id
																									: "",
																								team._id,
																								game.time,
																								game.date || ""
																							)
																						}
																					>
																						Select
																					</Button>
																				) : (
																					<Button className="w-full " disabled>
																						{teamsToRemove.length !== 0
																							? `Please select a ${teamsToRemove[0]?.teamNameShort}
																				Game Next`
																							: `You selected this team for game ${alreadySelectedTeam}`}
																					</Button>
																				)}
																			</>
																		)}
																	</div>
																)}
															</article>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							</div>

							{selectedGames.length > 6 && teamsToRemove.length === 0 ? (
								<Sheet>
									<SheetTrigger asChild>
										<Button className="w-full" id="addSchedule">
											Add Schedule
										</Button>
									</SheetTrigger>
									<SheetContent
										side={isSmallScreen ? "bottom" : "right"} // Use dynamic side based on screen size
										className={`w-full bg-neutral-900 ${
											isSmallScreen ? "h-[85%]" : ""
										}`}
									>
										<SheetHeader>
											<SheetTitle className="font-barlow text-center text-4xl uppercase underline">
												Summary
											</SheetTitle>
											<h4 className="text-center">
												Division: {team.division.divisionName}
											</h4>
											<h6 className="my-2 text-center">
												{team.division.day} @ {team.division.location} from{" "}
												{convertMilitaryToRegularTime(team.division.startTime)}{" "}
												- {convertMilitaryToRegularTime(team.division.endTime)}
											</h6>
										</SheetHeader>

										<ul className="my-10">
											{selectedGames
												.sort((gameA, gameB) => gameA.week - gameB.week)
												.map((game) => {
													return (
														<li key={game.week} className="my-2 py-1 text-xl">
															Game {game.week} at{" "}
															{convertMilitaryToRegularTime(game.time)}{" "}
															{game.date && `on ${game.date}`}
														</li>
													);
												})}
										</ul>

										<SheetFooter className="mt-10">
											<div className="flex w-full flex-col gap-5">
												<SheetClose asChild>
													<Button
														id="addScheduleButton"
														className="w-full "
														onClick={handleSubmitGameSchedule}
													>
														{isLoader ? (
															<Loader2 className="mr-2 h-4 w-4 animate-spin" />
														) : (
															"Add Schedule"
														)}
													</Button>
												</SheetClose>
												<SheetClose asChild>
													<Button>Back</Button>
												</SheetClose>
											</div>
										</SheetFooter>
									</SheetContent>
								</Sheet>
							) : (
								<>
									{teamsToRemove.length === 0 ? (
										<Alert
											variant="destructive"
											className="border-primary sticky top-32 z-10 bg-neutral-900"
										>
											<div className="flex items-center gap-2">
												<AlertCircle />
												<AlertTitle>
													You are missing the following game(s) in your
													schedule:
												</AlertTitle>
											</div>

											<Separator className="z-10 mt-4 border border-neutral-500" />
											<AlertDescription>
												<div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
													{/* Display missing weeks */}
													{missingWeeks.map((week) => (
														<article
															key={`missing-${week}`}
															className="text-lg"
														>
															<pre>Game {week}</pre>
														</article>
													))}
												</div>
											</AlertDescription>
										</Alert>
									) : (
										<Alert
											variant="destructive"
											className="border-primary sticky top-32 z-10 bg-neutral-900"
										>
											<div className="flex items-center gap-2">
												<AlertCircle />
												<AlertTitle>
													You must play the following team(s):
												</AlertTitle>
											</div>

											<Separator className="z-10 mt-4 border border-neutral-500" />
											<AlertDescription>
												<div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
													{teamsToRemove.map((team, index) => {
														return (
															<article key={index} className="text-lg">
																<pre>{team.teamName}</pre>
															</article>
														);
													})}
												</div>
											</AlertDescription>
										</Alert>
									)}
								</>
							)}

							<Dialog open={open} onOpenChange={setOpen}>
								<DialogContent className=" bg-neutral-800 text-neutral-50 sm:max-w-md">
									<DialogHeader className="text-center">
										<DialogTitle className="text-primary flex items-center justify-center gap-1 text-center text-3xl">
											Oops... It looks like team{" "}
											{otherTeams[otherTeams.length - 1]?.teamName} has selected
											their schedule before you.
										</DialogTitle>
										<DialogDescription className="text-center text-sm md:text-lg">
											Please select your schedule again. We apologize for the
											inconvenience.
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
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
						This division does not have the schedules available yet. Please come
						back later.
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
};

export default ChooseSchedule;
