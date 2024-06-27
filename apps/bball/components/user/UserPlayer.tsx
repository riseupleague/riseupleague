"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { Button } from "@ui/components/button";
import UserPlayerInfo from "./UserPlayerInfo";
import UserPlayerGames from "./UserPlayerGames";
import UserPlayerRoster from "./UserPlayerRoster";
import { Card, CardHeader, CardTitle } from "@ui/components/card";
import { ChevronLeft } from "lucide-react";

const UserPlayer = ({ currentPlayers }) => {
	console.log(currentPlayers);

	const sortedPlayers = [...currentPlayers].sort((a, b) =>
		a.register > b.register ? 1 : -1
	);
	const [selectedPlayer, setSelectedPlayer] = useState(null);

	const handleSelectedPlayer = (id) => {
		const playerSelected = currentPlayers.find((player) => player._id === id);
		setSelectedPlayer(playerSelected);
	};

	const allGames =
		selectedPlayer && selectedPlayer.team?.games
			? selectedPlayer.team.games
			: [];

	const teamRoster =
		selectedPlayer && selectedPlayer.team?.players
			? selectedPlayer.team.players
			: [];

	return (
		<div className="my-20">
			{!selectedPlayer && (
				<div className="my-20 grid grid-cols-1 gap-5 md:grid-cols-3">
					{sortedPlayers.map((player, index) => (
						<Button
							key={index}
							className="rounded-lg bg-[#11161F] transition duration-300 ease-in-out hover:bg-gray-800 md:h-[394px]"
							onClick={() => handleSelectedPlayer(player._id)}
						>
							<Card className="relative flex  cursor-pointer flex-col justify-center border-0 bg-transparent">
								<CardHeader>
									<CardTitle className="font-barlow flex flex-col gap-5 text-center font-normal uppercase">
										{player.register === true && (
											<span className="text-2xl font-semibold text-green-500">
												Upcoming season
											</span>
										)}
										<span className="text-5xl ">{player.team?.teamName}</span>
										<span className="text-3xl"> {player.playerName}</span>
										{player.freeAgent && (
											<span className="text-xl">Free Agent</span>
										)}
										<span className="text-xl">
											{player.division?.divisionName}
										</span>
									</CardTitle>
								</CardHeader>
							</Card>
						</Button>
					))}
				</div>
			)}

			{selectedPlayer && (
				<div>
					<button
						onClick={() => setSelectedPlayer(null)}
						className="group my-2 flex w-fit items-center gap-3 text-xl"
					>
						<ChevronLeft className="text-neutral-300 transition-all group-hover:text-neutral-200" />
						<span className="text-neutral-300 transition-all group-hover:text-neutral-200">
							Back
						</span>
					</button>

					<Tabs defaultValue="info" className="mt-10 w-full">
						<TabsList className="relative mb-10 w-full items-start justify-start">
							<TabsTrigger value="info" className="font-barlow">
								My Info
							</TabsTrigger>
							<TabsTrigger value="games" className="font-barlow">
								My Games
							</TabsTrigger>
							<TabsTrigger value="roster" className="font-barlow">
								My Roster
							</TabsTrigger>
							<div className="absolute bottom-[2px] -z-10 w-full border-b border-neutral-600" />
						</TabsList>

						<TabsContent value="info" className="">
							<p className="font-barlow mb-10 text-3xl uppercase">My Info</p>{" "}
							<UserPlayerInfo player={selectedPlayer} />
						</TabsContent>

						<TabsContent value="games">
							<p className="font-barlow mb-10 text-3xl uppercase">My Games</p>{" "}
							<UserPlayerGames games={allGames} />
						</TabsContent>

						<TabsContent value="roster">
							<UserPlayerRoster
								team={teamRoster}
								selectedPlayer={selectedPlayer}
							/>
						</TabsContent>
					</Tabs>

					<div></div>
				</div>
			)}
		</div>
	);
};

export default UserPlayer;
