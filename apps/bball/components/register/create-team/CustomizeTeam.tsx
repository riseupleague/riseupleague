"use client";

import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";

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

import CreateTeamDetails from "./CreateTeamDetails";
import CreateTeamSummary from "./CreateTeamSummary";
interface FormData {
	teamName: string;
	teamNameShort?: string;
	teamCode?: string;
	instagram: string;
	phoneNumber: string;
	playerName: string;

	// termsChecked: boolean;
	// refundChecked: boolean;
}
interface FormErrors {
	teamName?: string;
	teamNameShort?: string;
	phoneNumber?: string;
	playerName?: string;

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
		playerName: "",
		// termsChecked: false,
		// refundChecked: false,
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateForm = (): FormErrors => {
		const errors: FormErrors = {};

		if (!formData.teamName) {
			errors.teamName = "Team name is required";
		}

		if (!formData.teamNameShort) {
			errors.teamNameShort = "Team name short is required";
		}

		if (!formData.playerName) {
			errors.playerName = "Player name short is required";
		}

		if (!formData.phoneNumber) {
			errors.phoneNumber = "Phone number is required";
		}

		const validPhone = validatePhoneNumber(formData.phoneNumber);

		if (!validPhone) {
			errors.phoneNumber = "Invalid Phone number";
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

	function validatePhoneNumber(phoneNumber) {
		// Regular expression to match a valid Canadian phone number
		const phoneRegex =
			/^(?:\+?1[- ]?)?\(?(?:[2-9][0-9]{2})\)?[- ]?(?:[2-9][0-9]{2})[- ]?(?:[0-9]{4})$/;

		// Check if the phone number matches the regular expression
		if (phoneRegex.test(phoneNumber)) {
			return true; // Phone number is valid
		} else {
			return false; // Phone number is invalid
		}
	}

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
			playerName,
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
			let formObject;
			if (payment === "teamPaidFull") {
				formObject = {
					status: "createTeam",
					teamName: teamName,
					teamNameShort: teamNameShort,
					teamCode: teamCode,
					payment: "full",
					paid: true,
					instagram,
					phoneNumber,
					playerName,
					email: session.user.email,
					division: division._id,
					divisionName: division.divisionName,
				};
			} else {
				formObject = {
					status: "createTeam",
					teamName: teamName,
					teamNameShort: teamNameShort,
					teamCode: teamCode,
					payment: payment,
					instagram,
					phoneNumber,
					playerName,
					email: session.user.email,
					division: division._id,
					divisionName: division.divisionName,
				};
			}

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

	return (
		<>
			{!isSummary ? (
				<>
					<CreateTeamDetails
						setIsSummary={setIsSummary}
						validateForm={validateForm}
						setFormErrors={setFormErrors}
						formErrors={formErrors}
						formData={formData}
						setFormData={setFormData}
					/>
				</>
			) : (
				<>
					<CreateTeamSummary
						division={division}
						setIsSummary={setIsSummary}
						formData={formData}
						handleCreateTeamAndPlayer={handleCreateTeamAndPlayer}
						isLoader={isLoader}
					/>

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
