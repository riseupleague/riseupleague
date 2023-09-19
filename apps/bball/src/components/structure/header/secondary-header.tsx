import { getAllUpcomingGames } from "@/src/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/src/api-helpers/utils";
import Link from "next/link";
import React from "react";
import WinnerIcon from "@/public/images/winner-icon.png";
import Image from "next/image";

export default async function SecondaryHeader(): Promise<React.JSX.Element> {
	await connectToDatabase();
	const res = await getAllUpcomingGames();
	const { allUpcomingGames } = await res.json();

	const sampleGames = allUpcomingGames.slice(0, 5);

	return (
		<section className="font-oswald flex items-center border border-x-neutral-900 border-y-neutral-600">
			{sampleGames.map((game) => {
				const homeTeamWon = game.homeTeamScore > game.awayTeamScore;

				const gameDate = new Date(game.date).toLocaleDateString("en-US", {
					timeZone: "America/Toronto",
					month: "short",
					day: "2-digit",
				});

				const dayName = new Date(game.date).toLocaleDateString("en-US", {
					timeZone: "America/Toronto",
					weekday: "short",
				});

				return (
					<article className="bg-secondary flex h-full items-center border-r border-neutral-600">
						{/* date */}
						<div className="bg-secondary flex h-full flex-col items-center gap-1 p-[18px] text-xs uppercase">
							<div className="font-semibold">{dayName}</div>
							<div>{gameDate}</div>
						</div>

						{/* game stats */}
						<div className="flex w-fit flex-col bg-neutral-900 pb-2 pl-[22px] pr-[11px] pt-[18px] uppercase">
							<h4 className="mb-[6px]">FINAL</h4>

							{/* home */}
							<Link
								href={`/teams/${game.homeTeam}`}
								className="mb-[9px] flex w-fit gap-[100px] font-bold transition hover:underline"
							>
								<p>{game.homeTeam.slice(0, 4)}...</p>
								<p className="flex items-center gap-2">
									{game.homeTeamScore}
									{homeTeamWon && (
										<Image
											src={WinnerIcon.src}
											alt="Winner icon"
											width={100}
											height={100}
											className="h-3 w-auto"
										/>
									)}
								</p>
							</Link>

							{/* away */}
							<Link
								href={`/teams/${game.awayTeam}`}
								className="mb-[7px] flex w-fit gap-[100px] font-bold transition hover:underline"
							>
								<h5>{game.awayTeam.slice(0, 4)}...</h5>
								<p className="flex items-center gap-2">
									{game.awayTeamScore}{" "}
									{!homeTeamWon && (
										<Image
											src={WinnerIcon.src}
											alt="Winner icon"
											width={100}
											height={100}
											className="h-3 w-auto"
										/>
									)}
								</p>
							</Link>

							{/* division */}
							<Link
								href={`/standings?division=${game.division}`}
								className="text-primary w-fit font-semibold uppercase transition hover:underline"
							>
								{game.division.slice(0, 4)}...
							</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
}
