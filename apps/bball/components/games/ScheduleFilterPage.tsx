import CalendarGames from "./CalendarGames";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ScheduleCard from "./ScheduleCard";
import { Separator } from "@ui/components/separator";

export default function ScheduleFilterPage({ gamesByDate, linkDate }) {
	// const [showDetails, setShowDetails] = useState(false);
	const gameSchedule = gamesByDate.length > 0 ? gamesByDate[0] : {};
	console.log(gamesByDate);
	const date = new Date(linkDate * 1000).toLocaleDateString("en-US", {
		timeZone: "America/Toronto",
		month: "short",
		day: "2-digit",
		weekday: "long",
	});

	console.log("date:", date);

	return (
		<div className="relative ">
			<div className="">
				{/* <CalendarGames showDetailsHandle={showDetailsHandle} /> */}
				<CalendarGames linkDate={linkDate} />
			</div>

			{Object.keys(gameSchedule).length > 0 && (
				<div>
					<h3
						style={{ borderColor: "#292929" }}
						className="w-full  border-b bg-neutral-900 py-10 text-xl text-white "
					>
						{gameSchedule.date}
					</h3>
					<Separator className="my-5" />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						{gameSchedule.games?.map((game) => {
							const isoDate = game.date;
							const date = new Date(isoDate);

							// Assuming 'America/Toronto' is the target time zone
							const timeZone = "America/Toronto";
							const zonedDate = utcToZonedTime(date, timeZone);

							const time = format(zonedDate, "h:mm a");

							return <ScheduleCard game={game} key={game._id} />;
						})}
					</div>
				</div>
			)}

			{Object.keys(gameSchedule).length === 0 && (
				<h4 className=" mt-16  text-2xl text-white">
					No games scheduled for {date}
				</h4>
			)}
		</div>
	);
}

// "use client";

// import { useState, useEffect } from "react";
// import FilterByDivision from "../filters/FilterByDivision";
// import FilterByTeam from "../filters/FilterByTeam";
// import ScheduleCard from "./ScheduleCard";
// import FilterAll from "../filters/FilterAll";
// import { Button } from "@ui/components/button";
// import CloseX from "../general/icons/CloseX";

// export default function ScheduleFilterPage({
// 	gamesByDate,
// 	divisionsNameAndId,
// 	teamsNameDivisionAndId,
// 	divisionParams,
// 	teamsParams,
// 	initialDivisionCheckboxState,
// 	initialTeamCheckboxState,
// }) {
// 	const [allGames, setAllGames] = useState(gamesByDate);
// 	const [teamCheckboxState, setTeamCheckboxState] = useState(
// 		initialTeamCheckboxState
// 	);
// 	const [divisionCheckboxState, setDivisionCheckboxState] = useState(
// 		initialDivisionCheckboxState
// 	);

// 	const [closeDivisions, setCloseDivisions] = useState(divisionParams);
// 	const [closeTeams, setCloseTeams] = useState(teamsParams);

// 	// Use a useEffect to handle filtering when selectedDivisions or selectedTeams change
// 	useEffect(() => {
// 		// Use the selected divisions and teams to filter gamesByDate

// 		if (closeDivisions.length !== 0 || closeTeams.length !== 0) {
// 			const filteredGamesByDate = gamesByDate.map((dateObject) => ({
// 				...dateObject,
// 				games: dateObject.games.filter((game) => {
// 					// Check if the game's division ID is in the selected divisions array
// 					const divisionMatch = closeDivisions.includes(
// 						game.division.divisionName
// 					);

// 					// Check if the game's team ID (awayTeam or homeTeam) is in the selected teams array
// 					const teamMatch =
// 						closeTeams.includes(game.awayTeam.teamName) ||
// 						closeTeams.includes(game.homeTeam.teamName);

// 					// Return the game if it matches either the selected divisions or selected teams
// 					return divisionMatch || teamMatch;
// 				}),
// 			}));

// 			setAllGames(filteredGamesByDate);
// 		}
// 	}, []);

// 	const handleFilterChange = ({ divisions, teams }) => {
// 		// Use the selected divisions and teams to filter gamesByDate
// 		const selectedTeams = Object.keys(teams).filter((teamId) => teams[teamId]);
// 		const selectedDivisions = Object.keys(divisions).filter(
// 			(divisionId) => divisions[divisionId]
// 		);

// 		setCloseDivisions(selectedDivisions);
// 		setCloseTeams(selectedTeams);

// 		// Construct the query parameters for the URL
// 		const queryParams = [];
// 		if (selectedDivisions.length > 0) {
// 			queryParams.push(`divisions=${selectedDivisions.join(",")}`);
// 		}
// 		if (selectedTeams.length > 0) {
// 			queryParams.push(`teams=${selectedTeams.join(",")}`);
// 		}

// 		// Update the URL with the query parameters
// 		const newUrl =
// 			queryParams.length > 0 ? `/games?${queryParams.join("&")}` : "/games";
// 		window.history.pushState({}, "", newUrl);

// 		if (selectedTeams.length === 0 && selectedDivisions.length === 0) {
// 			setAllGames(gamesByDate);
// 		} else {
// 			const filteredGamesByDate = gamesByDate.map((dateObject) => ({
// 				...dateObject,
// 				games: dateObject.games.filter((game) => {
// 					// Check if the game's division ID is in the selected divisions array
// 					const divisionMatch = selectedDivisions.includes(
// 						game.division.divisionName
// 					);

// 					// Check if the game's team ID (awayTeam or homeTeam) is in the selected teams array
// 					const teamMatch =
// 						selectedTeams.includes(game.awayTeam.teamName) ||
// 						selectedTeams.includes(game.homeTeam.teamName);

// 					// Return the game if it matches either the selected divisions or selected teams
// 					return divisionMatch || teamMatch;
// 				}),
// 			}));

// 			// Now, filteredGamesByDate contains the filtered games
// 			setDivisionCheckboxState(divisions);

// 			setAllGames(filteredGamesByDate);
// 		}
// 	};

// 	const handleDivisionClick = (divisionId) => {
// 		const updatedDivisionState = {
// 			...divisionCheckboxState,
// 			[divisionId]: false,
// 		};

// 		setDivisionCheckboxState(updatedDivisionState);
// 		handleFilterChange({
// 			divisions: updatedDivisionState,
// 			teams: teamCheckboxState,
// 		});
// 	};

// 	const handleTeamClick = (teamId) => {
// 		const updatedTeamState = {
// 			...teamCheckboxState,
// 			[teamId]: false,
// 		};
// 		setTeamCheckboxState(updatedTeamState);
// 		handleFilterChange({
// 			divisions: divisionCheckboxState,
// 			teams: updatedTeamState,
// 		});
// 	};

// 	return (
// 		<div>
// 			<div className="mb-10 flex flex-col gap-5 md:flex-row">
// 				<FilterAll
// 					divisions={divisionsNameAndId}
// 					teams={teamsNameDivisionAndId}
// 					onFilterChange={handleFilterChange}
// 					teamCheckboxState={teamCheckboxState}
// 					divisionCheckboxState={divisionCheckboxState}
// 					setTeamCheckboxState={setTeamCheckboxState}
// 					setDivisionCheckboxState={setDivisionCheckboxState}
// 				/>
// 			</div>
// 			<div className="flex flex-wrap space-x-2">
// 				{closeDivisions.map((division) => (
// 					<Button
// 						variant="outline"
// 						size="sm"
// 						key={division}
// 						onClick={() => handleDivisionClick(division)}
// 						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
// 					>
// 						<CloseX /> {division}
// 					</Button>
// 				))}
// 				{closeTeams.map((team) => (
// 					<Button
// 						variant="outline"
// 						size="sm"
// 						key={team}
// 						onClick={() => handleTeamClick(team)}
// 						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
// 					>
// 						<CloseX /> {team}
// 					</Button>
// 				))}
// 			</div>
// 			{allGames?.map((games) => {
// 				if (games.games.length === 0) {
// 					// If there are no games for this date, return nothing
// 					return null;
// 				}
// 				return (
// 					<div key={games.date}>
// 						<h3 className="font-barlow mb-8 mt-16  text-2xl uppercase">
// 							{games.date}
// 						</h3>
// 						<hr className="my-4 border border-neutral-600" />
// 						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
// 							{games?.games.map((game, index) => {
// 								const isoDate = game.date;

// 								const date = new Date(isoDate);

// 								const time = date.toLocaleTimeString("en-US", {
// 									hour: "numeric",
// 									minute: "numeric",
// 									hour12: true,
// 								});
// 								return <ScheduleCard game={game} key={index} />;
// 							})}
// 						</div>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

{
	/* <li
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
			// whileHover={{ scale: 1.1 }}
			// whileTap={{ scale: 0.9 }}
		>
			Preview
		</Link>
	</div>
) : (
	<div className="flex w-full   flex-grow justify-center">
		<Link
			href={`/games/summary/${game._id}`}
			className="mt-5 w-10/12 rounded-full border px-12 py-2 text-center font-semibold hover:border-orange-500 sm:mt-0 sm:w-fit sm:rounded-none"
			// whileHover={{ scale: 1.1 }}
			// whileTap={{ scale: 0.9 }}
		>
			Summary
		</Link>
	</div>
)}
</li> */
}
