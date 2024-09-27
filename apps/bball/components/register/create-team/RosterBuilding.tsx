import { ZodError } from "zod";
import React, { useRef, useState } from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@ui/components/dialog";
import { buildRosterSchema } from "@/schemas";

type SafeParseResult<T> =
	| { success: true; data: T }
	| { success: false; error: ZodError };

const RosterBuilding = ({ registerInfo, setRegisterInfo }) => {
	const [players, setPlayers] = useState(
		registerInfo?.players || [
			{ id: 1, name: "" },
			{ id: 2, name: "" },
			{ id: 3, name: "" },
			{ id: 4, name: "" },
			{ id: 5, name: "" },
			{ id: 6, name: "" },
		]
	);

	const [errors, setErrors] = useState([]);
	const formRef = useRef(null);
	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	const addPlayer = () => {
		setPlayers([...players, { id: players.length + 1, name: "" }]);
	};

	const handlePlayerNameChange = (index, value) => {
		const newPlayers = players.map((player, i) =>
			i === index ? { ...player, name: value } : player
		);
		setPlayers(newPlayers);
	};

	const handleValidation = () => {
		// Validate the first six players
		const inputtedPlayers = players
			.filter((player) => player.name !== "")
			.map((player, id) => {
				return { id: id + 1, name: player.name };
			});

		const result = buildRosterSchema.safeParse(
			inputtedPlayers.length >= 6
				? inputtedPlayers.slice(0, 6)
				: players.slice(0, 6)
		);

		if (!result.success) {
			const errors = (result as { success: false; error: ZodError }).error
				.errors;
			setErrors(errors);
			return false;
		}

		setErrors([]);
		return true;
	};

	const validateAndSubmit = (numOfPlayers: number, freeAgent: string) => {
		const isValid = handleValidation();
		if (!isValid) return;

		// Validate the first six players
		const inputtedPlayers = players
			.filter((player) => player.name !== "")
			.map((player, id) => {
				return { id: id + 1, name: player.name };
			});

		const updatedRegisterInfo = {
			...registerInfo,
			players: inputtedPlayers,
			step: 4,
			addFreeAgent: freeAgent,
			allowStep: {
				1: true,
				2: true,
				3: true,
				4: true,
				5: false,
			},
		};

		setRegisterInfo(updatedRegisterInfo);
	};

	const handleContinueClick = () => {
		const isValid = handleValidation();
		if (isValid) {
			const numOfPlayers = players.filter(
				(player) => player.name !== ""
			).length;

			if (numOfPlayers >= 8) validateAndSubmit(numOfPlayers, "none");
			else openDialog();
		}
	};

	const handleContinueWithFreeAgents = (freeAgent: string) => {
		const isValid = handleValidation();
		if (isValid) {
			const numOfPlayers = players.filter(
				(player) => player.name !== ""
			).length;

			validateAndSubmit(numOfPlayers, freeAgent);
		}
	};

	return (
		<section>
			<form ref={formRef}>
				<div className="mb-6">
					<h3>Build Your Roster</h3>
					<p className="text-lg uppercase">
						Team Name: {registerInfo.teamDetails?.teamName}
					</p>
					<p className="text-lg uppercase">
						<span className="text-primary">Reminder:</span> add up to 9 players
						to avoid free agents being added to your team.
					</p>
				</div>

				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
					<div className="space-y-3">
						<Label htmlFor="teamCaptain" className="text-xl uppercase">
							Team Captain
						</Label>
						<Input
							variant="form"
							type="text"
							name="teamCaptain"
							disabled={true}
							value={registerInfo.teamCaptainDetails?.playerName}
						/>
					</div>
				</div>

				<p className="text-primary text-2xl uppercase">
					Team captains must enter their roster names to allow players to select
					and join the team through the join portal.
				</p>
				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
					{players.map((player, index) => (
						<div key={player.id} className="space-y-3">
							<Label
								htmlFor={`player${player.id}`}
								className="text-xl uppercase"
							>
								Player {player.id}
							</Label>
							<Input
								variant="form"
								type="text"
								name={`player${player.id}`}
								placeholder={`Enter Player ${player.id}'s name`}
								defaultValue={player.name}
								onChange={(e) => handlePlayerNameChange(index, e.target.value)}
							/>
							{index < 6 &&
								errors.find((error) => error.path.includes(index)) && (
									<p className="text-red-500">
										{
											errors.find((error) => error.path.includes(index))
												?.message
										}
									</p>
								)}
						</div>
					))}
				</div>

				<p className="my-4 text-center">
					Reminder: Add up to 8 more players to prevent{" "}
					<span className="text-lg font-semibold">free agents</span>
				</p>

				<div className="flex flex-col gap-20">
					<div>
						<Button
							type="button"
							className="w-full"
							variant="secondary"
							onClick={addPlayer}
						>
							Add Player
						</Button>

						{errors.find((error) =>
							error.message.includes("Player name is required")
						) && (
							<p className="mt-4 text-center text-red-500">
								At least 6 players are required
							</p>
						)}
					</div>

					<div className="mt-4 flex justify-between">
						<Button
							variant="secondary"
							onClick={() => setRegisterInfo({ ...registerInfo, step: 2 })}
						>
							Back
						</Button>
						<Button type="button" onClick={handleContinueClick}>
							Continue
						</Button>
					</div>

					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent className="rounded border border-neutral-600 bg-[#111827]">
							<DialogHeader>
								<DialogTitle className="text-center">**Note**</DialogTitle>
								<DialogDescription className=" text-neutral-200">
									<p className="text-start">Current Roster:</p>
									<ul className="text-start">
										{players
											.filter((player) => player.name !== "")
											.map((player) => (
												<li key={player.id}>{player.name}</li>
											))}
									</ul>
									<p className="mt-2 text-start">
										To ensure teams are full and competitive, we require a
										minimum of 9 players. Since you have less than 9 players, we
										will add free agents to complete your team.
									</p>
								</DialogDescription>
							</DialogHeader>

							<div>
								<DialogDescription>
									<Button
										type="button"
										className="w-full"
										onClick={() => handleContinueWithFreeAgents("true")}
									>
										Continue With Free Agents
									</Button>
								</DialogDescription>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</form>
		</section>
	);
};

export default RosterBuilding;
