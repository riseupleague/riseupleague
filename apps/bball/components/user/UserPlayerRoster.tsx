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
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Separator } from "@ui/components/separator";
import { useState } from "react";
import { addPlayerToExistingTeam } from "@/actions/player-actions";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const UserPlayerRoster = ({ team, selectedPlayer }) => {
	const [errors, setErrors] = useState(undefined);

	const teamCaptain = team.filter((player) => player.teamCaptain === true);
	const teamId = team[0]._id;
	const isTeamCaptain = teamCaptain._id === selectedPlayer._id ? true : false;
	const maxNumPlayers = team.length >= 10;

	const handleAddPlayer = async (playerData: FormData) => {
		const result = await addPlayerToExistingTeam(playerData, teamId);

		if (result?.errors) return setErrors(result.errors);

		setErrors(undefined);
	};

	return (
		<>
			<div className="flex justify-between">
				<p className="font-barlow mb-10 text-3xl uppercase">My Roster</p>
				{isTeamCaptain && (
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" variant="signIn" disabled={maxNumPlayers}>
								{maxNumPlayers ? "Max Players Reached" : "Add Another Player"}
							</Button>
						</DialogTrigger>

						<DialogContent className="font-barlow bg-[#111827]">
							<form className="space-y-3" action={handleAddPlayer}>
								<DialogHeader>
									<DialogTitle>Add New Player</DialogTitle>
									<DialogDescription>
										Add a new player to your team.
									</DialogDescription>
								</DialogHeader>

								<Separator className="border-t border-neutral-500" />

								<div className="space-y-3">
									<Label htmlFor="playerName" className="text-xl uppercase">
										Full Name
									</Label>
									<Input
										id="playerName"
										variant="form"
										type="text"
										name="playerName"
									/>
									{errors &&
										errors.playerName.map((error, index) => (
											<p key={index} className="text-lg text-red-500">
												{error}
											</p>
										))}
								</div>

								<DialogFooter>
									<SubmitButton />
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				)}
			</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{team?.map((player, index) => {
					return <FeaturedPlayerCard player={player} key={index} />;
				})}
			</div>
		</>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending} className="w-full">
			{pending ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				"Add Player"
			)}
		</Button>
	);
};

export default UserPlayerRoster;
