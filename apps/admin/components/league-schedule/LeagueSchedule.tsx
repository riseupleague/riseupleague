"use client";

import { useState } from "react";
import FilterBySeason from "../filters/FilterBySeason";
import { redirect } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";

import { Label } from "@ui/components/label";
import { Button } from "@ui/components/button";
import Link from "next/link";

const LeagueSchedule = ({ seasons, currentSeason, divisions }) => {
	const [season, setSeason] = useState(currentSeason);
	// Iterate through the divisions array
	const divisionsByCity = {};

	divisions.forEach((division) => {
		// Check if the city already exists as a key in divisionsByCity
		if (divisionsByCity.hasOwnProperty(division.city)) {
			// If the city exists, push the division to its corresponding array
			divisionsByCity[division.city].push(division);
		} else {
			// If the city doesn't exist, create a new array with the division and assign it to the city key
			divisionsByCity[division.city] = [division];
		}
	});

	const handleSeasonChange = (e) => {
		const season = seasons.find((season) => season._id === e);
		setSeason(season);

		redirect(`/league-schedule/${season._id}`);
	};

	return (
		<section>
			<div className="flex flex-col">
				<div className="mb-5 mt-10 w-full space-y-2">
					<Label>Filter By Season:</Label>
					<FilterBySeason
						currentSeason={season}
						seasons={seasons}
						handleSeasonChange={handleSeasonChange}
					/>
				</div>

				<h2 className="mb-8 text-center">Divisions</h2>

				{divisions?.length > 0 ? (
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{
							// Render divisions grouped by city
							Object.keys(divisionsByCity).map((city) => (
								<div key={city}>
									<p className="my-2 text-center uppercase">{city}</p>

									<ul className="grid grid-cols-1 gap-2 ">
										{divisionsByCity[city].map((division) => {
											let games = division.games.length;
											let divisionColour;

											if (games > 0) divisionColour = "text-green-500";
											else divisionColour = "text-primary";

											return (
												<Button
													key={division._id}
													variant="secondary"
													className="text-base lg:text-lg"
													asChild
												>
													<Link
														href={`/league-schedule/${season._id}/${division._id}`}
													>
														{division.divisionName}&nbsp;
														<span
															className={`${divisionColour} capitalize`}
														>{`(${games > 0 ? "games created" : "no games"})`}</span>
													</Link>
												</Button>
											);
										})}
									</ul>
								</div>
							))
						}
					</div>
				) : (
					<div className="text-center">
						<h3 className="text-primary my-8">
							No divisions created in this season yet.
						</h3>
					</div>
				)}
			</div>
		</section>
	);
};

export default LeagueSchedule;
