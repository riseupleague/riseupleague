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
import { Separator } from "@ui/components/separator";
import { BsArrowRight } from "react-icons/bs";
import { joinTeamSchema } from "@/schemas";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";

type PlayerFormValues = z.infer<typeof joinTeamSchema>;

const JoinTeamSummary = ({ team, session }) => {
	const [playerSelected, setPlayerSelected] = useState({
		_id: "",
		playerName: "",
	});
	const [isLoader, setIsLoader] = useState(false);
	const [isStripeError, setIsStripeError] = useState(false);

	const defaultValues: PlayerFormValues = {
		playerName: "",
		instagram: "",
		phoneNumber: "",
		jerseySize: "",
		jerseyName: "",
		jerseyNumber: "",
		agreeToTerms: false,
		agreeToRefundPolicy: false,
		receiveNews: false,
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<PlayerFormValues>({
		resolver: zodResolver(joinTeamSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<PlayerFormValues> = (data) => {
		const playerDetails = {
			playerName: data.playerName,
			instagram: data.instagram,
			phoneNumber: data.phoneNumber,
			jerseySize: data.jerseySize,
			jerseyName: data.jerseyName,
			jerseyNumber: data.jerseyNumber,
			agreeToTerms: data.agreeToTerms,
			agreeToRefundPolicy: data.agreeToRefundPolicy,
			receiveNews: data.receiveNews,
		};
		// Add further actions like saving the data or submitting it to an API

		const metadata = {
			...playerDetails,
			status: "joinTeam",
			payment: "full",
			email: session.user.email,
			playerId: playerSelected._id,
			division: team?.division._id,
			teamName: team?.teamName,
			divisionName: team?.division?.divisionName,
		};

		const itemPriceId = team.division?.earlyBirdOpen
			? team.division?.earlyBirdId
			: team.division?.regularPriceId;

		if (team.paid) {
			redirectToCheckout(
				[{ price: team.season.freePrice, quantity: 1 }],
				metadata
			);
		} else {
			redirectToCheckout([{ price: itemPriceId, quantity: 1 }], metadata);
		}
	};

	const redirectToCheckout = async (items, formObject) => {
		try {
			setIsLoader(true);
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
				setIsLoader(false);
				await stripe.redirectToCheckout({ sessionId: session.id });
			} else {
				setIsLoader(false);
				setIsStripeError(true);
				console.error("Failed to create Stripe checkout session:", response);
			}
		} catch (error) {
			console.error("Error creating Stripe checkout session:", error);
		}
	};

	return (
		<>
			{playerSelected._id === "" && (
				<div>
					<h3 className="my-10  text-3xl uppercase">Choose your name:</h3>

					{team.players.map((player) => {
						if (!player.user)
							return (
								<Button
									key={player._id}
									onClick={() => {
										setPlayerSelected(player);
									}}
									className="relative my-1 flex w-full flex-col items-start rounded border border-neutral-600 bg-[#111827] p-4 text-neutral-100 transition-all hover:bg-neutral-600"
								>
									<h5 className="mb-3">{player.playerName}</h5>

									<div className="absolute right-6 top-1/2">
										<BsArrowRight className="size-6 -translate-y-1 text-neutral-300" />
									</div>
								</Button>
							);
					})}
					<Button className="mt-10" variant="secondary" asChild>
						<Link href={"/register/join-team"}>Back</Link>
					</Button>
				</div>
			)}

			{playerSelected._id !== "" && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
						<h4 className="text-center text-xl uppercase">Team Summary</h4>
						<ul>
							<li className="text-lg">Team Name: {team.teamName}</li>
							<li className="text-lg">
								Team Captain: {team.teamCaptain?.playerName}
							</li>
							<li className="text-lg">
								Division: {team.division?.divisionName}
							</li>
							<li className="text-lg">Location: {team.division?.location}</li>
							<li className="text-lg">
								Game Time:{" "}
								{team.division?.startTime === "00:00"
									? "TBD"
									: `${convertMilitaryToRegularTime(team.division?.startTime)} - ${convertMilitaryToRegularTime(team.division?.endTime)}`}
								<p className="text-sm text-neutral-200">
									Game times are subject to change
								</p>
							</li>
							<li className="text-lg">Game Day: {team.division?.day}</li>
						</ul>
					</div>
					<p className="mt-5 text-center text-xl">
						Hello {playerSelected.playerName}, please fill out the rest of the
						form. Thank you.
					</p>
					<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
						<div className="space-y-3">
							<Label htmlFor="playerName" className="text-xl uppercase">
								Full Name
							</Label>
							<Input
								variant="form"
								type="text"
								name="playerName"
								placeholder="Enter your full name"
								{...register("playerName")}
							/>
							{errors.playerName && (
								<p className="text-red-600">{errors.playerName.message}</p>
							)}
						</div>
						<div className="space-y-3">
							<Label htmlFor="instagram" className="text-xl uppercase">
								Instagram
							</Label>
							<Input
								variant="form"
								type="text"
								name="instagram"
								placeholder="Enter your player's name"
								{...register("instagram")}
							/>
							{errors.instagram && (
								<p className="text-red-600">{errors.instagram.message}</p>
							)}
						</div>

						<div className="space-y-3">
							<Label htmlFor="phoneNumber" className="text-xl uppercase">
								Phone Number
							</Label>
							<Input
								variant="form"
								type="text"
								name="phoneNumber"
								placeholder="ex: 123-123-1234"
								{...register("phoneNumber")}
							/>
							{errors.phoneNumber && (
								<p className="text-red-600">{errors.phoneNumber.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								*We will use your phone number if your instagram is not
								available for communication. We would like to keep in constant
								communication with you that way we are always on the same page.
							</p>
						</div>

						<div className="space-y-3">
							<label htmlFor="jerseySize" className="text-xl uppercase">
								What is your jersey size?{" "}
								<Link
									href={"/pdf/jersey-size-chart.pdf"}
									className="text-sm lowercase underline"
									target="_blank"
								>
									size guide
								</Link>
							</label>
							<select
								{...register("jerseySize", {
									required: "Jersey size is required",
								})}
								id="jerseySize"
								className="focus:ring-ring ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center rounded-md border border-neutral-300 bg-[#111827] p-4 text-lg font-normal transition-colors file:border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="" disabled>
									Select your size
								</option>
								<option value="SM">SM</option>
								<option value="MD">MD</option>
								<option value="LG">LG</option>
								<option value="XL">XL</option>
								<option value="XXL">XXL</option>
								<option value="XXXL">XXXL</option>
								<option value="XXXXL">XXXXL</option>
							</select>
							{errors.jerseySize && (
								<p className="text-red-600">{errors.jerseySize.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Note: Your jersey size cannot be reordered.{" "}
								<a
									href="#"
									className="underline transition-all hover:text-neutral-100"
								>
									Read more here
								</a>
							</p>
						</div>

						<div className="space-y-3">
							<Label htmlFor="jerseyName" className="text-xl uppercase">
								What’s your custom jersey Name?
							</Label>
							<Input
								variant="form"
								type="text"
								name="jerseyName"
								placeholder="Enter custom jersey name"
								{...register("jerseyName")}
							/>
							{errors.jerseyName && (
								<p className="text-red-600">{errors.jerseyName.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Please ensure that spelling is correct. This cannot be changed
								later.
							</p>
						</div>
						<div className="space-y-3">
							<Label htmlFor="jerseyNumber" className="text-xl uppercase">
								What’s your Jersey Number?
							</Label>
							<Input
								variant="form"
								type="text"
								name="jerseyNumber"
								placeholder="Enter jersey number"
								{...register("jerseyNumber")}
							/>
							{errors.jerseyNumber && (
								<p className="text-red-600">{errors.jerseyNumber.message}</p>
							)}
							<p className="text-sm text-neutral-300">
								Please ensure this is the number that your want. This cannot be
								changed later.
							</p>
						</div>
					</div>

					<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
						<h4 className="text-center text-xl uppercase">
							Registration Fee Allocation
						</h4>
						<ul>
							<li className="text-xl">$50 + Tax For Jersey Order</li>
							<li className="text-xl">$50 + Tax For Gym Fees</li>
						</ul>
						<p className="mt-2 flex flex-col text-neutral-200">
							<span>Note: There will be no refunds for this transactions.</span>
							<Link
								href={"/refund-policy"}
								target="_blank"
								className="underline"
							>
								Read Refund Policy
							</Link>
						</p>
					</div>

					<div className="my-4 rounded border border-neutral-600 bg-[#111827] px-4 py-6">
						<h4 className="text-center text-xl uppercase">Payment</h4>
						<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
						<div className="my-2 flex items-center">
							<Controller
								name="agreeToTerms"
								control={control}
								render={({ field }) => (
									<Checkbox
										id="checkBoxTerms"
										className="!mr-4 border-white"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
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
						{errors.agreeToTerms && (
							<p className="text-red-600">{errors.agreeToTerms.message}</p>
						)}
						<div className="my-2 flex items-center">
							<Controller
								name="agreeToRefundPolicy"
								control={control}
								render={({ field }) => (
									<Checkbox
										id="checkBoxRefund"
										className="!mr-4 border-white"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
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
						{errors.agreeToRefundPolicy && (
							<p className="text-red-600">
								{errors.agreeToRefundPolicy.message}
							</p>
						)}
						<div className="my-2 flex items-center">
							<Controller
								name="receiveNews"
								control={control}
								render={({ field }) => (
									<Checkbox
										id="checkBoxNews"
										className="!mr-4 border-white"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
							<Label
								htmlFor="checkBoxNews"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I want to receive emails for the latest news about Rise Up.
							</Label>
						</div>

						<div className="mt-5">
							<p className="text-xl uppercase">Total:</p>
							{team.paid === true ? (
								<p className="text-2xl font-semibold">Free</p>
							) : (
								<>
									{team.division?.earlyBirdOpen ? (
										<p className="text-2xl font-semibold">
											${team.division?.earlyBirdPrice} + tax
										</p>
									) : (
										<p>${team.division?.regularPrice} + tax</p>
									)}
								</>
							)}
						</div>
						{team.paid === true ? (
							<Button type="submit" className="mt-4 w-full">
								{isLoader ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Join for free"
								)}
							</Button>
						) : (
							<Button type="submit" className="mt-4 w-full">
								{isLoader ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Proceed to checkout"
								)}
							</Button>
						)}
					</div>

					<Button
						onClick={() =>
							setPlayerSelected({
								_id: "",
								playerName: "",
							})
						}
						className="mt-10 w-full"
						variant="secondary"
					>
						Back
					</Button>
				</form>
			)}
		</>
	);
};

export default JoinTeamSummary;

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
// import { Checkbox } from "@ui/components/checkbox";
// import { Label } from "@ui/components/label";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@ui/components/button";
// import { Loader2 } from "lucide-react";
// import getStripe from "@/utils/checkout";
// import { Input } from "@ui/components/input";
// import BackButton from "@/components/general/buttons/BackButton";
// import { Separator } from "@ui/components/separator";

// interface CheckboxErrors {
// 	termsChecked?: string;
// 	refundChecked?: string;
// 	playerName?: string;
// 	phoneNumber?: string;
// }

// const JoinTeamSummary = ({ team, session }) => {
// 	const teamCaptain = team.players.find(
// 		(player) => player.teamCaptain === true
// 	);
// 	const division = team.division;
// 	const [isLoader, setIsLoader] = useState(false);

// 	const [terms, setTerms] = useState(false);
// 	const [refund, setRefund] = useState(false);
// 	const [playerName, setPlayerName] = useState("");
// 	const [instagram, setInstagram] = useState("");
// 	const [phoneNumber, setPhoneNumber] = useState("");

// 	const [checkboxErrors, setCheckboxErrors] = useState<CheckboxErrors>({});
// 	const validateForm = (): CheckboxErrors => {
// 		const errors: CheckboxErrors = {};

// 		if (!terms) {
// 			errors.termsChecked = "You must agree to the terms and conditions";
// 		}

// 		if (!refund) {
// 			errors.refundChecked = "You must agree to the refund policy";
// 		}

// 		if (playerName === "") {
// 			errors.playerName = "Player name is required.";
// 		}

// 		if (playerName === "") {
// 			errors.playerName = "Player name is required.";
// 		}

// 		if (phoneNumber === "") {
// 			errors.phoneNumber = "Phone number is required";
// 		}

// 		const validPhone = validatePhoneNumber(phoneNumber);

// 		if (!validPhone) {
// 			errors.phoneNumber = "Invalid phone number.";
// 		}

// 		return errors;
// 	};

// 	const validatePhoneNumber = (phoneNumber) => {
// 		// Regular expression to match a valid Canadian phone number
// 		const phoneRegex =
// 			/^(?:\+?1[- ]?)?\(?(?:[2-9][0-9]{2})\)?[- ]?(?:[2-9][0-9]{2})[- ]?(?:[0-9]{4})$/;

// 		// Check if the phone number matches the regular expression
// 		if (phoneRegex.test(phoneNumber)) {
// 			return true; // Phone number is valid
// 		} else {
// 			return false; // Phone number is invalid
// 		}
// 	};
// 	const handleCreateTeamAndPlayer = async (
// 		itemPriceId: string,
// 		payment: string
// 	) => {
// 		setIsLoader(true);
// 		const errors = validateForm();

// 		try {
// 			const formObject = {
// 				status: "joinTeam",
// 				team: team._id,
// 				payment: payment,
// 				instagram,
// 				phoneNumber,
// 				playerName,
// 				email: session.user.email,
// 				teamName: team.teamName,
// 				division: division._id,
// 				divisionName: division.divisionName,
// 			};

// 			if (Object.keys(errors).length === 0) {
// 				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
// 			} else {
// 				setIsLoader(false);

// 				setCheckboxErrors(errors);
// 			}
// 		} catch (error) {
// 			console.error("Error creating team:", error);
// 		}
// 	};

// 	const handleFree = (e) => {
// 		e.preventDefault();
// 		const errors = validateForm();
// 		if (Object.keys(errors).length === 0) {
// 			handleCreateTeamAndPlayer(team.season.freePrice, "full");
// 		} else {
// 			setCheckboxErrors(errors);
// 		}
// 	};

// 	const handlePay = (e) => {
// 		e.preventDefault();
// 		const errors = validateForm();

// 		if (Object.keys(errors).length === 0) {
// 			division.earlyBirdOpen
// 				? handleCreateTeamAndPlayer(division.earlyBirdId, "full")
// 				: handleCreateTeamAndPlayer(division.regularPriceFullId, "full");
// 		} else {
// 			setCheckboxErrors(errors);
// 		}
// 	};

// 	const handlePayInstalments = (e) => {
// 		e.preventDefault();
// 		const errors = validateForm();

// 		if (Object.keys(errors).length === 0) {
// 			division.earlyBirdOpen
// 				? handleCreateTeamAndPlayer(division.earlyBirdId, "four")
// 				: handleCreateTeamAndPlayer(division.regularPriceInstalmentId, "four");
// 		} else {
// 			console.log(Object.keys(errors));
// 			setCheckboxErrors(errors);
// 		}
// 	};

// 	const redirectToCheckout = async (items, formObject) => {
// 		try {
// 			const response = await fetch("/api/checkout-sessions", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ items, formObject: JSON.stringify(formObject) }),
// 			});

// 			if (response.ok) {
// 				const { session } = await response.json();
// 				const stripe = await getStripe();

// 				await stripe.redirectToCheckout({ sessionId: session.id });
// 			} else {
// 				console.error("Failed to create Stripe checkout session:", response);
// 			}
// 		} catch (error) {
// 			console.error("Error creating Stripe checkout session:", error);
// 		}
// 	};

// 	// instalment payments dates
// 	// Function to convert a date to Eastern Standard Time (EST)
// 	const convertToEST = (date) => {
// 		const estOffset = -5 * 60; // Eastern Standard Time offset in minutes
// 		const utc = date.getTime() + date.getTimezoneOffset() * 60000;
// 		return new Date(utc + 60000 * estOffset);
// 	};

// 	// Get the original first payment date in EST
// 	const originalFirstPaymentDate = convertToEST(new Date());

// 	// Calculate the second payment date (2 weeks after the first payment)
// 	const secondPaymentDate = new Date(originalFirstPaymentDate);
// 	secondPaymentDate.setDate(originalFirstPaymentDate.getDate() + 14); // Add 14 days

// 	// Calculate the third payment date (4 weeks after the first payment)
// 	const thirdPaymentDate = new Date(originalFirstPaymentDate);
// 	thirdPaymentDate.setDate(originalFirstPaymentDate.getDate() + 28); // Add 28 days

// 	// Calculate the fourth payment date (6 weeks after the first payment)
// 	const fourthPaymentDate = new Date(originalFirstPaymentDate);
// 	fourthPaymentDate.setDate(originalFirstPaymentDate.getDate() + 42); // Add 42 days

// 	// Format the dates for display
// 	const options: Intl.DateTimeFormatOptions = {
// 		weekday: "long",
// 		month: "long",
// 		day: "numeric",
// 		year: "numeric",
// 	};

// 	// Now you can use firstPayment, secondPayment, thirdPayment, and fourthPayment as needed
// 	const firstPayment = originalFirstPaymentDate.toLocaleDateString(
// 		"en-US",
// 		options
// 	);
// 	const secondPayment = secondPaymentDate.toLocaleDateString("en-US", options);
// 	const thirdPayment = thirdPaymentDate.toLocaleDateString("en-US", options);
// 	const fourthPayment = fourthPaymentDate.toLocaleDateString("en-US", options);

// 	const convertMilitaryToRegularTime = (militaryTime) => {
// 		if (militaryTime) {
// 			// Parse the military time
// 			const [hours, minutes] = militaryTime.split(":").map(Number);

// 			// Determine whether it's morning or afternoon
// 			const period = hours < 12 ? "AM" : "PM";

// 			// Convert hours to 12-hour format
// 			const regularHours = hours % 12 || 12;

// 			// Format the result
// 			const regularTime = `${regularHours}:${String(minutes).padStart(
// 				2,
// 				"0"
// 			)} ${period}`;

// 			return regularTime;
// 		}
// 	};

// 	return (
// 		<>
// 			<BackButton href="/register/join-team" />
// 			<h3 className="my-10  text-3xl uppercase">Summary:</h3>

// 			{/* <h3 className="mb-6">Fill In Team Captain Details</h3>
// 				<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] p-6 md:grid-cols-2">
// 					<div className="space-y-3">
// 						<Label htmlFor="playerName" className="text-xl uppercase">
// 							Player Name
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="playerName"
// 							placeholder="Enter your full name"
// 							{...register("playerName")}
// 						/>
// 						{errors.playerName && (
// 							<p className="text-red-600">{errors.playerName.message}</p>
// 						)}
// 					</div>
// 					<div className="space-y-3">
// 						<Label htmlFor="instagram" className="text-xl uppercase">
// 							Instagram Handle
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="instagram"
// 							placeholder="Enter your IG handle"
// 							{...register("instagram")}
// 						/>
// 						{errors.instagram && (
// 							<p className="text-red-600">{errors.instagram.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							Will be used to contact and tag you on photos, media and other
// 							related league events.
// 						</p>
// 					</div>

// 					<div className="space-y-3">
// 						<Label htmlFor="phoneNumber" className="text-xl uppercase">
// 							Phone Number
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="phoneNumber"
// 							placeholder="ex: 123-123-1234"
// 							{...register("phoneNumber")}
// 						/>
// 						{errors.phoneNumber && (
// 							<p className="text-red-600">{errors.phoneNumber.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							*We will use your phone number if your instagram is not available
// 							for communication. We would like to keep in constant communication
// 							with you that way we are always on the same page.
// 						</p>
// 					</div>

// 					<div className="space-y-3">
// 						<Label htmlFor="jerseySize" className="text-xl uppercase">
// 							What is your jersey size?
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="jerseySize"
// 							placeholder=""
// 							{...register("jerseySize")}
// 						/>

// 						{errors.jerseySize && (
// 							<p className="text-red-600">{errors.jerseySize.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							Note: Your jersey size cannot be reordered.{" "}
// 							<a
// 								href=""
// 								className="underline transition-all hover:text-neutral-100"
// 							>
// 								Read more here
// 							</a>
// 						</p>
// 					</div>

// 					<div className="space-y-3">
// 						<label htmlFor="jerseySize" className="text-xl uppercase">
// 							What is your jersey size?
// 						</label>
// 						<select
// 							{...register("jerseySize", {
// 								required: "Jersey size is required",
// 							})}
// 							id="jerseySize"
// 							className="focus:ring-ring ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full items-center rounded-md border border-neutral-300 bg-[#111827] p-4 text-lg font-normal transition-colors file:border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
// 						>
// 							<option value="" disabled>
// 								Select your size
// 							</option>
// 							<option value="SM">SM</option>
// 							<option value="MD">MD</option>
// 							<option value="LG">LG</option>
// 							<option value="XL">XL</option>
// 							<option value="XXL">XXL</option>
// 							<option value="XXXL">XXXL</option>
// 							<option value="XXXXL">XXXXL</option>
// 						</select>
// 						{errors.jerseySize && (
// 							<p className="text-red-600">{errors.jerseySize.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							Note: Your jersey size cannot be reordered.{" "}
// 							<a
// 								href="#"
// 								className="underline transition-all hover:text-neutral-100"
// 							>
// 								Read more here
// 							</a>
// 						</p>
// 					</div>

// 					<div className="space-y-3">
// 						<Label htmlFor="jerseyName" className="text-xl uppercase">
// 							What’s your custom jersey Name?
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="jerseyName"
// 							placeholder="Enter custom jersey name"
// 							{...register("jerseyName")}
// 						/>
// 						{errors.jerseyName && (
// 							<p className="text-red-600">{errors.jerseyName.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							Please ensure that spelling is correct. This cannot be changed
// 							later.
// 						</p>
// 					</div>
// 					<div className="space-y-3">
// 						<Label htmlFor="jerseyNumber" className="text-xl uppercase">
// 							What’s your Jersey Number?
// 						</Label>
// 						<Input
// 							variant="form"
// 							type="text"
// 							name="jerseyNumber"
// 							placeholder="Enter jersey number"
// 							{...register("jerseyNumber")}
// 						/>
// 						{errors.jerseyNumber && (
// 							<p className="text-red-600">{errors.jerseyNumber.message}</p>
// 						)}
// 						<p className="text-sm text-neutral-300">
// 							Please ensure this is the number that your want. This cannot be
// 							changed later.
// 						</p>
// 					</div>
// 				</div> */}
// 			<div className="flex flex-col gap-10 md:flex-row">
// 				<div className="w-full  md:w-3/4">
// 					<div className="flex items-start  gap-4  border-b border-t py-4">
// 						<div>
// 							<Image
// 								src={"/images/register/createTeam.jpg"}
// 								alt="create a team image"
// 								width={250}
// 								height={250}
// 							/>
// 						</div>
// 						<div className="flex w-full flex-col">
// 							<p className="text-md flex flex-col md:flex-row md:gap-4 md:text-3xl">
// 								<span>Team: {team.teamName}</span>
// 								<span>Division: {division?.divisionName}</span>
// 							</p>
// 							<p className="text-md">Team Captain: {teamCaptain?.playerName}</p>
// 							<p>{division?.location}</p>
// 							<p>
// 								{convertMilitaryToRegularTime(division?.startTime)} -{" "}
// 								{convertMilitaryToRegularTime(division?.endTime)}
// 							</p>
// 							<p>{division?.day}</p>
// 							<p className="mb-10 mt-2">{division?.description}</p>

// 							<p className="my-4">
// 								<strong>Registration Fee Allocation:</strong> Upon immediate
// 								payment, ${division.instalmentPrice}
// 								<span className="text-sm"> + tax</span> will be allocated
// 								towards the jersey order, and another $
// 								{division.instalmentPrice}
// 								<span className="text-sm"> + tax</span> will be designated for
// 								gym fees. Please note that there will be no refunds for this
// 								transaction.
// 							</p>
// 							{division?.earlyBirdOpen ? (
// 								<p className="text-right">
// 									Early Bird Registration Fee: ${division?.earlyBirdPrice}
// 								</p>
// 							) : (
// 								<div className="flex justify-end">
// 									<div>
// 										<p>
// 											Registration Fee: ${division.regularPrice + ".00"}{" "}
// 											<span className="text-sm"> + tax</span>
// 										</p>
// 										<span className="my-2 mr-2 block text-center text-3xl">
// 											Or
// 										</span>
// 										<p>
// 											Six Payments of ${division.instalmentPrice + ".00"}{" "}
// 											<span className="text-sm"> + tax</span>
// 										</p>
// 									</div>
// 								</div>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 				<Card className="w-full md:w-1/4">
// 					<CardHeader>
// 						<CardTitle>
// 							Please input your details and check All Boxes Before Proceeding.
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<section className="my-3 ">
// 							<Label className="mb-3 block uppercase">Player Name:</Label>
// 							<Input
// 								type="text"
// 								className={`bg-neutral-700 py-[16px] ${
// 									checkboxErrors.playerName
// 										? "border-primary"
// 										: "border-neutral-500"
// 								}`}
// 								value={playerName}
// 								onChange={(e) => setPlayerName(e.target.value)}
// 							/>
// 						</section>

// 						<section className="my-3">
// 							<Label className="mb-3 block uppercase">Instagram Handle</Label>
// 							<Input
// 								type="text"
// 								placeholder="ex: @riseup.bball"
// 								className={`bg-neutral-700 py-[16px] `}
// 								value={instagram}
// 								onChange={(e) => setInstagram(e.target.value)}
// 							/>
// 							<p className="mt-2 text-xs text-neutral-500">
// 								INSTAGRAM HANDLE WILL BE USED TO TAG YOU FOR HIGHLIGHTS AND
// 								PHOTOS. WE WILL ALSO CONTACT YOU THROUGH INSTAGRAM.
// 							</p>
// 						</section>
// 						<section className="my-3 mb-6">
// 							<Label className="mb-3 block uppercase">Phone Number</Label>
// 							<Input
// 								type="text"
// 								className={`bg-neutral-700 py-[16px] ${
// 									checkboxErrors.phoneNumber
// 										? "border-primary"
// 										: "border-neutral-500"
// 								}`}
// 								value={phoneNumber}
// 								onChange={(e) => setPhoneNumber(e.target.value)}
// 							/>
// 							<p className="mt-2 text-xs uppercase text-neutral-500">
// 								*We will use your phone number if your instagram is not
// 								available for communication. We would like to keep in constant
// 								communication with you that way we are always on the same page.
// 							</p>
// 						</section>
// 						<section className="flex flex-col gap-3">
// 							<div className="flex items-center">
// 								<Checkbox
// 									id="checkBoxTerms"
// 									className="!mr-4 border-white"
// 									onCheckedChange={() => setTerms(true)}
// 								/>
// 								<Label
// 									htmlFor="checkBoxTerms"
// 									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 								>
// 									I have read and agree to the{" "}
// 									<Link
// 										className="text-primary transition-all hover:underline"
// 										href="/terms-and-conditions"
// 										target="_blank"
// 									>
// 										Terms and Conditions
// 									</Link>
// 									.
// 								</Label>
// 							</div>
// 							<div className="flex items-center">
// 								<Checkbox
// 									id="checkBoxRefund"
// 									className="!mr-4 border-white"
// 									onCheckedChange={() => setRefund(true)}
// 								/>
// 								<Label
// 									htmlFor="checkBoxRefund"
// 									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 								>
// 									I have read and agree to the{" "}
// 									<Link
// 										className="text-primary transition-all hover:underline"
// 										href="/refund-policy"
// 										target="_blank"
// 									>
// 										Refund Policy
// 									</Link>
// 									.
// 								</Label>
// 							</div>
// 						</section>
// 						{team.paid === true ? (
// 							<>
// 								<section>
// 									<p className="mt-4">Overall Total:</p>
// 									<p className="text-primary text-3xl uppercase">Free</p>
// 									<Button
// 										className="mt-10  flex w-full justify-center text-center"
// 										onClick={handleFree}
// 									>
// 										{isLoader ? (
// 											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 										) : (
// 											"Join for free"
// 										)}
// 									</Button>
// 								</section>
// 							</>
// 						) : (
// 							<>
// 								<section>
// 									<p className="mt-4">Overall Total:</p>
// 									<p className="text-4xl">
// 										$
// 										{division?.earlyBirdOpen
// 											? division?.earlyBirdPrice
// 											: division?.regularPrice}
// 									</p>
// 									<Button
// 										className="mt-10  flex w-full justify-center text-center"
// 										onClick={handlePay}
// 									>
// 										{isLoader ? (
// 											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 										) : (
// 											"Pay Now"
// 										)}
// 									</Button>
// 								</section>
// 							</>
// 						)}

// 						{!division.earlyBirdOpen && (
// 							<section>
// 								<Separator className="my-4 border-b border-neutral-600" />
// 								<p className="my-4 text-base font-medium">
// 									Six Instalments of:
// 								</p>
// 								<p className="mb-4 text-2xl">
// 									${division.instalmentPrice}
// 									<span className="text-sm"> + tax</span>
// 								</p>
// 								<Button
// 									className="flex w-full justify-center text-center text-sm font-semibold capitalize"
// 									onClick={handlePayInstalments}
// 								>
// 									{isLoader ? (
// 										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 									) : (
// 										"Pay in instalments"
// 									)}
// 								</Button>
// 							</section>
// 						)}

// 						<p className="font-sm my-4">
// 							<span className="font-semibold">
// 								Registration Fee Allocation:
// 							</span>{" "}
// 							Upon immediate payment, ${division.instalmentPrice}
// 							<span className="text-sm"> + tax</span> will be allocated towards
// 							the jersey order, and another ${division.instalmentPrice}
// 							<span className="text-sm"> + tax</span> will be designated for gym
// 							fees. Please note that there will be no refunds for this
// 							transaction.
// 						</p>
// 						{/* Error messages */}

// 						{checkboxErrors.playerName && (
// 							<p className="text-primary text-sm">
// 								{checkboxErrors.playerName}
// 							</p>
// 						)}

// 						{checkboxErrors.phoneNumber && (
// 							<p className="text-primary text-sm">
// 								{checkboxErrors.phoneNumber}
// 							</p>
// 						)}
// 						{checkboxErrors.termsChecked && (
// 							<p className="text-primary text-sm">
// 								{checkboxErrors.termsChecked}
// 							</p>
// 						)}

// 						{checkboxErrors.refundChecked && (
// 							<p className="text-primary text-sm">
// 								{checkboxErrors.refundChecked}
// 							</p>
// 						)}
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</>
// 	);
// };

// export default JoinTeamSummary;
