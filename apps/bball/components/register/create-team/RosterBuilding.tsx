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

const RosterBuilding = ({ registerInfo, setRegisterInfo }) => {
	const [players, setPlayers] = useState(
		registerInfo?.players || [
			{ id: 1, name: "", email: "", phoneNumber: "" },
			{ id: 2, name: "", email: "", phoneNumber: "" },
			{ id: 3, name: "", email: "", phoneNumber: "" },
			{ id: 4, name: "", email: "", phoneNumber: "" },
			{ id: 5, name: "", email: "", phoneNumber: "" },
			{ id: 6, name: "", email: "", phoneNumber: "" },
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
		setPlayers([
			...players,
			{ id: players.length + 1, name: "", email: "", phoneNumber: "" },
		]);
	};

	const handlePlayerChange = (index, field, value) => {
		const newPlayers = players.map((player, i) =>
			i === index ? { ...player, [field]: value } : player
		);
		setPlayers(newPlayers);
	};

	const handleValidation = () => {
		const inputtedPlayers = players.filter((player) => player.name !== "");

		// Simple email and phone number regex validations
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex =
			/^(?:\+?1[- ]?)?\(?(?:[2-9][0-9]{2})\)?[- ]?(?:[2-9][0-9]{2})[- ]?(?:[0-9]{4})$/;
		let validationErrors = [];

		// Loop through players to validate email and phone numbers
		inputtedPlayers.forEach((player, index) => {
			if (player.email && !emailRegex.test(player.email)) {
				validationErrors.push({
					path: [`player${index + 1}`, "email"],
					message: `Player ${index + 1} has an invalid email.`,
				});
			}

			if (player.phoneNumber && !phoneRegex.test(player.phoneNumber)) {
				validationErrors.push({
					path: [`player${index + 1}`, "phoneNumber"],
					message: `Player ${index + 1} has an invalid phone number.`,
				});
			}
		});

		const result = buildRosterSchema.safeParse(players);

		if (!result.success) {
			const errors = (result as { success: false; error: ZodError }).error
				.errors;
			validationErrors = [...validationErrors, ...errors];
		}

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
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
				return {
					id: id + 1,
					name: player.name,
					email: player.email,
					phoneNumber: player.phoneNumber,
				};
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

	const handleDeletePlayer = (index) => {
		const updatedPlayers = players.filter((_, i) => i !== index);
		setPlayers(updatedPlayers);
	};

	console.log("errors:", errors);

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
				<div className="rounded border border-neutral-600 bg-[#111827] px-4 py-6 ">
					<div className="space-y-4">
						<h2 className="mb-4 text-2xl font-bold text-white">
							Team Captains
						</h2>
						<p className="mb-4 text-lg text-white">
							Complete your roster below with each player&apos;s name, email,
							and phone number to ensure they receive important updates and
							payment reminders. You&apos;ll unlock the{" "}
							<span className="font-semibold">50% discount</span> on your
							payment.
						</p>
						<p className="text-md font-medium text-red-600">
							<strong>Note:</strong> All your players must sign up before the
							deadline to avoid team removal, allowing waitlisted teams to join.
						</p>
					</div>

					<div className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2">
						{players.map((player, index) => (
							<div key={player.id} className="space-y-3">
								<Label
									htmlFor={`player${player.id}`}
									className="flex items-center justify-between text-xl uppercase"
								>
									Enter Player {player.id}
									{/* Delete button for Player 7 and up */}
									{index >= 6 && (
										<button
											type="button"
											onClick={() => handleDeletePlayer(index)}
											className="text-sm text-red-500 underline"
										>
											Delete
										</button>
									)}
								</Label>

								{/* Player Name Input */}
								<Input
									variant="form"
									type="text"
									name={`player${player.id}`}
									placeholder={`Enter Player ${player.id}'s name`}
									defaultValue={player.name}
									onChange={(e) =>
										handlePlayerChange(index, "name", e.target.value)
									}
								/>
								{/* Error for Player Name */}
								{errors.find(
									(error) => error.path[0] === index && error.path[1] === "name"
								) && (
									<p className="text-red-500">
										{
											errors.find(
												(error) =>
													error.path[0] === index && error.path[1] === "name"
											)?.message
										}
									</p>
								)}

								{/* Player Email Input */}
								<Input
									variant="form"
									type="email"
									name={`playerEmail${player.id}`}
									placeholder={`Email`}
									defaultValue={player.email}
									onChange={(e) =>
										handlePlayerChange(index, "email", e.target.value)
									}
								/>
								{/* Error for Player Email */}
								{errors.find(
									(error) =>
										error.path[0] === index && error.path[1] === "email"
								) && (
									<p className="text-red-500">
										{
											errors.find(
												(error) =>
													error.path[0] === index && error.path[1] === "email"
											)?.message
										}
									</p>
								)}

								{/* Player Phone Number Input */}
								<Input
									variant="form"
									type="text"
									name={`playerPhone${player.id}`}
									placeholder={`Phone Number`}
									defaultValue={player.phoneNumber}
									onChange={(e) =>
										handlePlayerChange(index, "phoneNumber", e.target.value)
									}
								/>
								{/* Error for Player Phone Number */}
								{errors.find(
									(error) =>
										error.path[0] === index && error.path[1] === "phoneNumber"
								) && (
									<p className="text-red-500">
										{
											errors.find(
												(error) =>
													error.path[0] === index &&
													error.path[1] === "phoneNumber"
											)?.message
										}
									</p>
								)}
							</div>
						))}
					</div>
				</div>

				<p className="my-4 text-center">
					Reminder: Add up to 8 more players to prevent{" "}
					<span className="text-primary text-lg font-semibold">
						free agents
					</span>
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
