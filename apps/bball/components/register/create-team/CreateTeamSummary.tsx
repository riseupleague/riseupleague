import React, { useState } from "react";
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
import LocationIcon from "@/components/icons/LocationIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import CalendarRegisterIcon from "@/components/icons/CalendarRegisterIcon";
import { Separator } from "@ui/components/separator";

interface CheckboxErrors {
	termsChecked?: string;
	refundChecked?: string;
}

const CreateTeamSummary = ({
	setIsSummary,
	division,
	formData,
	handleCreateTeamAndPlayer,
	isLoader,
}) => {
	const [terms, setTerms] = useState(false);
	const [refund, setRefund] = useState(false);

	const [checkboxErrors, setCheckboxErrors] = useState<CheckboxErrors>({});
	const validateForm = (): CheckboxErrors => {
		const errors: CheckboxErrors = {};

		if (!terms) {
			errors.termsChecked = "You must agree to the terms and conditions";
		}

		if (!refund) {
			errors.refundChecked = "You must agree to the refund policy";
		}

		return errors;
	};

	const handlePayIndividual = (e) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			division.earlyBirdOpen
				? handleCreateTeamAndPlayer(division.earlyBirdId, "full")
				: handleCreateTeamAndPlayer(division.regularPriceFullId, "full");
		} else {
			console.log(Object.keys(errors));
			setCheckboxErrors(errors);
		}
	};

	const handlePayTeam = (e) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			handleCreateTeamAndPlayer(division.season.fullTeamPrice, "teamPaidFull");
		} else {
			console.log(Object.keys(errors));
			setCheckboxErrors(errors);
		}
	};

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
			<h3 className="my-10 text-3xl uppercase">Summary</h3>
			<div className="flex flex-col gap-10 md:flex-row">
				<div className="w-full md:w-3/4">
					<div className="flex items-start gap-4 border-b border-t border-[#374151] py-8">
						<div>
							<Image
								src="/images/register/createTeam.jpg"
								alt="create a team image"
								width={250}
								height={250}
							/>
						</div>
						<div className="flex w-full flex-col">
							<p className="mb-2.5 flex flex-col text-xl text-neutral-100 md:flex-row md:gap-4 md:text-2xl">
								<span>Create a Team: {formData.teamName}</span>
							</p>
							<p className="mb-2.5">
								Division:{" "}
								<span className="capitalize">{division?.divisionName}</span>
							</p>
							<p className="mb-4 text-xl">
								Team Captain:{" "}
								<span className="capitalize">{formData.playerName}</span>
							</p>
							<div className="mb-3 flex items-center gap-1">
								<LocationIcon />
								<p className="text-xl">{division.location}</p>
							</div>
							{/* <div className="mb-3 flex items-center gap-1">
								<ClockIcon />
								<p className="text-xl">
									{convertMilitaryToRegularTime(division.startTime)} -{" "}
									{convertMilitaryToRegularTime(division.endTime)}
								</p>
							</div> */}
							<div className="mb-6 flex items-center gap-1">
								<CalendarRegisterIcon />
								<p className="text-xl">{division.day}</p>
							</div>
							<p className="mb-10 mt-2 text-xl">{division.description}</p>
							{division.earlyBirdOpen ? (
								<p className="text-right">
									Early Bird Registration Fee: $
									{division.earlyBirdPrice + ".00"}
								</p>
							) : (
								<p className="text-right">
									Registration Fee: ${division.regularPrice + ".00"}
								</p>
							)}
						</div>
					</div>
				</div>
				<Card className="w-full md:w-1/4">
					<CardHeader>
						<CardTitle className="text-base">
							Please Check All Boxes Before Proceeding.
						</CardTitle>
					</CardHeader>
					<CardContent>
						<section className="flex flex-col gap-3">
							<div className="flex items-center">
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={terms}
									onCheckedChange={() => setTerms(true)}
								/>
								<Label
									htmlFor="checkBoxTerms"
									className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
									checked={refund}
									onCheckedChange={() => setRefund(true)}
								/>
								<Label
									htmlFor="checkBoxRefund"
									className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
									<Separator className="my-4 border-b border-neutral-600" />
									<p className="my-4 text-base font-bold">Overall Total:</p>
									<p className="mb-4 text-base">
										${division.earlyBirdPrice + ".00"}{" "}
										<span className="text-sm">+ tax</span>
									</p>
									<Button
										className="flex w-full justify-center text-center text-sm font-semibold capitalize"
										onClick={handlePayIndividual}
									>
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Pay in full"
										)}
									</Button>
								</section>

								<Separator className="my-4 border-b border-neutral-600" />

								<section>
									<p className="font-barlow my-4 text-base capitalize">
										Pay For My Whole Team:
									</p>
									<p className="mb-4 text-base">$2000.00</p>
									<Button
										className="mt-2 flex w-full justify-center text-center text-sm font-semibold capitalize"
										onClick={handlePayTeam}
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

						{/* Error messages */}
						{checkboxErrors.termsChecked && (
							<p className="text-primary text-sm">
								{checkboxErrors.termsChecked}
							</p>
						)}

						{checkboxErrors.refundChecked && (
							<p className="text-primary text-sm">
								{checkboxErrors.refundChecked}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default CreateTeamSummary;
