"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { Input } from "@ui/components/input";
import { IoMdPerson } from "react-icons/io";

const StatTrackerTabs = ({ game }) => {
	return (
		<div>
			<h2 className="text-center">team roster</h2>

			<Tabs defaultValue="homeTeam">
				<TabsList className="flex w-full rounded border border-neutral-500 bg-[#111827]">
					<TabsTrigger
						value="homeTeam"
						className="my-1 w-1/2 text-xl data-[state=active]:border-none data-[state=active]:bg-neutral-400"
					>
						{game.homeTeam.teamNameShort}
					</TabsTrigger>
					<TabsTrigger
						value="awayTeam"
						className="my-1 w-1/2 text-xl data-[state=active]:border-none data-[state=active]:bg-neutral-400"
					>
						{game.awayTeam.teamNameShort}
					</TabsTrigger>
				</TabsList>

				<div className="flex items-center justify-center gap-1 py-5 text-neutral-300">
					<IoMdPerson className="size-6 text-neutral-300" />
					<p className="text-2xl">0/8</p>
				</div>

				<StatsTabContent value="homeTeam" players={game.homeTeam.players} />
				<StatsTabContent value="awayTeam" players={game.awayTeam.players} />
			</Tabs>
		</div>
	);
};

const StatsTabContent = ({ value, players }) => (
	<TabsContent value={value}>
		<div className="flex flex-col gap-2">
			{players.map((player, index) => (
				<div
					key={index}
					className="flex justify-between rounded-md bg-[#172554] px-6 py-3 uppercase"
				>
					<div className="flex items-center gap-7">
						<p className="min-w-7 text-3xl font-bold">{player.jerseyNumber}</p>
						<p className="text-left text-2xl">{player.playerName}</p>
					</div>
					<div className="flex items-center">
						<Input type="checkbox" className="size-6" />
					</div>
				</div>
			))}
		</div>
	</TabsContent>
);

export default StatTrackerTabs;
