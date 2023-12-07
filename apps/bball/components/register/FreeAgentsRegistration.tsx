"use client";

import { useState } from "react";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { Loader2 } from "lucide-react";
import { convertToEST } from "@/utils/convertToEST";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
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
import getStripe from "@/utils/checkout";

interface FormData {
	jerseyName: string;
	jerseyNumber: string;
	jerseyNumberTwo: string;
	jerseyNumberThree: string;
	instagram: string;
	jerseySize: string;
	shortSize: string;
	termsChecked: boolean;
	refundChecked: boolean;
}
interface FormErrors {
	teamName?: string;
	teamNameShort?: string;
	teamCode?: string;
	jerseyName?: string;
	jerseyNumber?: string;
	jerseyNumberTwo?: string;
	jerseyNumberThree?: string;
	jerseySize?: string;
	shortSize?: string;
	termsChecked?: string;
	refundChecked?: string;
}

interface Division {
	day: string;
	description: string;
	divisionName: string;
	earlyBirdId: string;
	earlyBirdOpen: boolean;
	earlyBirdPrice: string;
	endTime: string;
	instalmentPrice: string;
	location: string;
	regularPrice: string;
	regularPriceFullId: string;
	regularPriceInstalmentId: string;
	startTime: string;
	teams: string[];
	_id: string;
}

export default function FreeAgentsRegistration({ session, divisions }) {
	const [isSummary, setIsSummary] = useState(false);
	const [isLoader, setIsLoader] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		jerseyName: "",
		instagram: "",
		jerseyNumber: "",
		jerseyNumberTwo: "",
		jerseyNumberThree: "",
		jerseySize: "",
		shortSize: "",
		termsChecked: false,
		refundChecked: false,
	});

	const initialSelectedDivision: Division = {
		day: "",
		description: "",
		divisionName: "",
		earlyBirdId: "",
		earlyBirdOpen: false,
		earlyBirdPrice: "",
		endTime: "",
		instalmentPrice: "",
		location: "",
		regularPrice: "",
		regularPriceFullId: "",
		regularPriceInstalmentId: "",
		startTime: "",
		teams: [],
		_id: "",
	};

	const [selectedDivisions, setSelectedDivisions] = useState([]);
	const [selectedDivision, setSelectedDivision] = useState(
		initialSelectedDivision
	);
	console.log(selectedDivision);
	const [isLocationSelected, setIsLocationSelected] = useState(false);
	const [isDivisionSelected, setIsDivisionSelected] = useState(false);

	// Initialize arrays for each location
	const bramptonDivisions = [];
	const vaughanDivisions = [];
	const markhamDivisions = [];

	// Categorize divisions based on location
	divisions.forEach((division) => {
		switch (division.divisionName) {
			case "Filipino Beginners":
			case "Filipinos Greats":
			case "Filipino Intermediates":
			case "Nations Beginner":
			case "Nation Greats":
				bramptonDivisions.push(division);
				break;
			case "Nations Beginners":
			case "Nations Intermediates":
			case "Elites Division":
			case "Nations Greats":
			case "Nation Greats":
				vaughanDivisions.push(division);
				break;
			case "Filipino Greats":
			case "Filipinos Beginners":
				markhamDivisions.push(division);
				break;
			// Add additional cases as needed
			default:
				break;
		}
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateForm = (): FormErrors => {
		const errors: FormErrors = {};

		if (!formData.jerseyName) {
			errors.jerseyName = "Name on the back of the jersey is required";
		}
		if (!formData.jerseyNumber) {
			errors.jerseyNumber = "First jersey number choice is required";
		}
		if (!formData.jerseyNumberTwo) {
			errors.jerseyNumber = "Second jersey number choice is required";
		}
		if (!formData.jerseyNumberThree) {
			errors.jerseyNumber = "Third jersey number choice is required";
		}

		if (!formData.jerseySize) {
			errors.jerseySize = "Jersey top size is required";
		}

		if (!formData.shortSize) {
			errors.shortSize = "Jersey bottom size is required";
		}

		if (!formData.termsChecked) {
			errors.termsChecked = "You must agree to the terms and conditions";
		}

		if (!formData.refundChecked) {
			errors.refundChecked = "You must agree to the refund policy";
		}

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
			setFormErrors(errors);
		}
	};

	const handleJerseySize = (value: string) => {
		setFormData({ ...formData, jerseySize: value });
	};

	const handleShortSize = (value: string) => {
		setFormData({ ...formData, shortSize: value });
	};

	const handleCreateTeamAndPlayer = async (
		itemPriceId: string,
		payment: string
	) => {
		setIsLoader(true);

		const {
			jerseyName,
			jerseyNumber,
			jerseyNumberTwo,
			jerseyNumberThree,
			jerseySize,
			shortSize,
			instagram,
		} = formData;

		// Check for required input fields
		if (!jerseyNumber || !jerseySize || !shortSize) {
			console.error("Invalid Inputs");
			return; // Exit the function if inputs are invalid
		}

		try {
			const formObject = {
				freeAgent: true,
				status: "freeAgent",
				payment: payment,
				jerseyNumber,
				jerseyNumberTwo,
				jerseyNumberThree,
				jerseySize,
				shortSize,
				jerseyName,
				instagram,
				playerName: session.user.name,
				email: session.user.email,
				division: selectedDivision._id,
				divisionName: selectedDivision.divisionName,
			};

			redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
		} catch (error) {
			console.error("Error creating team:", error);
		}
	};

	const redirectToCheckout = async (items, formObject) => {
		console.log(items);
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

	// Format the dates for display
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	};
	const firstPayment = originalFirstPaymentDate.toLocaleDateString(
		"en-US",
		options
	);
	const secondPayment = secondPaymentDate.toLocaleDateString("en-US", options);

	console.log("First Payment:", firstPayment);
	console.log("Second Payment:", secondPayment);

	const fullPaymentId = "price_1OCf1gLNj0EwRSePNYan1PmL";
	const splitPaymentId = "price_1OJxQGLNj0EwRSePDNZA7bTk";
	return (
		<>
			{!isDivisionSelected ? (
				<>
					{!isLocationSelected ? (
						<>
							<Link
								href={"/register"}
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

							<h3 className="mt-10  text-3xl uppercase">Choose your city:</h3>

							<div className="mt-10 flex flex-col gap-10 ">
								<button
									onClick={() => {
										setIsLocationSelected(true);
										setSelectedDivisions(bramptonDivisions);
									}}
									className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
								>
									Brampton
								</button>

								<button
									onClick={() => {
										setIsLocationSelected(true);
										setSelectedDivisions(vaughanDivisions);
									}}
									className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
								>
									Vaughan
								</button>

								<button
									onClick={() => {
										setIsLocationSelected(true);
										setSelectedDivisions(markhamDivisions);
									}}
									className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl"
								>
									Markham
								</button>
							</div>
						</>
					) : (
						<>
							<button
								onClick={() => {
									setIsLocationSelected(false);
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

							<h3 className="mt-10  text-3xl uppercase">
								Choose your difficulty:
							</h3>

							<div className="mt-10 flex flex-col gap-10 ">
								<Accordion type="single" collapsible className="w-full">
									{selectedDivisions.map((division, index) => {
										return (
											<AccordionItem
												key={division.divisionName}
												value={`item-${index}`}
												className=" mb-10  border-b-0"
											>
												<AccordionTrigger className="rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl">
													{division.divisionName} - {division.location}
												</AccordionTrigger>
												<AccordionContent>
													<div>
														<div className="rounded-md rounded-t-none bg-neutral-700">
															<p className="px-4 py-1 text-lg uppercase text-neutral-300 ">
																Division Details
															</p>
															<Separator
																orientation="horizontal"
																className="bg-neutral-600"
															/>
															<div className="bg-register-card col-span-1 flex flex-col gap-7 p-4">
																<div className="flex  gap-2  md:flex-row">
																	<svg
																		width="25"
																		height="25"
																		viewBox="0 0 24 24"
																		stroke="#ff422d"
																	>
																		<path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
																	</svg>
																	<p className="text-sm">{division.location}</p>
																</div>
																<div className="flex  gap-2 md:flex-row">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="22"
																		height="22"
																		viewBox="0 0 16 16"
																		fill="none"
																	>
																		<path
																			d="M8 4.88889V8L10.3333 10.3333M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
																			stroke="#ff422d"
																			strokeWidth="1.67"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>{" "}
																	<p className="text-sm">
																		{division.startTime} - {division.endTime}{" "}
																	</p>
																</div>
																<div className="flex  gap-2 md:flex-row">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="22"
																		height="22"
																		viewBox="0 0 16 16"
																		fill="none"
																	>
																		<path
																			d="M4.88889 4.11111V1M11.1111 4.11111V1M4.11111 7.22222H11.8889M2.55556 15H13.4444C14.3036 15 15 14.3036 15 13.4444V4.11111C15 3.252 14.3036 2.55556 13.4444 2.55556H2.55556C1.69645 2.55556 1 3.252 1 4.11111V13.4444C1 14.3036 1.69645 15 2.55556 15Z"
																			stroke="#ff422d"
																			strokeWidth="1.67"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>{" "}
																	<p className="text-sm">{division.day}</p>
																</div>
															</div>
															<Separator
																orientation="horizontal"
																className="bg-neutral-600"
															/>
															<div className="col-span-3  p-4">
																<p className="text-sm">
																	{division.description}
																</p>
																<ul className="my-4 text-sm">
																	<li>Includes:</li>

																	<li>8 GAMES GUARANTEED</li>
																	<li>Top and bottom jersey</li>
																	<li>Photos</li>
																	<li>Highlights</li>
																	<li>Player stats</li>
																	<li>Team stats</li>
																	<li>Full game coverage</li>
																</ul>

																<div className="mb-5 flex justify-end ">
																	<div className="relative flex-1 border-r border-neutral-600  p-4">
																		<span className="bg-secondary  mb-2 inline-block w-fit rounded-md px-2 py-1  uppercase text-neutral-400">
																			Other Leagues
																		</span>
																		<div className="relative flex items-center gap-2">
																			<p className="price-reduced text-5xl font-semibold">
																				$350
																			</p>
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="101"
																				height="35"
																				viewBox="0 0 101 35"
																				fill="none"
																				className="absolute"
																			>
																				<path
																					opacity="0.9"
																					d="M98.0625 3.3916L3.00011 31.6076"
																					stroke="#B91C1C"
																					strokeWidth="5"
																					strokeLinecap="round"
																				/>
																			</svg>
																			<span className="text-xs">
																				{" "}
																				+ 13% HST
																			</span>
																		</div>
																	</div>

																	<div className="flex-1 p-4">
																		<span className="bg-main bg-primary mb-2 inline-block w-fit rounded-md px-2 py-1  uppercase text-white">
																			Early Bird
																		</span>
																		<div className="flex items-center gap-2">
																			<p className="mb-2 text-5xl font-semibold">
																				$ {division.earlyBirdPrice}
																			</p>

																			<span className="text-xs">+ 13% HST</span>
																		</div>
																		<span className="text-xs">
																			or split payment of{" "}
																			<span className="text-sm">
																				$
																				{(division.earlyBirdPrice / 2).toFixed(
																					2
																				)}
																			</span>{" "}
																			+ 13% HST bi-weekly
																		</span>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="mt-10 flex justify-end">
														<Button
															className="font-barlow rounded bg-neutral-100 px-12 py-2 font-bold text-neutral-900 transition hover:bg-neutral-200"
															onClick={() => {
																setIsDivisionSelected(true);
																setSelectedDivision(division);
															}}
														>
															Continue
														</Button>
													</div>
												</AccordionContent>
											</AccordionItem>
										);
									})}
								</Accordion>
							</div>
						</>
					)}
				</>
			) : (
				<>
					{!isSummary ? (
						<>
							<Link
								href={"/register/join-team"}
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
							<h3 className="mt-20  text-3xl uppercase">
								Customize your jersey:
							</h3>

							<form onSubmit={handleFormSubmit}>
								<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
									<h4 className="text-lg uppercase underline">
										Your Own Jersey:
									</h4>
									{/* for early birds only */}
									<section>
										<Label className="uppercase">
											Name on the back of the Jersey
										</Label>
										<Input
											type="text"
											className="border-neutral-500 bg-neutral-700 py-[16px]"
											value={formData.jerseyName}
											onChange={(e) =>
												setFormData({ ...formData, jerseyName: e.target.value })
											}
										/>
									</section>

									<section>
										<Label className="uppercase">
											First Jersey Number Choice
										</Label>
										<Input
											type="text"
											className="border-neutral-500 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumber}
											onChange={(e) => {
												const input = e.target.value;

												if (input === "" || input.match(/^\d*$/)) {
													setFormErrors({
														...formErrors,
														jerseyNumber: undefined, // Clear the error
													});
													setFormData({ ...formData, jerseyNumber: input });
												} else {
													setFormErrors({
														...formErrors,
														jerseyNumber:
															"Jersey number must be a valid number",
													});
												}
											}}
										/>
										{formErrors.jerseyNumber &&
											formErrors.jerseyNumber ===
												"Jersey number must be a valid number" && (
												<p className="text-primary">
													{formErrors.jerseyNumber}
												</p>
											)}
									</section>

									<section>
										<Label className="flex flex-col uppercase">
											Second Jersey Number Choice{" "}
											<span className="mt-1 text-xs">
												(Please select a number different from first and third.
												Just in case someone else got your number already)
											</span>
										</Label>
										<Input
											type="text"
											className="border-neutral-500 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumberTwo}
											onChange={(e) => {
												const input = e.target.value;

												if (input === "" || input.match(/^\d*$/)) {
													setFormErrors({
														...formErrors,
														jerseyNumberTwo: undefined, // Clear the error
													});
													setFormData({
														...formData,
														jerseyNumberTwo: input,
													});
												} else {
													setFormErrors({
														...formErrors,
														jerseyNumberTwo:
															"Jersey number must be a valid number",
													});
												}
											}}
										/>
										{formErrors.jerseyNumberTwo &&
											formErrors.jerseyNumberTwo ===
												"Jersey number must be a valid number" && (
												<p className="text-primary">
													{formErrors.jerseyNumberTwo}
												</p>
											)}
									</section>

									<section>
										<Label className="flex flex-col uppercase">
											Third Jersey Number Choice{" "}
											<span className="mt-1 text-xs">
												(Please select a number different from first and second.
												Just in case someone else got your number already)
											</span>
										</Label>
										<Input
											type="text"
											className="border-neutral-500 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumberThree}
											onChange={(e) => {
												const input = e.target.value;

												if (input === "" || input.match(/^\d*$/)) {
													setFormErrors({
														...formErrors,
														jerseyNumberThree: undefined, // Clear the error
													});
													setFormData({
														...formData,
														jerseyNumberThree: input,
													});
												} else {
													setFormErrors({
														...formErrors,
														jerseyNumberThree:
															"Jersey number must be a valid number",
													});
												}
											}}
										/>
										{formErrors.jerseyNumberThree &&
											formErrors.jerseyNumberThree ===
												"Jersey number must be a valid number" && (
												<p className="text-primary">
													{formErrors.jerseyNumberThree}
												</p>
											)}
									</section>

									<section>
										<Label className="uppercase">Jersey Top Size</Label>
										<Select onValueChange={handleJerseySize}>
											<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
												<SelectValue placeholder={formData.jerseySize} />
											</SelectTrigger>
											<SelectContent className="font-barlow text-lg">
												<SelectGroup>
													<SelectItem value="SM">SM</SelectItem>
													<SelectItem value="MD">MD</SelectItem>
													<SelectItem value="LG">LG</SelectItem>
													<SelectItem value="XL">XL</SelectItem>
													<SelectItem value="XXL">XXL</SelectItem>
													<SelectItem value="XXXL">XXXL</SelectItem>
													<SelectItem value="XXXXL">XXXXL</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</section>
									<section>
										<Label className="uppercase">Jersey Bottom Size</Label>
										<Select onValueChange={handleShortSize}>
											<SelectTrigger className="font-barlow w-full text-lg md:w-[180px]">
												<SelectValue placeholder={formData.shortSize} />
											</SelectTrigger>
											<SelectContent className="font-barlow text-lg">
												<SelectGroup>
													<SelectItem value="SM">SM</SelectItem>
													<SelectItem value="MD">MD</SelectItem>
													<SelectItem value="LG">LG</SelectItem>
													<SelectItem value="XL">XL</SelectItem>
													<SelectItem value="XXL">XXL</SelectItem>
													<SelectItem value="XXXL">XXXL</SelectItem>
													<SelectItem value="XXXXL">XXXXL</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</section>

									<Separator
										orientation="horizontal"
										className="my-5 bg-neutral-600"
									/>

									<h4 className="text-lg uppercase underline">Personal:</h4>
									{/* for early birds only */}
									<section>
										<Label className="uppercase">Instagram</Label>
										<Input
											type="text"
											className="border-neutral-500 bg-neutral-700 
											py-[16px]"
											value={formData.instagram}
											onChange={(e) =>
												setFormData({ ...formData, instagram: e.target.value })
											}
										/>
										<p className="mt-1 text-xs text-neutral-100">
											Instagram is not required. It will be used for media
											purposes, highlights, shoutouts, etc.
										</p>
									</section>
									<section className="mt-10 flex flex-col gap-3">
										<div className="flex items-center">
											<Checkbox
												id="checkBoxTerms"
												className="!mr-4 border-white"
												checked={formData.termsChecked}
												onCheckedChange={() =>
													setFormData({
														...formData,
														termsChecked: !formData.termsChecked,
													})
												}
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
												onCheckedChange={() =>
													setFormData({
														...formData,
														refundChecked: !formData.refundChecked,
													})
												}
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
								{/* Error messages */}
								{formErrors.teamName && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.teamName}
									</p>
								)}
								{formErrors.jerseyName && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.jerseyName}
									</p>
								)}
								{formErrors.jerseyNumber && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.jerseyNumber}
									</p>
								)}
								{formErrors.jerseySize && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.jerseySize}
									</p>
								)}
								{formErrors.shortSize && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.shortSize}
									</p>
								)}
								{formErrors.termsChecked && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.termsChecked}
									</p>
								)}
								{formErrors.refundChecked && (
									<p className="text-primary  rounded-md p-2">
										{formErrors.refundChecked}
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
							<h3 className="mt-20  text-3xl uppercase">Summary:</h3>
							<div>
								<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
									<h4 className="text-lg uppercase underline">
										Your Own Jersey:
									</h4>
									{/* for early birds only */}
									<section className="flex items-center">
										<Label className="uppercase">
											Name on the back of the Jersey
										</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.jerseyName}
											disabled
										/>
									</section>
									<section className="flex items-center">
										<Label className="uppercase">
											First Jersey Number Choice
										</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumber}
											disabled
										/>
									</section>

									<section className="flex items-center">
										<Label className="uppercase">
											Second Jersey Number Choice
										</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumberTwo}
											disabled
										/>
									</section>

									<section className="flex items-center">
										<Label className="uppercase">
											Third Jersey Number Choice
										</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.jerseyNumberThree}
											disabled
										/>
									</section>

									<section className="flex items-center">
										<Label className="uppercase">Jersey Top Size</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.jerseySize}
											disabled
										/>
									</section>
									<section className="flex items-center">
										<Label className="uppercase">Jersey Bottom Size</Label>
										<Input
											type="text"
											className="w-40 border-0 bg-neutral-700 py-[16px]"
											value={formData.shortSize}
											disabled
										/>
									</section>
									<h4 className="text-lg uppercase underline">Personal:</h4>
									{/* for early birds only */}
									<section>
										<Label className="uppercase">Instagram</Label>
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
										${(200).toFixed(2)}
										<span className="text-sm text-neutral-50">+ 13% HST</span>
									</p>
									<Button
										// "price_1OKYL4Hl6U3lbfQtQD0OpQ8F",
										className="uppercase"
										onClick={() => {
											handleCreateTeamAndPlayer(fullPaymentId, "full");
										}}
									>
										{isLoader ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Pay in full"
										)}
									</Button>

									<>
										<Separator
											orientation="horizontal"
											className="bg-neutral-600"
										/>{" "}
										<p className="text-4xl">
											${(200 / 2).toFixed(2)}
											<span className="text-sm text-neutral-50">
												Today + another ${(200 / 2).toFixed(2)} in 2 weeks
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
													<TableCell>${(200 / 2).toFixed(2)}</TableCell>
												</TableRow>
												<TableRow className="uppercase">
													<TableCell>2nd</TableCell>
													<TableCell>{secondPayment}</TableCell>
													<TableCell>${(200 / 2).toFixed(2)}</TableCell>
												</TableRow>
											</TableBody>
										</Table>
										<Button
											// "price_1OKYO4Hl6U3lbfQtIq8563wU",
											onClick={() => {
												handleCreateTeamAndPlayer(splitPaymentId, "four");
											}}
											variant="secondary"
											className="uppercase text-neutral-300"
										>
											{isLoader ? (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											) : (
												"Pay in instalments"
											)}
										</Button>
										<ul className="flex flex-col gap-4 text-sm uppercase text-neutral-300">
											<li>
												Your card will be saved on file and automatically
												charged on the scheduled dates ABOVE.
											</li>
											<li>
												Scheduled online payments will be subject to an
												additional Online Payment Fee. *This does not apply for
												early bird special*
											</li>
											<li>
												late payments will be subject to additional fees or may
												receive penalties.
											</li>
										</ul>
									</>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
}
