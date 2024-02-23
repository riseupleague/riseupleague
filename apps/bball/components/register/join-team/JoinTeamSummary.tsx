import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@ui/components/button";
import { Loader2 } from "lucide-react";

const CreateTeamSummary = ({
	setIsSummary,
	division,
	formData,
	handleCreateTeamAndPlayer,
	isLoader,
}) => {
	// instalment payments dates
	// Function to convert a date to Eastern Standard Time (EST)
	const convertToEST = (date) => {
		const estOffset = -5 * 60; // Eastern Standard Time offset in minutes
		const utc = date.getTime() + date.getTimezoneOffset() * 60000;
		return new Date(utc + 60000 * estOffset);
	};

	// Get the original first payment date in EST
	const originalFirstPaymentDate = convertToEST(new Date());

	// Calculate the second payment date (2 weeks after the first payment)
	const secondPaymentDate = new Date(originalFirstPaymentDate);
	secondPaymentDate.setDate(originalFirstPaymentDate.getDate() + 14); // Add 14 days

	// Calculate the third payment date (4 weeks after the first payment)
	const thirdPaymentDate = new Date(originalFirstPaymentDate);
	thirdPaymentDate.setDate(originalFirstPaymentDate.getDate() + 28); // Add 28 days

	// Calculate the fourth payment date (6 weeks after the first payment)
	const fourthPaymentDate = new Date(originalFirstPaymentDate);
	fourthPaymentDate.setDate(originalFirstPaymentDate.getDate() + 42); // Add 42 days

	// Format the dates for display
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	// Now you can use firstPayment, secondPayment, thirdPayment, and fourthPayment as needed
	const firstPayment = originalFirstPaymentDate.toLocaleDateString(
		"en-US",
		options
	);
	const secondPayment = secondPaymentDate.toLocaleDateString("en-US", options);
	const thirdPayment = thirdPaymentDate.toLocaleDateString("en-US", options);
	const fourthPayment = fourthPaymentDate.toLocaleDateString("en-US", options);

	const convertMilitaryToRegularTime = (militaryTime) => {
		if (militaryTime) {
			// Parse the military time
			const [hours, minutes] = militaryTime.split(":").map(Number);

			// Determine whether it's morning or afternoon
			const period = hours < 12 ? "AM" : "PM";

			// Convert hours to 12-hour format
			const regularHours = hours % 12 || 12;

			// Format the result
			const regularTime = `${regularHours}:${String(minutes).padStart(
				2,
				"0"
			)} ${period}`;

			return regularTime;
		}
	};
	return (
		<>
			{" "}
			<button
				onClick={() => setIsSummary(false)}
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
			<h3 className="my-10  text-3xl uppercase">Summary:</h3>
			<div className="flex flex-col gap-10 md:flex-row">
				<div className="w-full  md:w-3/4">
					<div className="flex items-start  gap-4  border-b border-t py-4">
						<div>
							<Image
								src={"/images/register/createTeam.jpg"}
								alt="create a team image"
								width={250}
								height={250}
							/>
						</div>
						<div className="flex flex-col">
							<p className="text-md flex flex-col md:flex-row md:gap-4 md:text-3xl">
								<span>Create a Team: {formData.teamName}</span>
								<span>Division: {division.divisionName}</span>
							</p>
							<p className="text-md">Team Captain: {formData.playerName}</p>
							<p>{division.location}</p>
							<p>
								{convertMilitaryToRegularTime(division.startTime)} -{" "}
								{convertMilitaryToRegularTime(division.endTime)}
							</p>
							<p>{division.day}</p>
							<p className="mb-10 mt-2">{division.description}</p>
							{division.earlyBirdOpen ? (
								<p className="text-right">
									Early Bird Registration Fee: ${division.earlyBirdPrice}
								</p>
							) : (
								<p className="text-right">
									Registration Fee: ${division.regularPrice}
								</p>
							)}
						</div>
					</div>
				</div>
				<Card className="w-full md:w-1/4">
					<CardHeader>
						<CardTitle>Please Check All Boxes Before Proceeding.</CardTitle>
					</CardHeader>
					<CardContent>
						<section className="flex flex-col gap-3">
							<div className="flex items-center">
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									// checked={formData.termsChecked}
								/>
								<Label
									htmlFor="checkBoxTerms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I have read and agree to the{" "}
									<Link
										className="text-primary transition-all hover:underline"
										href="/terms-and-conditions"
										target="_blank"
									>
										Terms and Conditions
									</Link>
									.
								</Label>
							</div>
							<div className="flex items-center">
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									// checked={formData.refundChecked}
								/>
								<Label
									htmlFor="checkBoxRefund"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									I have read and agree to the{" "}
									<Link
										className="text-primary transition-all hover:underline"
										href="/refund-policy"
										target="_blank"
									>
										Refund Policy
									</Link>
									.
								</Label>
							</div>
						</section>
						{division.earlyBirdOpen ? (
							<>
								<section>
									<p className="mt-4">Overall Total:</p>
									<p>${division.earlyBirdPrice}</p>
									<Button
										className="mt-10  flex w-full justify-center text-center"
										onClick={() => {
											division.earlyBirdOpen
												? handleCreateTeamAndPlayer(
														division.earlyBirdId,
														"full"
												  )
												: handleCreateTeamAndPlayer(
														division.regularPriceFullId,
														"full"
												  );
										}}
									>
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Pay in full"
										)}
									</Button>
								</section>
								<section>
									<p className="mt-4">Pay For My Whole Team:</p>
									<p>$2000</p>
									<Button
										className="mt-10  flex w-full justify-center text-center"
										onClick={() => {
											handleCreateTeamAndPlayer(division.earlyBirdId, "full");
										}}
									>
										{isLoader ? (
											<Loader2 className=" h-4 w-4 animate-spin" />
										) : (
											"Pay for whole team"
										)}
									</Button>
								</section>
							</>
						) : (
							<section>
								<p className="mt-4">Overall Total:</p>
								<p>${division.regularPrice}</p>
							</section>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default CreateTeamSummary;
