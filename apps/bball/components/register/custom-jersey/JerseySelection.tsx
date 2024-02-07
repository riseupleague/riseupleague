"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@ui/components/button";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@ui/components/dialog";

const PleaseCreateYourTeamDialog = ({ open, onOpenChange }): JSX.Element => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-neutral-800 text-white sm:max-w-md">
				<DialogHeader className="text-center">
					<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
						<span className="text-primary text-2xl font-bold uppercase">
							Please Have 9 or minimum registered to your team!
						</span>{" "}
					</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

const SubmitUniqueJerseyFormDialog = ({
	jerseyEdition,
	uniqueNumber,
	open,
	onOpenChange,
	onSubmit,
}): JSX.Element => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-neutral-800 text-white sm:max-w-md">
				<DialogHeader className="text-center">
					<DialogClose>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M14.4 18L8.39999 12L14.4 6"
								stroke="#ABAFB3"
								strokeWidth="1.67"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</DialogClose>{" "}
					<div className="flex flex-col">
						<DialogTitle className="mt-10 text-center  text-3xl text-neutral-300">
							You are selecting {jerseyEdition}-{uniqueNumber} as your jersey
							for the upcoming season
						</DialogTitle>
						<DialogDescription className="text-primary text-center text-sm">
							By clicking submit, you will lose your selected primary color for
							the previous jersey. What you see is what you get for Unique
							Jersey.
							<form onSubmit={onSubmit} className="mt-10">
								<Button type="submit">Submit</Button>
							</form>
						</DialogDescription>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

const JerseySelection = ({ team }): JSX.Element => {
	const router = useRouter();
	const [selectedEdition, setSelectedEdition] = useState("");
	const [isEditionSelected, setIsEditionSelected] = useState(false);
	const [isLoader, setIsLoader] = useState(false);

	const [numOfJersey, setNumOfJersey] = useState(0);
	const [open, setOpen] = useState(false);
	const [openUniqueJerseyForm, setOpenUniqueJerseyForm] = useState(false);
	const [uniqueNumber, setUniqueNumber] = useState(0);

	const [imageErrors, setImageErrors] = useState(
		Array(numOfJersey).fill(false)
	);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	const openFormUniqueJersey = (number) => {
		setUniqueNumber(number);
		setOpenUniqueJerseyForm(true);
	};

	const handleImageError = (index) => {
		const updatedErrors = [...imageErrors];
		updatedErrors[index] = true;
		setImageErrors(updatedErrors);
	};

	const handleSubmitUniqueJerseyForm = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoader(true);

		const formObject = {
			teamId: team._id,
			divisionId: team.division._id,
			jerseyEdition: `${selectedEdition}-${uniqueNumber}`,
			primaryColor: "",
			secondaryColor: "",
			tertiaryColor: "",
			oldPrimaryColor: team.primaryColor ? team.primaryColor : "",
			oldJerseyEdition: team.jerseyEdition ? team.jerseyEdition : "",
		};

		const res = await fetch("/api/update-unique-jersey", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formObject),
		});

		if (res.ok) {
			const { updatedDivision } = await res.json();
			setIsLoader(false);
			router.push("/user");
		}
	};

	return (
		<>
			{!isEditionSelected ? (
				<>
					<Link
						href={"/jersey"}
						onClick={() => {
							setIsEditionSelected(false);
						}}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</Link>
					<h3 className="mt-10  text-3xl uppercase ">Select Your Edition</h3>

					<div className="mt-10 flex flex-col gap-10 md:flex-row ">
						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(10);
								setSelectedEdition("retro");
							}}
							className="flex flex-col gap-5 rounded-md bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-4xl uppercase">Retro</span>
						</button>

						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(10);
								setSelectedEdition("original");
							}}
							className="flex flex-col gap-5 rounded-md bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-4xl uppercase">original </span>
						</button>

						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(10);
								setSelectedEdition("classic");
							}}
							className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-4xl uppercase">Classic</span>
						</button>
						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(5);
								setSelectedEdition("unique");
							}}
							className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-4xl uppercase">Unique</span>
						</button>
					</div>
				</>
			) : (
				<>
					<button
						onClick={() => {
							setIsEditionSelected(false);
						}}
						className="my-2 flex items-center gap-3 text-xl text-neutral-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="20"
							viewBox="0 0 15 20"
							fill="none"
						>
							<path
								d="M8.125 16.25L1.875 10L8.125 3.75"
								stroke="#ABAFB3"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back
					</button>
					<h3 className="mt-10  text-3xl uppercase ">
						{selectedEdition} Edition{" "}
					</h3>
					<div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
						{selectedEdition === "unique" ? (
							<>
								{Array.from({ length: numOfJersey }, (_, index) => {
									const usedJersey = team.division.uniqueJersey.find(
										(jersey) => jersey === `${selectedEdition}-${index + 1}`
									);
									return (
										<div
											key={index}
											className="relative rounded border border-neutral-600 pb-2"
										>
											{!usedJersey && (
												<Button
													className="bg-transparent hover:bg-transparent"
													onClick={() => {
														if (team.players.length < 9) {
															openDialog();
														} else {
															openFormUniqueJersey(index + 1);
														}
													}}
												>
													{!imageErrors[index] && (
														<Image
															src={`/images/jersey/placeholders/${selectedEdition}/${selectedEdition}-${
																index + 1
															}.png`}
															alt={`${selectedEdition} ${index + 1}`}
															width={500}
															height={300}
															onError={() => handleImageError(index)}
														/>
													)}
												</Button>
											)}
											{usedJersey && (
												<>
													<Button
														className="bg-transparent hover:bg-transparent"
														disabled
													>
														{!imageErrors[index] && (
															<Image
																src={`/images/jersey/placeholders/${selectedEdition}/${selectedEdition}-${
																	index + 1
																}.png`}
																alt={`${selectedEdition} ${index + 1}`}
																width={500}
																height={300}
																onError={() => handleImageError(index)}
															/>
														)}
													</Button>
													<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="100%"
															height="100%"
															viewBox="0 0 24 24"
															fill="none"
															stroke="red"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<line x1="0" y1="0" x2="100%" y2="100%" />
															<line x1="0" y1="100%" x2="100%" y2="0" />
														</svg>
													</div>
												</>
											)}
											<p className="text-center text-lg uppercase lg:text-2xl">
												{selectedEdition} {index + 1}
											</p>
										</div>
									);
								})}
							</>
						) : (
							<>
								{Array.from({ length: numOfJersey }, (_, index) => (
									<div
										key={index}
										className="rounded border border-neutral-600 pb-2"
									>
										{team ? (
											<Link
												href={`/jersey/${team._id}/${selectedEdition}?number=${
													index + 1
												}`}
											>
												{!imageErrors[index] && (
													<Image
														src={`/images/jersey/placeholders/${selectedEdition}/${selectedEdition}-${
															index + 1
														}.svg`}
														alt={`${selectedEdition} ${index + 1}`}
														width={500}
														height={300}
														onError={() => handleImageError(index)}
													/>
												)}
											</Link>
										) : (
											<Button
												className="bg-transparent hover:bg-transparent"
												onClick={openDialog}
											>
												{!imageErrors[index] && (
													<Image
														src={`/images/jersey/placeholders/${selectedEdition}/${selectedEdition}-${
															index + 1
														}.svg`}
														alt={`${selectedEdition} ${index + 1}`}
														width={500}
														height={300}
														onError={() => handleImageError(index)}
													/>
												)}
											</Button>
										)}

										<p className="text-center text-lg uppercase lg:text-2xl">
											{selectedEdition} {index + 1}
										</p>
									</div>
								))}
							</>
						)}
					</div>
					<PleaseCreateYourTeamDialog open={open} onOpenChange={setOpen} />
					<SubmitUniqueJerseyFormDialog
						jerseyEdition={selectedEdition}
						uniqueNumber={uniqueNumber}
						open={openUniqueJerseyForm}
						onOpenChange={setOpenUniqueJerseyForm}
						onSubmit={handleSubmitUniqueJerseyForm}
					/>
				</>
			)}
		</>
	);
};

export default JerseySelection;
