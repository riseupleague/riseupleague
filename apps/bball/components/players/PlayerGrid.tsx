"use client";

import { Input } from "@ui/components/input";
import PlayerCard from "@/components/players/PlayerCard";
import { useState } from "react";

export default function PlayerGrid({ allPlayers }) {
	const [players, setPlayers] = useState(allPlayers);
	const playersPerPage = 50;
	const totalPlayers = players.length;

	const totalPages = Math.ceil(totalPlayers / playersPerPage);
	const [page, setPage] = useState(1);

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

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();

		// empty search
		if (searchValue === "") return setPlayers(allPlayers);

		const filteredPlayers = allPlayers.filter((player) =>
			player.playerName.toLowerCase().includes(searchValue)
		);

		setPlayers(filteredPlayers);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-between sm:flex-row">
				<Input
					type="search"
					onChange={handleSearch}
					placeholder="Search Player"
					className="font-barlow my-8 rounded border border-neutral-600 bg-neutral-700 px-4 py-3 text-lg sm:w-1/4"
				/>
				{/* Pagination Controls */}

				{totalPages > 1 && (
					<div className="font-barlow my-8 flex space-x-6 text-xl">
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

			{/* Display Players for the Current Page */}
			{currentPlayers?.length > 0 ? (
				<div className="grid grid-cols-1 ">
					<article className="font-barlow flex justify-between rounded-t-lg border border-neutral-600 bg-neutral-500 px-4 py-2 ">
						<div className="grid w-3/4 grid-cols-2 items-center gap-1">
							<div className="flex items-center gap-2">
								<div className="font-barlow text-sm uppercase transition hover:opacity-80 sm:text-lg">
									Name
								</div>
							</div>
							<div className="font-barlow text-sm uppercase transition hover:opacity-80 sm:text-lg">
								Team
							</div>
						</div>
						<div className="grid w-1/4 grid-cols-2 items-center justify-items-center gap-4">
							<p className="text-sm  uppercase sm:text-lg">Jersey</p>
							<p className="font-barlow text-sm uppercase transition hover:opacity-80 sm:text-lg">
								Division{" "}
							</p>
						</div>
					</article>
					{currentPlayers
						.sort((a, b) =>
							a.playerName.toLowerCase() > b.playerName.toLowerCase() ? 1 : -1
						)
						.map((player, index) => (
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
