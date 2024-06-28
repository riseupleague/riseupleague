"use client";

import SubmitButton from "@/components/general/SubmitButton";
import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Separator } from "@ui/components/separator";

const AddPlayerToTeam = ({
	open,
	setOpen,
	handleAddPlayer,
	maxNumPlayers,
	errors,
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild onClick={() => setOpen(!open)}>
				<Button size="sm" variant="signIn" disabled={maxNumPlayers}>
					{maxNumPlayers ? "Max Players Reached" : "Add Player"}
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
	);
};

export default AddPlayerToTeam;
