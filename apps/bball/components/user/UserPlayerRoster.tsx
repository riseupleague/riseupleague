"use client";

import { Button } from "@ui/components/button";
import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

const UserPlayerRoster = ({ team, selectedPlayer }) => {
	const teamCaptain = team.filter((player) => player.teamCaptain === true);
	const isTeamCaptain = teamCaptain._id === selectedPlayer._id ? true : false;

	return (
		<>
			<div className="flex justify-between">
				<p className="font-barlow mb-10 text-3xl uppercase">My Roster</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button size="sm" variant="signIn" disabled={!isTeamCaptain}>
							Add New Player
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Player</DialogTitle>
							<DialogDescription>
								Add a new player to your team.
							</DialogDescription>
						</DialogHeader>

						<form></form>

						<DialogFooter>
							<Button>Close</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{team?.map((player, index) => {
					return <FeaturedPlayerCard player={player} key={index} />;
				})}
			</div>
		</>
	);
};

export default UserPlayerRoster;
