"use client";

import { Input } from "@ui/components/input";
import PlayerCard from "@/components/players/PlayerCard";
import { useState, useEffect } from "react";
import FilterAll from "../filters/FilterAll";
import { Button } from "@ui/components/button";
import CloseX from "../general/icons/CloseX";
export default function PlayerGrid({
	allPlayers,
	divisionsNameAndId,
	teamsNameDivisionAndId,
	divisionParams,
	teamsParams,
	initialDivisionCheckboxState,
	initialTeamCheckboxState,
}) {
	const [players, setPlayers] = useState(allPlayers);
	console.log(players);
	const playersPerPage = 50;
	const totalPlayers = players.length;

	const totalPages = Math.ceil(totalPlayers / playersPerPage);
	const [page, setPage] = useState(1);
	console.log(`Total Pages: ${totalPages}`);

	// Calculate the index range for the current page
	const startIndex = (page - 1) * playersPerPage;
	const endIndex = startIndex + playersPerPage;

	// Slice the players array to get the players for the current page
	const currentPlayers = players.slice(startIndex, endIndex);
	// Function to handle page change when "Previous" or "Next" buttons are clicked
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
		}
	};
	const [teamCheckboxState, setTeamCheckboxState] = useState(
		initialTeamCheckboxState
	);
	const [divisionCheckboxState, setDivisionCheckboxState] = useState(
		initialDivisionCheckboxState
	);

	const [closeDivisions, setCloseDivisions] = useState(divisionParams);
	const [closeTeams, setCloseTeams] = useState(teamsParams);

	// Use a useEffect to handle filtering when selectedDivisions or selectedTeams change
	useEffect(() => {
		// Use the selected divisions and teams to filter gamesByDate
		console.log("closeTeams:", closeTeams);

		if (closeDivisions.length !== 0 || closeTeams.length !== 0) {
			const filteredPlayers = allPlayers.filter((player) => {
				// Check if the player's division ID is in the selected divisions array
				const divisionMatch = closeDivisions.includes(
					player.division.divisionName
				);

				// Check if the player's team ID (awayTeam or homeTeam) is in the selected teams array
				const teamMatch = closeTeams.includes(player.teamName);

				// Return the player if it matches either the selected divisions or selected teams
				return divisionMatch || teamMatch;
			});

			console.log("filteredPlayers:", filteredPlayers);

			setPlayers(filteredPlayers);
		}
	}, []);

	const handleFilterChange = ({ divisions, teams }) => {
		// Use the selected divisions and teams to filter gamesByDate
		const selectedTeams = Object.keys(teams).filter((teamId) => teams[teamId]);
		const selectedDivisions = Object.keys(divisions).filter(
			(divisionId) => divisions[divisionId]
		);

		console.log("selectedDivisions:", selectedDivisions);
		setCloseDivisions(selectedDivisions);
		setCloseTeams(selectedTeams);

		// Construct the query parameters for the URL
		const queryParams = [];
		if (selectedDivisions.length > 0) {
			queryParams.push(`divisions=${selectedDivisions.join(",")}`);
		}
		if (selectedTeams.length > 0) {
			queryParams.push(`teams=${selectedTeams.join(",")}`);
		}

		// Update the URL with the query parameters
		const newUrl =
			queryParams.length > 0 ? `/players?${queryParams.join("&")}` : "/players";
		window.history.pushState({}, "", newUrl);

		if (selectedTeams.length === 0 && selectedDivisions.length === 0) {
			setPlayers(allPlayers);
		} else {
			const filteredPlayers = allPlayers.filter((player) => {
				// Check if the player's division ID is in the selected divisions array
				const divisionMatch = selectedDivisions.includes(
					player.division.divisionName
				);

				// Check if the player's team ID (awayTeam or homeTeam) is in the selected teams array
				const teamMatch = selectedTeams.includes(player.team.teamName);

				// Return the player if it matches either the selected divisions or selected teams
				return divisionMatch || teamMatch;
			});

			// Now, filteredGamesByDate contains the filtered games
			setDivisionCheckboxState(divisions);

			setPlayers(filteredPlayers);
		}
	};

	const handleDivisionClick = (divisionId) => {
		const updatedDivisionState = {
			...divisionCheckboxState,
			[divisionId]: false,
		};

		setDivisionCheckboxState(updatedDivisionState);
		handleFilterChange({
			divisions: updatedDivisionState,
			teams: teamCheckboxState,
		});
	};

	const handleTeamClick = (teamId) => {
		const updatedTeamState = {
			...teamCheckboxState,
			[teamId]: false,
		};
		setTeamCheckboxState(updatedTeamState);
		handleFilterChange({
			divisions: divisionCheckboxState,
			teams: updatedTeamState,
		});
	};

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();
		const filteredPlayers = [];

		// empty search
		if (searchValue === "") return setPlayers(allPlayers);

		for (const player of players) {
			// Check if the playerName or teamName contains the searchValue
			if (
				player.playerName.toLowerCase().includes(searchValue) ||
				player.team.teamName.toLowerCase().includes(searchValue)
			) {
				// Check if the player is not already in filteredPlayers
				if (!filteredPlayers.some((p) => p._id === player._id)) {
					filteredPlayers.push(player);
				}
			}
		}

		setPlayers(filteredPlayers);

		// Update the URL with the query parameters
		// const newUrl = `/players?search=${searchValue}`;
		// window.history.pushState({}, "", newUrl);
	};
	return (
		<>
			<div className="flex flex-col items-center justify-between sm:flex-row">
				<Input
					type="search"
					onChange={handleSearch}
					placeholder="Search Player"
					className="font-barlow my-8 rounded border border-neutral-600 bg-neutral-700 px-4 py-3 text-lg sm:w-1/6"
				/>
				{/* Pagination Controls */}

				{totalPages > 1 && (
					<div className="flex space-x-6">
						<div>
							<select
								value={page}
								className="mr-2 w-10 bg-neutral-900"
								onChange={(e) => handlePageChange(parseInt(e.target.value))}
							>
								{Array.from({ length: totalPages }, (_, index) => (
									<option key={index + 1} value={index + 1}>
										{index + 1}
									</option>
								))}
							</select>
							of {totalPages}
						</div>
						<button onClick={() => handlePageChange(page - 1)}>Previous</button>
						<button onClick={() => handlePageChange(page + 1)}>Next</button>
					</div>
				)}
			</div>
			<div className="mb-10 flex flex-col gap-5 md:flex-row">
				<FilterAll
					divisions={divisionsNameAndId}
					teams={teamsNameDivisionAndId}
					onFilterChange={handleFilterChange}
					teamCheckboxState={teamCheckboxState}
					divisionCheckboxState={divisionCheckboxState}
					setTeamCheckboxState={setTeamCheckboxState}
					setDivisionCheckboxState={setDivisionCheckboxState}
				/>
			</div>
			<div className="flex flex-wrap space-x-2">
				{closeDivisions.map((division) => (
					<Button
						variant="outline"
						size="sm"
						key={division}
						onClick={() => handleDivisionClick(division)}
						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
					>
						<CloseX /> {division}
					</Button>
				))}
				{closeTeams.map((team) => (
					<Button
						variant="outline"
						size="sm"
						key={team}
						onClick={() => handleTeamClick(team)}
						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
					>
						<CloseX /> {team}
					</Button>
				))}
			</div>

			{/* Display Players for the Current Page */}
			{currentPlayers?.length > 0 ? (
				<div className="grid grid-cols-1 ">
					<article className="font-barlow flex justify-between rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 ">
						<div className="grid w-3/4 grid-cols-2 items-center gap-1">
							<div className="flex items-center gap-2">
								<div className="font-barlow uppercase transition hover:opacity-80">
									Name
								</div>
							</div>
							<div className="font-barlow uppercase transition hover:opacity-80">
								Team
							</div>
						</div>
						<div className="grid w-1/4 grid-cols-2 items-center justify-items-center gap-4">
							<p className="text-sm">Jersey Number</p>
							<p className="font-barlow uppercase transition hover:opacity-80">
								Division{" "}
							</p>
						</div>
					</article>
					{currentPlayers.map((player, index) => (
						<PlayerCard player={player} key={index} />
					))}
				</div>
			) : (
				<div className="flex h-[50vh] items-center justify-center">
					<p className="font-barlow text-4xl uppercase">
						no search results found!
					</p>
				</div>
			)}
		</>
	);
}
