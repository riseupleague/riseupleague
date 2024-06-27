"use client";

import { Button } from "@ui/components/button";
import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Separator } from "@ui/components/separator";
import { useState } from "react";
import { addPlayerToExistingTeam } from "@/actions/player-actions";
import SubmitButton from "../general/SubmitButton";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
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
	const router = useRouter();
	const { toast } = useToast();
	const [errors, setErrors] = useState(undefined);
	const [open, setOpen] = useState(false);

	const teamCaptain = team.filter((player) => player.teamCaptain === true)[0];
	const teamHasPaid = selectedPlayer?.team?.paid;
	const teamId = team[0].team;
	const isTeamCaptain = teamCaptain?._id === selectedPlayer._id ? true : false;
	const maxNumPlayers = team.length >= 10;
	const addPlayerBtnAvailable = teamHasPaid && isTeamCaptain ? true : false;

	const handleAddPlayer = async (playerData: FormData) => {
		const result = await addPlayerToExistingTeam(
			playerData,
			teamId,
			selectedPlayer
		);

		if (result?.errors) return setErrors(result.errors);

		// successfully created player
		if (result?.status === 200) {
			setErrors(undefined);

			setOpen(false);

			toast({
				variant: "success",
				title: "Player added to team!",
				description: result.message,
			});

			return router.push("/user");
		}

		// show error toast
		setErrors(result.errors);
		return toast({
			variant: "destructive",
			title: "Error",
			description: result.message,
		});
	};

	return (
		<>
			<div className="flex justify-between">
				<p className="font-barlow mb-10 text-3xl uppercase">My Roster</p>
				{addPlayerBtnAvailable && (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild onClick={() => setOpen(!open)}>
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
									<SubmitButton btnText="Add New Player" />
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{team?.map((player, index) => (
					<FeaturedPlayerCard player={player} key={index} />
				))}
			</div>
		</>
	);
};

export default UserPlayerRoster;
