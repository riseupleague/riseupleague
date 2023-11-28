"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@ui/components/dialog";
import { Button } from "@ui/components/button";

const PleaseCreateYourTeamDialog = ({ open, onOpenChange }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-neutral-800 text-white sm:max-w-md">
				<DialogHeader className="text-center">
					<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
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
						Create Or Join A Team To Select Jersey
					</DialogTitle>

					<DialogDescription className="text-primary text-center text-xs">
						<span className="text-2xl font-bold uppercase">
							REGISTER A TEAM
						</span>{" "}
						in order to access and customize this jersey.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default function JerseySelection({ team }) {
	console.log(team);
	const [selectedEdition, setSelectedEdition] = useState("");
	const [isEditionSelected, setIsEditionSelected] = useState(false);

	const [numOfJersey, setNumOfJersey] = useState(0);
	const [open, setOpen] = useState(false);
	const [imageErrors, setImageErrors] = useState(
		Array(numOfJersey).fill(false)
	);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	const handleImageError = (index) => {
		const updatedErrors = [...imageErrors];
		updatedErrors[index] = true;
		setImageErrors(updatedErrors);
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
							<span className="font-barlow text-3xl uppercase">
								Retro edition
							</span>
							<p className="text-lg">
								Lorem ipsum dolor sit amet consectetur. Duis nec risus lorem
								nisi.
							</p>
						</button>

						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(8);
								setSelectedEdition("original");
							}}
							className="flex flex-col gap-5 rounded-md bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-3xl uppercase">
								original edition
							</span>
							<p className="text-lg">
								Lorem ipsum dolor sit amet consectetur. Duis nec risus lorem
								nisi.
							</p>
						</button>

						<button
							onClick={() => {
								setIsEditionSelected(true);
								setNumOfJersey(10);
								setSelectedEdition("classic");
							}}
							className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
						>
							<span className="font-barlow text-3xl uppercase">
								Classic edition
							</span>
							<p className="text-lg">
								Lorem ipsum dolor sit amet consectetur. Duis nec risus lorem
								nisi.
							</p>
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
						{selectedEdition} Edition
					</h3>
					<div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
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
					</div>
					<PleaseCreateYourTeamDialog open={open} onOpenChange={setOpen} />
				</>
			)}
		</>
	);
}
