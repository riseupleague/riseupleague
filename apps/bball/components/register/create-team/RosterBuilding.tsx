// import React, { useState, useRef } from "react";
// import { Button } from "@ui/components/button";
// import { Input } from "@ui/components/input";
// import { Label } from "@ui/components/label";

// const RosterBuilding = ({ registerInfo, setRegisterInfo }) => {
// 	const topRef = useRef(null); // Create a reference for the top of the page

// 	const [rosterFilled, setRosterFilled] = useState(false);
// 	const [players, setPlayers] = useState(
// 		registerInfo?.players || [
// 			{ id: 1, name: "" },
// 			{ id: 2, name: "" },
// 			{ id: 3, name: "" },
// 			{ id: 4, name: "" },
// 			{ id: 5, name: "" },
// 			{ id: 6, name: "" },
// 		]
// 	);

// 	console.log(players);

// 	// Function to handle adding a new player input field
// 	const addPlayer = () => {
// 		setPlayers([...players, { id: players.length + 1, name: "" }]);
// 	};

// 	// Function to handle player name change
// 	const handlePlayerNameChange = (index, value) => {
// 		const newPlayers = players.map((player, i) =>
// 			i === index ? { ...player, name: value } : player
// 		);
// 		setPlayers(newPlayers);
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();

// 		const numOfPlayers = players.filter((player) => player.name !== "").length;
// 		console.log("numOfPlayers:", numOfPlayers);
// 		if (numOfPlayers < 6) {
// 			alert(
// 				`You currently have ${numOfPlayers} players in your roster. Please add 6 or more players.`
// 			);
// 			return null;
// 		}

// 		setRosterFilled(true);

// 		// Scroll to the top of the page

// 		if (topRef.current) {
// 			topRef.current.scrollIntoView({ behavior: "smooth" });
// 		}

// 		// // Collect player names and other form data
// 		// const updatedRegisterInfo = {
// 		// 	...registerInfo,
// 		// 	players: players,
// 		// 	step: 4,
// 		// 	allowStep: {
// 		// 		1: true,
// 		// 		2: true,
// 		// 		3: true,
// 		// 		4: true,
// 		// 		5: false,
// 		// 	},
// 		// };
// 		// setRegisterInfo(updatedRegisterInfo);
// 		// // Move to the next step or handle form submission
// 	};

// 	return (
// 		<section>
// 			{!rosterFilled && (
// 				<form onSubmit={handleSubmit}>
// 					<div className="mb-6">
// 						<h3>Build Your Roster</h3>
// 						<p className="text-lg uppercase">
// 							Team Name: {registerInfo.teamDetails?.teamName}
// 						</p>
// 						<p className="text-lg uppercase">
// 							<span className="text-primary">Reminder:</span> add up to 9
// 							players to avoid free agents being added to your team.
// 						</p>
// 					</div>

// 					<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
// 						<div className="space-y-3">
// 							<Label htmlFor="teamCaptain" className="text-xl uppercase">
// 								Team Captain
// 							</Label>
// 							<Input
// 								variant="form"
// 								type="text"
// 								name="teamCaptain"
// 								disabled={true}
// 								value={registerInfo.teamCaptainDetails?.playerName}
// 							/>
// 						</div>
// 					</div>

// 					<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
// 						{players.map((player, index) => (
// 							<div key={player.id} className="space-y-3">
// 								<Label
// 									htmlFor={`player${player.id}`}
// 									className="text-xl uppercase"
// 								>
// 									Player {player.id}
// 								</Label>
// 								<Input
// 									variant="form"
// 									type="text"
// 									name={`player${player.id}`}
// 									placeholder={`Enter Player ${player.id}'s name`}
// 									defaultValue={player.name}
// 									onChange={(e) =>
// 										handlePlayerNameChange(index, e.target.value)
// 									}
// 								/>
// 							</div>
// 						))}
// 					</div>

// 					<div className="flex flex-col gap-20">
// 						<Button
// 							type="button"
// 							className="w-full"
// 							variant="secondary"
// 							onClick={addPlayer}
// 						>
// 							Add Player
// 						</Button>

// 						<Button type="submit" className="w-full">
// 							Continue
// 						</Button>
// 					</div>
// 				</form>
// 			)}

// 			{rosterFilled && (
// 				<div
// 					ref={topRef}
// 					className="rounded border border-neutral-600 bg-[#111827] px-4 py-6"
// 				>
// 					<p>**NOTE**</p>
// 					<p>
// 						To ensure teams are full and competitive, we require a minimum of 9
// 						players. Since you have less than 9 players. Please choose an option
// 						to proceed:
// 					</p>

// 					<Button className="w-full" onClick={() => setRosterFilled(false)}>
// 						Back
// 					</Button>
// 				</div>
// 			)}
// 		</section>
// 	);
// };

// export default RosterBuilding;

import React, { useRef, useState } from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@ui/components/dialog";
import { buildRosterSchema } from "@/schemas";


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
console.log(errors)
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
			setErrors(result.error.errors);
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

		const result = buildRosterSchema.safeParse(
			inputtedPlayers.length >= 6
				? inputtedPlayers.slice(0, 6)
				: players.slice(0, 6)
		);
		if (!result.success) {
			setErrors(result.error.errors);
			return;
		}

		setErrors([]);

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

	const handleSubmit = (e) => {
		console.log("handleSubmit");
		e.preventDefault();
		const numOfPlayers = players.filter((player) => player.name !== "").length;
		validateAndSubmit(numOfPlayers, "none");
	};

	const handleContinueClick = () => {
		const isValid = handleValidation();
		if (isValid) {
			const numOfPlayers = players.filter(
				(player) => player.name !== ""
			).length;

			console.log("numOfPlayers: ", numOfPlayers);
			if (numOfPlayers >= 8) {
				validateAndSubmit(numOfPlayers, "none");
			} else {
				openDialog();
			}
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


	<p className="my-4 text-center">Reminder: Add up to 8 more players to prevent <span className="font-semibold text-lg">free agents</span> or <span className="font-semibold text-lg">Full team fee.</span></p>
				

				

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
					<p className="mt-4 text-red-500 text-center">At least 6 players are required</p>
				)}
					</div>
				

					<div className="mt-4 flex justify-between">
					<Button
						variant="secondary"
						onClick={() => setRegisterInfo({ ...registerInfo, step: 2})}
					>
						Back
					</Button>
					<Button
						type="button"
						onClick={handleContinueClick}
					>
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
										minimum of 9 players. Since you have less than 9 players,
										please choose an option to proceed:
									</p>
								</DialogDescription>
							</DialogHeader>

							<div>
								<DialogTitle>
									<p className="text-lg">TOTAL PER PLAYER:</p>
									{registerInfo.division.earlyBirdOpen ? (
										<p className="text-xl">
											${registerInfo.division.earlyBirdPrice}.00
											<span className="text-sm lowercase"> + tax</span>{" "}
											<span className="text-sm">early bird price </span>
										</p>
									) : (
										<p className="text-xl">
											${registerInfo.division.regularPrice}.00
											<span className="text-sm lowercase"> + tax</span>{" "}
										</p>
									)}
								</DialogTitle>
								<DialogDescription>
									<Button
										type="button"
										className="w-full"
										onClick={() => handleContinueWithFreeAgents("true")}
									>
										Continue With Free Agents
									</Button>
									<span className="mt-2 block text-neutral-200">
										We will add free agents to complete your team.
									</span>
								</DialogDescription>
							</div>

							<p className="text-center text-xl font-semibold">OR</p>

							<div>
								<DialogTitle>
									<p className="text-lg">TOTAL TEAM FEE WITH TAX INCLUDED:</p>

									{registerInfo.division.earlyBirdOpen ? (
										<p className="text-xl">
											{/* CHANGE TO REGULAR FULL PRICE */}$
											{registerInfo.division.regularPrice}.00
										</p>
									) : (
										<p className="text-xl">
											${registerInfo.division.regularPrice}.00
										</p>
									)}
								</DialogTitle>
								<DialogDescription>
									<Button
										type="button"
										className="w-full"
										onClick={() => handleContinueWithFreeAgents("false")}
									>
										Pay Full Team Fee
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