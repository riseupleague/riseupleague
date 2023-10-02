"use client";

import { Input } from "@ui/components/input";
import PlayerCard from "@/components/players/PlayerCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FilterByDivision from "../filters/FilterByDivision";
import FilterByTeam from "../filters/FilterByTeam";

type Query = {
	team?: string;
	division?: string;
};

export default function PlayerGrid({
	allPlayers,
	totalPages,
	page,
	team,
	division,
	divisionsNameAndId,
	teamsNameDivisionAndId,
}) {
	const router = useRouter();

	// Build the query string conditionally
	const query: Query = {};

	if (team !== "") {
		query.team = team;
	}

	if (division !== "") {
		query.division = division;
	}

	const handlePageInputChange = (e) => {
		// Update the selectedPage state as the user types
		const newUrl = `/players?page=${e.target.value}`;
		// Navigate to the new URL
		router.push(newUrl);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			// Handle the Enter key press
			const newUrl = `/players?search=${e.target.value}`;
			router.push(newUrl);
		} else if (e.key === "Escape") {
			// Handle the Escape key press (clearing the search)
			const newUrl = `/players`;
			router.push(newUrl);
		}
	};

	// Handle the select change event
	const handleDivisionChange = (event) => {
		const selectedDivisionId = event;
		const newUrl = `/players?division=${selectedDivisionId}&team=${teamsNameDivisionAndId[0]._id}`;
		router.push(newUrl);
	};

	const handleTeamChange = (event) => {
		const selectedTeamId = event;
		if (selectedTeamId !== "") {
			const newUrl = `/players?division=${division}&team=${selectedTeamId}`;
			router.push(newUrl);
		} else {
			const newUrl = `/players?division=${division}&team=`;
			router.push(newUrl);
		}
	};

	console.log("divisionsNameAndId:", divisionsNameAndId);

	return (
		<>
			<div className="flex flex-col items-center justify-between sm:flex-row">
				<Input
					type="search"
					// onChange={handleSearch}
					onKeyPress={handleKeyPress}
					placeholder="Search Player"
					className="font-barlow my-8 rounded border border-neutral-600 bg-neutral-700 px-4 py-3 text-lg sm:w-1/6"
				/>
				<FilterByDivision
					selectedDivision={division}
					handleDivisionChange={handleDivisionChange}
					divisions={divisionsNameAndId}
				/>
				<FilterByTeam
					selectedTeam={team}
					handleTeamChange={handleTeamChange}
					teams={teamsNameDivisionAndId}
				/>
				{totalPages > 0 && (
					<div className="flex space-x-6">
						<div>
							<select
								value={page}
								className="mr-2 w-10 bg-neutral-900"
								onChange={handlePageInputChange}
							>
								{
									Array.from({ length: totalPages }, (_, index) => (
										<option key={index + 1} value={index + 1}>
											{index + 1}
										</option>
									)) as JSX.Element[]
								}
							</select>
							of {totalPages}
						</div>
						<Link
							href={{
								pathname: "/players",
								query: { page: page > 1 ? page - 1 : 1, ...query },
							}}
						>
							Previous
						</Link>
						<Link
							href={{
								pathname: "/players",
								query: {
									page: page < totalPages ? page + 1 : totalPages,
									...query,
								},
							}}
						>
							Next
						</Link>
					</div>
				)}
			</div>
			{allPlayers?.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
					{allPlayers.map((player, index) => (
						<PlayerCard player={player} key={index} />
					))}
				</div>
			) : (
				<div className="flex h-[50dvh] items-center justify-center">
					<p className="font-barlow text-4xl uppercase">
						no search results found!
					</p>
				</div>
			)}
		</>
	);
}
