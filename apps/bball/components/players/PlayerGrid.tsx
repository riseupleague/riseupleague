"use client";

import { useState } from "react";

export default function PlayerGrid({ allPlayers }) {
	const [players, setPlayers] = useState(allPlayers);

	const handleSearch = (e) => {
		const searchValue = e.target.value;

		// empty search
		if (searchValue === "") return setPlayers(allPlayers);

		setPlayers(
			players.filter((player) =>
				player.playerName.toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	};

	return (
		<>
			{players.length > 0 ? (
				// <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 2xl:grid-cols-4">
				<div className="flex flex-col">
					{players.map((player, index) => (
						// <PlayerCard player={player} key={index} />
						<ul className="flex gap-4" key={index}>
							<li>{player.playerName}</li>
							<li>{player.team.teamName}</li>
							<li>{player.jerseyNumber}</li>
							<li>{player.division.divisionName}</li>
						</ul>
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
