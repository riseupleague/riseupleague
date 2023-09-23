"use client";

import { useState } from "react";
import { Input } from "@ui/components/input";
import PlayerCard from "@/components/players/PlayerCard";

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
			<Input
				type="search"
				onChange={handleSearch}
				placeholder="Search Player"
				className="font-barlow my-8 rounded border border-neutral-600 bg-neutral-700 px-4 py-3 text-lg sm:w-1/6"
			/>
			{players.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
					{players.map((player, index) => (
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
