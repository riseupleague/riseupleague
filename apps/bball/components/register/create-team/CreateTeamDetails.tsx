"use client";

import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@ui/components/card";
import { Button } from "@ui/components/button";

const CreateTeamDetails = ({
	setIsSummary,
	validateForm,
	setFormErrors,
	formErrors,
	formData,
	setFormData,
}) => {
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			setIsSummary(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else {
			console.log(Object.keys(errors));
			setFormErrors(errors);
		}
	};

	const [code, setCode] = useState("");

	useEffect(() => {
		const generateCode = () => {
			const characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			let generatedCode = "";
			for (let i = 0; i < 5; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				generatedCode += characters[randomIndex];
			}
			setCode(generatedCode);
			setFormData({ ...formData, teamCode: generatedCode });
		};
		generateCode();
	}, []);
	return (
		<>
			<Link
				href="/register/create-team"
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

			<form onSubmit={handleFormSubmit}>
				<h3 className="mt-10 text-3xl font-medium uppercase">
					Fill up your team details:
				</h3>

				<Card className="my-6 flex items-center justify-between bg-[#111827]">
					<CardContent className="w-full space-y-4 px-4 py-6">
						<section>
							<Label className="mb-3 block uppercase">Team Name</Label>
							<Input
								type="text"
								placeholder="ex: Lakers"
								className={`bg-[#111827] py-4 ${
									formErrors.teamName ? "border-primary" : "border-neutral-500"
								}`}
								value={formData.teamName}
								onChange={(e) =>
									setFormData({ ...formData, teamName: e.target.value })
								}
							/>
						</section>
						<section>
							<Label className="mb-3 block uppercase">
								Short Team Name (Max 4 Letters)
							</Label>
							<Input
								type="text"
								className={`bg-[#111827] py-4 ${
									formErrors.teamNameShort
										? "border-primary"
										: "border-neutral-500"
								}`}
								value={formData.teamNameShort}
								placeholder="ex: LAL"
								onChange={(e) => {
									const inputValue = e.target.value;
									if (inputValue.length <= 4) {
										setFormData({
											...formData,
											teamNameShort: inputValue,
										});
										// Clear any previous error message
										setFormErrors({ ...formErrors, teamNameShort: "" });
									} else {
										// Set an error message if the input has more than 4 characters
										setFormErrors({
											...formErrors,
											teamNameShort: "Max 4 letters allowed",
										});
									}
								}}
							/>
						</section>
						<section>
							<Label className="mb-3 block uppercase">Team Code</Label>
							<Input
								type="text"
								placeholder="ex: LAL123"
								className={`bg-[#111827] py-4 ${
									formErrors.teamCode ? "border-primary" : "border-neutral-500"
								}`}
								value={formData.teamCode}
								onChange={(e) =>
									setFormData({ ...formData, teamCode: e.target.value })
								}
							/>
							<p className="mt-2 text-xs text-neutral-500">
								Team code is randomly generated and will be used by your
								teammates to join the roster.
							</p>
						</section>
					</CardContent>
				</Card>

				<h3 className="mt-10 text-3xl font-medium uppercase">
					Team Captain Details:
				</h3>

				<Card className="my-6 flex items-center justify-between bg-[#111827]">
					<CardContent className="w-full space-y-4 px-4 py-6">
						<section>
							<Label className="mb-3 block uppercase">Player Name</Label>
							<Input
								type="text"
								className="border-neutral-500 bg-[#111827] py-4"
								placeholder="ex. John Doe"
								value={formData.playerName}
								onChange={(e) =>
									setFormData({ ...formData, playerName: e.target.value })
								}
							/>
						</section>
						<section>
							<Label className="mb-3 block uppercase">Instagram Handle</Label>
							<Input
								type="text"
								placeholder="ex: @riseup.bball"
								className="border-neutral-500 bg-[#111827] py-4"
								value={formData.instagram}
								onChange={(e) =>
									setFormData({ ...formData, instagram: e.target.value })
								}
							/>
							<p className="mt-2 text-xs text-neutral-500">
								INSTAGRAM HANDLE WILL BE USED TO TAG YOU FOR HIGHLIGHTS AND
								PHOTOS. WE WILL ALSO CONTACT YOU THROUGH INSTAGRAM.
							</p>
						</section>
						<section>
							<Label className="mb-3 block uppercase">Phone Number</Label>
							<Input
								type="text"
								className={`bg-[#111827] py-4 ${
									formErrors.phoneNumber
										? "border-primary"
										: "border-neutral-500"
								}`}
								value={formData.phoneNumber}
								placeholder="ex: 123-123-1234"
								onChange={(e) =>
									setFormData({
										...formData,
										phoneNumber: e.target.value,
									})
								}
							/>
							<p className="mt-2 text-xs uppercase text-neutral-500">
								*We will use your phone number if your instagram is not
								available for communication. We would like to keep in constant
								communication with you that way we are always on the same page.
							</p>
						</section>
					</CardContent>
				</Card>

				{/* Error messages */}
				{formErrors.teamName && (
					<p className="text-primary rounded-md p-2">{formErrors.teamName}</p>
				)}

				{formErrors.teamNameShort && (
					<p className="text-primary rounded-md p-2">
						{formErrors.teamNameShort}
					</p>
				)}
				{formErrors.teamCode && (
					<p className="text-primary rounded-md p-2">{formErrors.teamCode}</p>
				)}
				{formErrors.phoneNumber && (
					<p className="text-primary rounded-md p-2">
						{formErrors.phoneNumber}
					</p>
				)}
				<div className="mt-10 flex justify-end">
					<Button type="submit">Continue</Button>
				</div>
			</form>
		</>
	);
};

export default CreateTeamDetails;
