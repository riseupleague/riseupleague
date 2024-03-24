"use client";
import React, { useState } from "react";
import { updateFinishedGame, updateUpcomingGame } from "@/actions/games-action";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { useFormStatus } from "react-dom";
import { useToast } from "@ui/components/use-toast";
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
const UpdateGame = ({ game }) => {
	const [homeTeamChosen, setHomeTeamChosen] = useState(game.homeTeam._id);
	const [awayTeamChosen, setAwayTeamChosen] = useState(game.awayTeam._id);

	const { toast } = useToast();
	// const handleUpdateTeam = async (gameData: FormData) => {
	// 	const result = await updateGame(game._id, gameData);

	// 	// successfully updated season
	// 	if (result?.status === 200) {
	// 		return toast({
	// 			variant: "success",
	// 			title: "Success!",
	// 			description: result.message,
	// 		});
	// 	}

	// 	// no season found
	// 	if (result?.status === 404) {
	// 		return toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}

	// 	// internal server error
	// 	if (result?.status === 500) {
	// 		return toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}
	// };

	// const handleDeleteTeam = async () => {
	// 	const result = await deleteTeam(team._id);

	// 	// successfully updated season
	// 	if (result?.status === 200) {
	// 		toast({
	// 			variant: "success",
	// 			title: "Success!",
	// 			description: result.message,
	// 		});

	// 		router.push("/team-management");
	// 	}

	// 	// no season found
	// 	if (result?.status === 404) {
	// 		toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}

	// 	// internal server error
	// 	if (result?.status === 500) {
	// 		toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}
	// };

	const handleUpdateUpcomingGame = async (gameDate: FormData) => {
		const result = await updateUpcomingGame(game._id, gameDate);
	};

	const handleUpdateFinishedGame = async (gameDate: FormData) => {
		const result = await updateFinishedGame(game._id, gameDate);
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="signIn" className="w-full font-semibold">
						Update Game
					</Button>
				</DialogTrigger>
				<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
					<DialogHeader>
						<DialogTitle>Update Game: {game?.gameName}</DialogTitle>
						<DialogDescription>Update this game.</DialogDescription>
					</DialogHeader>

					<Separator className="border-b border-neutral-500" />
					{!game.status ? (
						<form action={handleUpdateUpcomingGame} className="space-y-5">
							<div className="flex gap-2">
								<div className="flex w-full flex-col gap-3">
									<Label htmlFor="homeTeamId">New Home Team:</Label>
									<select
										name="homeTeamId"
										id="homeTeamId"
										onChange={(e) => setHomeTeamChosen(e.target.value)}
										className="rounded border border-neutral-600 bg-neutral-900 p-2"
									>
										<option value="">Select Home Team</option>
										{game.division.teams.map((team) => {
											if (awayTeamChosen !== team._id) {
												return (
													<option key={team._id} value={team._id}>
														{team.teamName}
													</option>
												);
											}
										})}
									</select>
								</div>
								<div className="flex w-full flex-col gap-3">
									<Label htmlFor="awayTeamId">New Away Team:</Label>
									<select
										name="awayTeamId"
										id="awayTeamId"
										onChange={(e) => setAwayTeamChosen(e.target.value)}
										className="rounded border border-neutral-600 bg-neutral-900 p-2"
									>
										<option value="">Select Away Team</option>
										{game.division.teams.map((team) => {
											if (homeTeamChosen !== team._id) {
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
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="location">New Location:</Label>
								<Input
									name="location"
									id="location"
									placeholder="New location"
									defaultValue={game?.location}
									className=" bg-neutral-900"
								/>
							</div>

							<Separator className="mb-4 border-b border-neutral-500" />

							<DialogFooter>
								<SubmitButton />
							</DialogFooter>
						</form>
					) : (
						<form action={handleUpdateFinishedGame} className="space-y-5">
							<div className="flex gap-2">
								<div className="flex w-full flex-col gap-3">
									<Label htmlFor="homeTeamId">New Home Team:</Label>
									<select
										name="homeTeamId"
										id="homeTeamId"
										onChange={(e) => setHomeTeamChosen(e.target.value)}
										className="rounded border border-neutral-600 bg-neutral-900 p-2"
									>
										<option value="">Select Home Team</option>
										{game.division.teams.map((team) => {
											if (awayTeamChosen !== team._id) {
												return (
													<option key={team._id} value={team._id}>
														{team.teamName}
													</option>
												);
											}
										})}
									</select>
								</div>
								<div className="flex w-full flex-col gap-3">
									<Label htmlFor="awayTeamId">New Away Team:</Label>
									<select
										name="awayTeamId"
										id="awayTeamId"
										onChange={(e) => setAwayTeamChosen(e.target.value)}
										className="rounded border border-neutral-600 bg-neutral-900 p-2"
									>
										<option value="">Select Away Team</option>
										{game.division.teams.map((team) => {
											if (homeTeamChosen !== team._id) {
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
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="location">New Location:</Label>
								<Input
									name="location"
									id="location"
									placeholder="New location"
									defaultValue={game?.location}
									className=" bg-neutral-900"
								/>
							</div>

							<Separator className="mb-4 border-b border-neutral-500" />

							<DialogFooter>
								<SubmitButton />
							</DialogFooter>
						</form>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<DialogClose asChild>
			<Button type="submit" className="w-full" disabled={pending}>
				{pending ? "Updating..." : "Update"}
			</Button>
		</DialogClose>
	);
};

export default UpdateGame;
