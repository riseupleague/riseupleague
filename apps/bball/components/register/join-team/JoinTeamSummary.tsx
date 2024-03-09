"use client";
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
import getStripe from "@/utils/checkout";
import { Input } from "@ui/components/input";
import BackButton from "@/components/general/buttons/BackButton";

interface CheckboxErrors {
	termsChecked?: string;
	refundChecked?: string;
	playerName?: string;
	phoneNumber?: string;
}

const JoinTeamSummary = ({ team, session }) => {
	console.log(team);
	const teamCaptain = team.players.find(
		(player) => player.teamCaptain === true
	);
	const division = team.division;
	const [isLoader, setIsLoader] = useState(false);

	const [terms, setTerms] = useState(false);
	const [refund, setRefund] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const [instagram, setInstagram] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [checkboxErrors, setCheckboxErrors] = useState<CheckboxErrors>({});
	const validateForm = (): CheckboxErrors => {
		const errors: CheckboxErrors = {};

		if (!terms) {
			errors.termsChecked = "You must agree to the terms and conditions";
		}

		if (!refund) {
			errors.refundChecked = "You must agree to the refund policy";
		}

		if (playerName === "") {
			errors.playerName = "Player name is required.";
		}

		if (playerName === "") {
			errors.playerName = "Player name is required.";
		}

		if (phoneNumber === "") {
			errors.phoneNumber = "Phone number is required";
		}

		const validPhone = validatePhoneNumber(phoneNumber);

		if (!validPhone) {
			errors.phoneNumber = "Invalid Phone number";
		}

		return errors;
	};

	const validatePhoneNumber = (phoneNumber) => {
		// Regular expression to match a valid Canadian phone number
		const phoneRegex =
			/^(?:\+?1[- ]?)?\(?(?:[2-9][0-9]{2})\)?[- ]?(?:[2-9][0-9]{2})[- ]?(?:[0-9]{4})$/;

		// Check if the phone number matches the regular expression
		if (phoneRegex.test(phoneNumber)) {
			return true; // Phone number is valid
		} else {
			return false; // Phone number is invalid
		}
	};
	const handleCreateTeamAndPlayer = async (
		itemPriceId: string,
		payment: string
	) => {
		setIsLoader(true);
		const errors = validateForm();

		try {
			const formObject = {
				status: "joinTeam",
				team: team._id,
				payment: payment,
				instagram,
				phoneNumber,
				playerName,
				email: session.user.email,
				teamName: team.teamName,
				division: division._id,
				divisionName: division.divisionName,
			};

			if (Object.keys(errors).length === 0) {
				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
			} else {
				setIsLoader(false);

				setCheckboxErrors(errors);
			}
		} catch (error) {
			console.error("Error creating team:", error);
		}
	};

	const handleFree = (e) => {
		e.preventDefault();
		const errors = validateForm();
		if (Object.keys(errors).length === 0) {
			handleCreateTeamAndPlayer(team.season.freePrice, "full");
		} else {
			setCheckboxErrors(errors);
		}
	};

	const handlePay = (e) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			division.earlyBirdOpen
				? handleCreateTeamAndPlayer(division.earlyBirdId, "full")
				: handleCreateTeamAndPlayer(division.regularPriceFullId, "full");
		} else {
			setCheckboxErrors(errors);
		}
	};

	const redirectToCheckout = async (items, formObject) => {
		try {
			const response = await fetch("/api/checkout-sessions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items, formObject: JSON.stringify(formObject) }),
			});

			if (response.ok) {
				const { session } = await response.json();
				const stripe = await getStripe();

				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				console.error("Failed to create Stripe checkout session:", response);
			}
		} catch (error) {
			console.error("Error creating Stripe checkout session:", error);
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
			<BackButton href="/register/join-team" />
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
						<div className="flex w-full flex-col">
							<p className="text-md flex flex-col md:flex-row md:gap-4 md:text-3xl">
								<span>Team: {team.teamName}</span>
								<span>Division: {division?.divisionName}</span>
							</p>
							<p className="text-md">Team Captain: {teamCaptain?.playerName}</p>
							<p>{division?.location}</p>
							<p>
								{convertMilitaryToRegularTime(division?.startTime)} -{" "}
								{convertMilitaryToRegularTime(division?.endTime)}
							</p>
							<p>{division?.day}</p>
							<p className="mb-10 mt-2">{division?.description}</p>
							{division?.earlyBirdOpen ? (
								<p className="text-right">
									Early Bird Registration Fee: ${division?.earlyBirdPrice}
								</p>
							) : (
								<p className="text-right">
									Registration Fee: ${division?.regularPrice}
								</p>
							)}
						</div>
					</div>
				</div>
				<Card className="w-full md:w-1/4">
					<CardHeader>
						<CardTitle>
							Please input your details and check All Boxes Before Proceeding.
						</CardTitle>
					</CardHeader>
					<CardContent>
						<section className="my-3 ">
							<Label className="mb-3 block uppercase">Player Name:</Label>
							<Input
								type="text"
								className={`bg-neutral-700 py-[16px] ${
									checkboxErrors.playerName
										? "border-primary"
										: "border-neutral-500"
								}`}
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
							/>
						</section>

						<section className="my-3">
							<Label className="mb-3 block uppercase">Instagram Handle</Label>
							<Input
								type="text"
								placeholder="ex: @riseup.bball"
								className={`bg-neutral-700 py-[16px] `}
								value={instagram}
								onChange={(e) => setInstagram(e.target.value)}
							/>
							<p className="mt-2 text-xs text-neutral-500">
								INSTAGRAM HANDLE WILL BE USED TO TAG YOU FOR HIGHLIGHTS AND
								PHOTOS. WE WILL ALSO CONTACT YOU THROUGH INSTAGRAM.
							</p>
						</section>
						<section className="my-3 mb-6">
							<Label className="mb-3 block uppercase">Phone Number</Label>
							<Input
								type="text"
								className={`bg-neutral-700 py-[16px] ${
									checkboxErrors.phoneNumber
										? "border-primary"
										: "border-neutral-500"
								}`}
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
							<p className="mt-2 text-xs uppercase text-neutral-500">
								*We will use your phone number if your instagram is not
								available for communication. We would like to keep in constant
								communication with you that way we are always on the same page.
							</p>
						</section>
						<section className="flex flex-col gap-3">
							<div className="flex items-center">
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									onCheckedChange={() => setTerms(true)}
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
									onCheckedChange={() => setRefund(true)}
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
						{team.paid === true ? (
							<>
								<section>
									<p className="mt-4">Overall Total:</p>
									<p className="text-primary text-3xl uppercase">Free</p>
									<Button
										className="mt-10  flex w-full justify-center text-center"
										onClick={handleFree}
									>
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Join for free"
										)}
									</Button>
								</section>
							</>
						) : (
							<>
								<section>
									<p className="mt-4">Overall Total:</p>
									<p className="text-4xl">
										$
										{division?.earlyBirdOpen
											? division?.earlyBirdPrice
											: division?.regularPrice}
									</p>
									<Button
										className="mt-10  flex w-full justify-center text-center"
										onClick={handlePay}
									>
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Pay Now"
										)}
									</Button>
								</section>
							</>
						)}

						{/* Error messages */}

						{checkboxErrors.playerName && (
							<p className="text-primary text-sm">
								{checkboxErrors.playerName}
							</p>
						)}

						{checkboxErrors.phoneNumber && (
							<p className="text-primary text-sm">
								{checkboxErrors.phoneNumber}
							</p>
						)}
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

export default JoinTeamSummary;
