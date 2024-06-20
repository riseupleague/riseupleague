"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { useFormStatus } from "react-dom";
import { useToast } from "@ui/components/use-toast";
import { usePathname } from "next/navigation";
import { createGame } from "@/actions/games-action";
import { useState } from "react";

const CreateGame = ({ division }): JSX.Element => {
	const [homeTeam, setHomeTeam] = useState("");
	const [awayTeam, setAwayTeam] = useState("");

	const path = usePathname();
	const { toast } = useToast();

	const handleFormAction = async (gameData: FormData) => {
		const result = await createGame(gameData);

		// successfully created season
		if (result?.status === 201) {
			return toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});
		}

		// show error toast
		return toast({
			variant: "destructive",
			title: "Error",
			description: result.message,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className=" font-semibold">
					Create Game +
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Create New Game:</DialogTitle>
					<DialogDescription>Create a new game.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleFormAction} className="space-y-4">
					<input type="hidden" name="seasonId" value={division?.season} />
					<input type="hidden" name="divisionId" value={division?._id} />
					<input type="hidden" name="location" value={division?.location} />

					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="week">Week #</Label>
						<Input
							type="number"
							name="week"
							id="week"
							className="text-neutral-900"
						/>
					</div>
					<div className="flex  gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="date">Game Date:</Label>
							<Input
								type="date"
								name="date"
								id="date"
								placeholder="Division Start Time"
								className="block w-full text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="time">Game Time:</Label>
							<Input
								type="time"
								name="time"
								id="time"
								placeholder="Division End Time"
								className="block  text-neutral-900"
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="homeTeamId">Home Team:</Label>
							<select
								name="homeTeamId"
								id="homeTeamId"
								onChange={(e) => setHomeTeam(e.target.value)}
								className="rounded border border-neutral-600 bg-neutral-900 p-2"
							>
								<option value="">Select Home Team</option>
								{division.teams.map((team) => {
									return (
										<option key={team._id} value={team._id}>
											{team.teamName}
										</option>
									);
								})}
							</select>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="awayTeamId">Away Team:</Label>
							<select
								name="awayTeamId"
								id="awayTeamId"
								onChange={(e) => setAwayTeam(e.target.value)}
								className="rounded border border-neutral-600 bg-neutral-900 p-2"
							>
								<option value="">Select Away Team</option>
								{division.teams.map((team) => {
									if (homeTeam !== team._id) {
										return (
											<option key={team._id} value={team._id}>
												{team.teamName}
											</option>
										);
									}
								})}
							</select>
						</div>
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<SubmitButton />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<DialogClose asChild>
			<Button type="submit" className="w-full" disabled={pending}>
				{pending ? "Creating..." : "Create"}
			</Button>
		</DialogClose>
	);
};

export default CreateGame;
