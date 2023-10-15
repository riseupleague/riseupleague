"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import WinnerIcon from "@/public/images/winner-icon.png";
import Image from "next/image";
export default function FutureGames({ separatedGames }): JSX.Element {
	const containerRef = useRef(null);

	const scrollLeft = () => {
		const container = containerRef.current;
		container.scrollTo({
			left: container.scrollLeft - container.offsetWidth,
			behavior: "smooth",
		});
	};

	const scrollRight = () => {
		const container = containerRef.current;
		container.scrollTo({
			left: container.scrollLeft + container.offsetWidth,
			behavior: "smooth",
		});
	};

	console.log(separatedGames);
	return (
		<div className="flex ">
			<button
				style={{ backgroundColor: "#16161A" }}
				className={` hidden px-3 text-gray-100 sm:block`}
				onClick={scrollLeft}
			>
				<svg
					className="h-6 w-6 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="#ffffff"
				>
					<path d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<div
				ref={containerRef}
				className="flex items-center overflow-auto xl:overflow-x-hidden"
			>
				{separatedGames.map((dateGroup, dateIndex) => (
					<article
						className="bg-secondary flex max-h-[140px] items-center border-r border-neutral-600"
						key={dateIndex}
					>
						{/* date */}
						<div className="bg-secondary flex h-full flex-col items-center gap-1 p-[18px] text-center text-xs uppercase">
							<h2>{dateGroup.date}</h2>
						</div>
						{dateGroup.games
							.sort((gameA, gameB) => {
								// Sort games based on their original date
								return new Date(gameA.date) - new Date(gameB.date);
							})
							.map((game, index) => {
								const homeTeamWon = game.homeTeamScore > game.awayTeamScore;
								let torontoTime;
								if (!game.status) {
									const dateStr = game.date;
									const date = new Date(dateStr);

									// Define the time zone you want to convert to (e.g., Toronto)
									const torontoTimeZone = "America/Toronto";

									// Convert the date to Toronto time
									torontoTime = date
										.toLocaleTimeString("en-US", {
											timeZone: torontoTimeZone,
											minute: "2-digit",
											hour: "numeric",
											hour12: true,
										})
										.replace(/ /g, "\u202F"); // Replace regular spaces with non-breaking spaces
								}

								return (
									<div
										key={index}
										className="flex w-fit flex-col gap-2 bg-neutral-900 px-5 pb-2 pt-4 uppercase"
									>
										<h4>{torontoTime ? torontoTime : "Final"}</h4>
										{/* home */}
										<Link
											href={`/teams/${game.homeTeam.teamName}`}
											className="flex w-full justify-between gap-[100px] font-bold transition hover:underline"
										>
											<p className="m-0">{game.homeTeam.teamNameShort}</p>
											{game.status ? (
												<p className="m-0 flex w-5 items-center gap-2">
													{game.homeTeamScore}
													{homeTeamWon && (
														<Image
															src={WinnerIcon.src}
															alt="Winner icon"
															width={540}
															height={480}
															style={{ objectFit: "contain" }}
															className="h-3 w-5"
														/>
													)}
												</p>
											) : (
												<p className="m-0 flex w-5 items-center gap-2"></p>
											)}
										</Link>
										{/* away */}
										<Link
											href={`/teams/${game.awayTeam.teamName}`}
											className="flex w-full justify-between gap-[100px] font-bold transition hover:underline"
										>
											<h5>{game.awayTeam.teamNameShort}</h5>

											{game.status ? (
												<p className="m-0 flex w-5 items-center gap-2">
													{game.awayTeamScore}
													{!homeTeamWon && (
														<Image
															src={WinnerIcon.src}
															alt="Winner icon"
															width={540}
															height={480}
															style={{ objectFit: "contain" }}
															className="h-3 w-5"
														/>
													)}
												</p>
											) : (
												<p className="m-0 flex w-5 items-center gap-2"></p>
											)}
										</Link>
										{/* division */}
										<Link
											href={`/standings?division=${game.division.divisionName}`}
											className="text-primary w-fit text-sm font-semibold uppercase transition hover:underline"
										>
											{game.division.divisionName}
										</Link>
									</div>
								);
							})}
					</article>
				))}
				<article className=" flex w-64 flex-1 items-center  justify-center px-5 sm:w-full">
					<Link href="/games">
						<span className="text-main font-semibold uppercase hover:underline">
							all games
						</span>
					</Link>
				</article>
			</div>
			<button
				style={{ backgroundColor: "#16161A" }}
				className={` hidden px-3 text-gray-100 sm:block`}
				onClick={scrollRight}
			>
				<svg
					className="h-6 w-6 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="#ffffff"
				>
					<path d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	);
}
