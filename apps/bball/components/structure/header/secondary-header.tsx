import { getAllUpcomingGames } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import Link from "next/link";
import React from "react";
import WinnerIcon from "@/public/images/winner-icon.png";
import Image from "next/image";

export default async function SecondaryHeader(): Promise<React.JSX.Element> {
	await connectToDatabase();
	const res = await getAllUpcomingGames();
	const { allUpcomingGames } = await res.json();

	const sampleGames = allUpcomingGames.reverse().slice(0, 5);

	return (
		<section className="font-oswald max-w-screen flex items-center overflow-auto border border-x-neutral-900 border-y-neutral-600">
			{sampleGames.map((game, index) => {
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
					<article
						className="bg-secondary flex max-h-[140px] items-center border-r border-neutral-600"
						key={index}
					>
						{/* date */}
						<div className="bg-secondary flex h-full flex-col items-center gap-1 p-[18px] text-center text-xs uppercase">
							<div className="font-semibold">{dayName}</div>
							<div>{gameDate}</div>
						</div>

						{/* game stats */}
						<div className="flex w-fit flex-col gap-2 bg-neutral-900 pb-2 pl-5 pr-2.5 pt-4 uppercase">
							<h4>FINAL</h4>

							{/* home */}
							<Link
								href={`/teams/${game.homeTeam.teamName}`}
								className="flex w-fit gap-[100px] font-bold transition hover:underline"
							>
								<p className="m-0">{game.homeTeam.teamNameShort}</p>
								<p className="m-0 flex items-center gap-2">
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
								href={`/teams/${game.awayTeam.teamName}`}
								className="flex w-fit gap-[100px] font-bold transition hover:underline"
							>
								<h5>{game.awayTeam.teamNameShort}</h5>
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
								href={`/standings?division=${game.division.divisionName}`}
								className="text-primary w-fit text-sm font-semibold uppercase transition hover:underline"
							>
								{game.division.divisionName}
							</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
}
