"use client";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import Link from "next/link";
import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
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
				behavior: "smooth", // This enables smooth scrolling
			});
		} else {
			console.log(Object.keys(errors));
			setFormErrors(errors);
		}
	};
	return (
		<>
			<Link
				href={"/register/create-team"}
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
				<h3 className="mt-10  text-3xl uppercase">
					Fill up your team details:
				</h3>

				<Card className="my-4 flex items-center justify-between">
					<CardHeader className="w-full">
						<CardContent>
							<section className="my-3">
								<Label className="mb-3 block uppercase">Team Name</Label>
								<Input
									type="text"
									placeholder="ex: Lakers"
									className={`bg-neutral-700 py-[16px] ${
										formErrors.teamName
											? "border-primary"
											: "border-neutral-500"
									}`}
									value={formData.teamName}
									onChange={(e) =>
										setFormData({ ...formData, teamName: e.target.value })
									}
								/>
							</section>
							<section className="my-3">
								<Label className="mb-3 block uppercase">Team Name Short</Label>
								<Input
									type="text"
									className={`bg-neutral-700 py-[16px] ${
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
							<section className="my-3">
								<Label className="mb-3 block uppercase">Team Code</Label>
								<Input
									type="text"
									placeholder="ex: LAL123"
									className={`bg-neutral-700 py-[16px] ${
										formErrors.teamCode
											? "border-primary"
											: "border-neutral-500"
									}`}
									value={formData.teamCode}
									onChange={(e) =>
										setFormData({ ...formData, teamCode: e.target.value })
									}
								/>
							</section>
						</CardContent>
					</CardHeader>
				</Card>

				<h3 className="mt-10  text-3xl uppercase">Team Captain Details:</h3>

				<Card className="my-4 flex items-center justify-between">
					<CardHeader className="w-full">
						<CardContent>
							<section className="my-3">
								<Label className="mb-3 block uppercase">Player Name</Label>
								<Input
									type="text"
									className={`bg-neutral-700 py-[16px] `}
									value={formData.playerName}
									onChange={(e) =>
										setFormData({ ...formData, playerName: e.target.value })
									}
								/>
							</section>
							<section className="my-3">
								<Label className="mb-3 block uppercase">Instagram Handle</Label>
								<Input
									type="text"
									placeholder="ex: @riseup.bball"
									className={`bg-neutral-700 py-[16px] `}
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
							<section className="my-3">
								<Label className="mb-3 block uppercase">Phone Number</Label>
								<Input
									type="text"
									className={`bg-neutral-700 py-[16px] ${
										formErrors.phoneNumber
											? "border-primary"
											: "border-neutral-500"
									}`}
									value={formData.phoneNumber}
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
									communication with you that way we are always on the same
									page.
								</p>
							</section>
						</CardContent>
					</CardHeader>
				</Card>

				{/* Error messages */}
				{formErrors.teamName && (
					<p className="text-primary  rounded-md p-2">{formErrors.teamName}</p>
				)}

				{formErrors.teamNameShort && (
					<p className="text-primary  rounded-md p-2">
						{formErrors.teamNameShort}
					</p>
				)}
				{formErrors.teamCode && (
					<p className="text-primary  rounded-md p-2">{formErrors.teamCode}</p>
				)}
				{formErrors.phoneNumber && (
					<p className="text-primary  rounded-md p-2">
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
