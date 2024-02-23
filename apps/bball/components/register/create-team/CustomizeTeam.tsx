"use client";

import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import Link from "next/link";
import { useState } from "react";
import getStripe from "@/utils/checkout";
import { Loader2 } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";

interface FormData {
	teamName: string;
	teamNameShort?: string;
	teamCode?: string;
	instagram: string;
	phoneNumber: string;
	// termsChecked: boolean;
	// refundChecked: boolean;
}
interface FormErrors {
	teamName?: string;
	teamNameShort?: string;
	teamCode?: string;
	phoneNumber?: string;
	// termsChecked?: string;
	// refundChecked?: string;
}

const CustomizeTeam = ({ division, session }): JSX.Element => {
	const [isLoader, setIsLoader] = useState(false);
	console.log(division);
	const [isSummary, setIsSummary] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		teamName: "",
		teamNameShort: "",
		teamCode: "",
		instagram: "",
		phoneNumber: "",
		// termsChecked: false,
		// refundChecked: false,
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateForm = (): FormErrors => {
		const errors: FormErrors = {};

		if (!formData.teamName) {
			errors.teamName = "Team name is required";
		}

		if (!formData.teamName) {
			errors.teamNameShort = "Team name short is required";
		}

		if (!formData.teamCode) {
			errors.teamCode = "Team code is required";
		}
		if (!formData.phoneNumber) {
			errors.phoneNumber = "Phone number is required";
		}

		// if (!formData.jerseyNumber) {
		// 	errors.jerseyNumber = "Jersey number is required";
		// }

		// if (!formData.jerseySize) {
		// 	errors.jerseySize = "Jersey top size is required";
		// }

		// if (!formData.shortSize) {
		// 	errors.shortSize = "Jersey bottom size is required";
		// }

		// if (!formData.termsChecked) {
		// 	errors.termsChecked = "You must agree to the terms and conditions";
		// }

		// if (!formData.refundChecked) {
		// 	errors.refundChecked = "You must agree to the refund policy";
		// }

		return errors;
	};

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

	// const handleJerseySize = (value: string) => {
	// 	setFormData({ ...formData, jerseySize: value });
	// };

	// const handleShortSize = (value: string) => {
	// 	setFormData({ ...formData, shortSize: value });
	// };

	const handleCreateTeamAndPlayer = async (
		itemPriceId: string,
		payment: string
	) => {
		setIsLoader(true);

		const {
			teamName,
			teamNameShort,

			instagram,
			phoneNumber,
			teamCode,
		} = formData;

		// Check for required input fields
		if (
			!teamName ||
			teamName.trim() === "" ||
			!teamNameShort ||
			teamNameShort.trim() === ""
		) {
			console.error("Invalid Inputs");
			return; // Exit the function if inputs are invalid
		}

		try {
			const formObject = {
				status: "createTeam",
				teamName: teamName,
				teamNameShort: teamNameShort,
				teamCode: teamCode,
				payment: payment,

				instagram,
				phoneNumber,
				playerName: session.user.name,
				email: session.user.email,
				division: division._id,
				divisionName: division.divisionName,
			};

			redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
		} catch (error) {
			console.error("Error creating team:", error);
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
			{!isSummary ? (
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
										<Label className="mb-3 block uppercase">
											Team Name Short
										</Label>
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
										<Label className="mb-3 block uppercase">
											Instagram Handle
										</Label>
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
											INSTAGRAM HANDLE WILL BE USED TO TAG YOU FOR HIGHLIGHTS
											AND PHOTOS. WE WILL ALSO CONTACT YOU THROUGH INSTAGRAM.
										</p>
									</section>
									<section className="my-3">
										<Label className="mb-3 block uppercase">
											Phone Number*
										</Label>
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
											available for communication. We would like to keep in
											constant communication with you that way we are always on
											the same page.
										</p>
									</section>
								</CardContent>
							</CardHeader>
						</Card>

						{/* Error messages */}
						{formErrors.teamName && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.teamName}
							</p>
						)}

						{formErrors.teamNameShort && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.teamNameShort}
							</p>
						)}
						{formErrors.teamCode && (
							<p className="text-primary  rounded-md p-2">
								{formErrors.teamCode}
							</p>
						)}

						<div className="mt-10 flex justify-end">
							<Button type="submit">Continue</Button>
						</div>
					</form>
				</>
			) : (
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
					<h3 className="mt-10  text-3xl uppercase">Summary:</h3>
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2">
						<div className="h-3/4 ">
							<div className="h-full border border-b border-t"></div>
						</div>
						<Card className="">
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
									<section>
										<p className="mt-4">Overall Total:</p>
										<p>{division.earlyBirdPrice}</p>
									</section>
								) : (
									<section>
										<p className="mt-4">Overall Total:</p>
										<p>{division.earlyBirdPrice}</p>
									</section>
								)}
								<p>{division.price}</p>
							</CardContent>
						</Card>
					</div>
					{/* <div>
						<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
							<h4 className="text-lg uppercase underline">Team Identity:</h4>

							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Team Name:</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.teamName}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Abbreviation:</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.teamNameShort}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Team Code</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.teamCode}
									disabled
								/>
							</section>

							<Separator
								orientation="horizontal"
								className="my-5 bg-neutral-600"
							/>

							<h4 className="text-lg uppercase underline">Your Own Jersey:</h4>

							{division.earlyBirdOpen && (
								<section className="flex items-center">
									<Label className="uppercase mb-3 block">
										Name on the back of the Jersey
									</Label>
									<Input
										type="text"
										className="w-40 border-0 bg-neutral-700 py-[16px]"
										value={formData.jerseyName}
										disabled
									/>
								</section>
							)}
							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Jersey Number</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.jerseyNumber}
									disabled
								/>
							</section>

							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Jersey Top Size</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.jerseySize}
									disabled
								/>
							</section>
							<section className="flex items-center">
								<Label className="uppercase mb-3 block">Jersey Bottom Size</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.shortSize}
									disabled
								/>
							</section>
							<h4 className="text-lg uppercase underline">Personal:</h4>
							<section>
								<Label className="uppercase mb-3 block">Instagram</Label>
								<Input
									type="text"
									className="w-40 border-0 bg-neutral-700 py-[16px]"
									value={formData.instagram}
									disabled
								/>
							</section>
							<section className="flex flex-col gap-3">
								<div className="flex items-center">
									<Checkbox
										id="checkBoxTerms"
										className="!mr-4 border-white"
										checked={formData.termsChecked}
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
										checked={formData.refundChecked}
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
						</div>

						<div className="mt-20 flex flex-col gap-10">
							<h4 className="text-3xl uppercase">Overall total:</h4>
							<p className="text-4xl">
								$
								{division.earlyBirdOpen
									? division.earlyBirdPrice
									: division.regularPrice}{" "}
								<span className="text-sm text-neutral-50">+ 13% HST</span>
							</p>
							<Button
								className="uppercase"
								onClick={() => {
									division.earlyBirdOpen
										? handleCreateTeamAndPlayer(division.earlyBirdId, "full")
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

							{division.earlyBirdOpen && (
								<>
									<Separator
										orientation="horizontal"
										className="bg-neutral-600"
									/>{" "}
									<p className="text-4xl">
										$
										{division.earlyBirdOpen
											? (division.earlyBirdPrice / 4).toFixed(2)
											: (division.regularPrice / 4).toFixed(2)}{" "}
										<span className="text-sm text-neutral-50">
											Today + $
											{division.earlyBirdOpen
												? (division.earlyBirdPrice / 4).toFixed(2)
												: (division.regularPrice / 4).toFixed(2)}{" "}
											every 2 weeks
										</span>
									</p>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="uppercase">Payment</TableHead>
												<TableHead className="uppercase">Due dates</TableHead>
												<TableHead className="uppercase">Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow className="uppercase">
												<TableCell>1st</TableCell>
												<TableCell>{firstPayment}</TableCell>
												<TableCell>
													$
													{division.earlyBirdOpen
														? (division.earlyBirdPrice / 4).toFixed(2)
														: (division.regularPrice / 4).toFixed(2)}
												</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>2nd</TableCell>
												<TableCell>{secondPayment}</TableCell>
												<TableCell>
													$
													{division.earlyBirdOpen
														? (division.earlyBirdPrice / 4).toFixed(2)
														: (division.regularPrice / 4).toFixed(2)}
												</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>3rd</TableCell>
												<TableCell>{thirdPayment}</TableCell>
												<TableCell>
													$
													{division.earlyBirdOpen
														? (division.earlyBirdPrice / 4).toFixed(2)
														: (division.regularPrice / 4).toFixed(2)}
												</TableCell>
											</TableRow>
											<TableRow className="uppercase">
												<TableCell>4th</TableCell>
												<TableCell>{fourthPayment}</TableCell>
												<TableCell>
													$
													{division.earlyBirdOpen
														? (division.earlyBirdPrice / 4).toFixed(2)
														: (division.regularPrice / 4).toFixed(2)}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
									<Button
										onClick={() => {
											division.earlyBirdOpen
												? handleCreateTeamAndPlayer(
														division.earlyBirdInstalmentId,
														"four"
												  )
												: handleCreateTeamAndPlayer(
														division.regularPriceInstalmentId,
														"four"
												  );
										}}
										variant="secondary"
										className="uppercase text-neutral-300"
									>
										Pay in instalments
									</Button>
									<ul className="flex flex-col gap-4 text-sm uppercase text-neutral-300">
										<li>
											Your card will be saved on file and automatically charged
											on the scheduled dates ABOVE.
										</li>
										<li>
											Scheduled online payments will be subject to an additional
											Online Payment Fee.
										</li>
										<li>
											late payments will be subject to additional fees or may
											receive penalties.
										</li>
									</ul>
								</>
							)}
						</div>
					</div> */}
				</>
			)}
		</>
	);
};

export default CustomizeTeam;
