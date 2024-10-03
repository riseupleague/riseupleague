"use client";

import { Button } from "@ui/components/button";
import { Checkbox } from "@ui/components/checkbox";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Separator } from "@ui/components/separator";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import getStripe from "@/utils/checkout";
import { useSession } from "next-auth/react";
import { IoLocationOutline } from "react-icons/io5";

interface FormData {
	instagram: string;
	phoneNumber: string;
	playerName: string;
	season: string;
	division: string;
	skills: object;
}

interface CheckboxErrors {
	termsChecked?: string;
	refundChecked?: string;
	playerName?: string;
	phoneNumber?: string;
}

const FreeAgentsSummary = ({
	skills,
	city,
	onReturnPlayerType,
	divisionPricePurposes,
}): JSX.Element => {
	const { data: session, status } = useSession();
	const skillsSum = playerSkillsSum(skills);
	const division = determineDivision(skillsSum, city);
	const [isLoader, setIsLoader] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		instagram: "",
		phoneNumber: "",
		playerName: "",
		season: "",
		division: "free-agent",
		skills: { division: division },
	});
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
			errors.phoneNumber = "Invalid phone number.";
		}

		return errors;
	};

	const [playerName, setPlayerName] = useState("");
	const [instagram, setInstagram] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

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
				status: "freeAgent",
				freeAgent: true,
				season: divisionPricePurposes.season,
				division: "free-agent",
				teamName: "free-agent",
				payment: payment,
				instagram,
				phoneNumber,
				playerName,
				email: session.user.email,
				firstInstalmentPriceId: divisionPricePurposes.firstInstalmentPriceId,
				regularPriceInstalmentId:
					divisionPricePurposes.regularPriceInstalmentId,
			};

			const res = await fetch("/api/actions/add-phone-number", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: session.user.email,
					phoneNumber: phoneNumber,
				}),
			});

			if (Object.keys(errors).length === 0) {
				redirectToCheckout([{ price: itemPriceId, quantity: 1 }], formObject);
			} else {
				setIsLoader(false);

				console.log(Object.keys(errors));
				setCheckboxErrors(errors);
			}
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

	const handlePay = (e) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			divisionPricePurposes.earlyBirdOpen
				? handleCreateTeamAndPlayer(divisionPricePurposes.earlyBirdId, "full")
				: handleCreateTeamAndPlayer(
						divisionPricePurposes.regularPriceFullId,
						"full"
					);
		} else {
			console.log(Object.keys(errors));
			setCheckboxErrors(errors);
		}
	};

	const handlePayInstalments = (e) => {
		e.preventDefault();
		const errors = validateForm();

		if (Object.keys(errors).length === 0) {
			divisionPricePurposes.earlyBirdOpen
				? handleCreateTeamAndPlayer(divisionPricePurposes.earlyBirdId, "four")
				: handleCreateTeamAndPlayer(
						divisionPricePurposes.firstInstalmentPriceId,
						"four"
					);
		} else {
			console.log(Object.keys(errors));
			setCheckboxErrors(errors);
		}
	};

	// const handleJerseyChange = (e, number) => {
	// 	const newValue = e.target.value;
	// 	setJerseyError("");

	// 	// Check if the entered value is not a number
	// 	if (isNaN(newValue)) {
	// 		setJerseyError("Please enter a valid number.");
	// 		return;
	// 	}

	// 	// Check if the entered number is more than 3 characters long
	// 	if (newValue.length > 3) {
	// 		setJerseyError("Jersey numbers cannot be more than 3 characters long.");
	// 		return;
	// 	}

	// 	// Check if the entered number already exists
	// 	if (Object.values(jerseyNumbers).includes(newValue)) {
	// 		setJerseyError("Each jersey number must be unique.");
	// 		return;
	// 	}

	// 	// Update the jerseyNumbers state with the new value
	// 	setJerseyNumbers((prevState) => ({
	// 		...prevState,
	// 		[number]: newValue,
	// 	}));
	// };

	return (
		<>
			<div className="group my-2 flex w-fit items-center gap-3 text-xl">
				<svg
					className="translate-y-[1px] stroke-neutral-300 transition-all group-hover:stroke-neutral-200"
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="20"
					viewBox="0 0 15 20"
					fill="none"
				>
					<path
						d="M8.125 16.25L1.875 10L8.125 3.75"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<button
					onClick={onReturnPlayerType}
					className="text-neutral-300 transition-all group-hover:text-neutral-200"
				>
					Back
				</button>
			</div>

			<div className="mt-10 flex flex-col gap-12 md:flex-row">
				<div className="w-full md:w-2/3 xl:w-3/4">
					<h3 className="mb-6">Summary</h3>
					<Separator className="border-b border-[#374151]" />

					<div className="flex gap-4 py-6">
						<div className="hidden sm:block sm:w-1/4">
							<Image
								src={"/images/register/joinFreeAgent.jpg"}
								alt="create a team image"
								width={250}
								height={250}
							/>
						</div>
						<div className="w-full sm:w-3/4">
							<h4 className="mb-4 text-2xl capitalize">
								Joining As A Free Agent
							</h4>
							<div className="mb-6 flex items-center gap-2">
								<span className="translate-y-[2px]">
									<IoLocationOutline className="size-3 text-[#82878d]" />
								</span>
								<p className="text-xl capitalize">{city}</p>
							</div>
							<ul className="mb-6 flex flex-col  gap-2">
								{Object.entries(skills).map(([key, value]) => {
									return (
										<li key={key}>
											<p className="text-sm">
												<span className="capitalize">{key}</span>:{" "}
												{value as string}{" "}
												{key !== "height" &&
												key !== "position" &&
												key !== "years"
													? "/5"
													: ""}
											</p>
										</li>
									);
								})}
								<li className="text-xl">
									Result: <span className="font-semibold">{division}</span>
									<p className="mt-1 text-sm uppercase text-neutral-500">
										*Placement is not final! it will also depend on space
										available in a division.
									</p>
								</li>
							</ul>

							<p className="mb-9 text-xl">
								Free agents will either be assigned to existing teams or form a
								new team comprised of free agents. Placement will be determined
								based on skill level and available space within divisions.
								<span className="text-xl font-semibold">
									{" "}
									Please ensure availability on Friday, Saturday, Sunday, and
									Monday, as assignments will be scheduled on one of these days.
								</span>
							</p>

							<p className="my-4">
								<strong>Registration Fee Allocation:</strong> Upon immediate
								payment, $50
								<span className="text-sm"> + tax</span> will be allocated
								towards the jersey order, and another $50
								<span className="text-sm"> + tax</span> will be designated for
								gym fees. Please note that there will be no refunds for this
								transaction.
							</p>

							{/* <p className="text-right text-xl">
								Registration Fee: ${divisionPricePurposes.earlyBirdPrice}
							</p> */}

							{divisionPricePurposes?.earlyBirdOpen ? (
								<p className="text-right">
									Early Bird Registration Fee: $
									{divisionPricePurposes?.earlyBirdPrice}
								</p>
							) : (
								<div className="flex justify-end">
									<div>
										<p>
											Registration Fee: $
											{divisionPricePurposes.regularPrice + ".00"}{" "}
											<span className="text-sm"> + tax</span>
										</p>
										<span className="my-2 mr-2 block text-center text-3xl">
											Or
										</span>
										<p>
											${divisionPricePurposes.firstInstalmentPrice + ".00"} +
											tax and ${divisionPricePurposes.instalmentPrice + ".00"} +
											tax three times biweekly
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="w-full md:w-1/3 xl:w-1/4">
					<div className="w-full rounded bg-[#111827] px-4 py-6">
						<h3 className="mb-4 text-base">Please Fill In The Details</h3>

						<Separator className="mb-4 border-b border-[#1F2937]" />

						{/* top 3 jersey numbers */}
						{/* <div className="mt-4 space-y-3">
							<h3 className="mb-4 text-base font-normal uppercase text-[#D1D5DB]">
								Top 3 Jersey Numbers
							</h3>
							<div>
								<Label className="hidden" htmlFor="jersey-number-1">
									Jersey Number 1
								</Label>
								<Input
									className="border border-[#D1D5DB] bg-[#111827]"
									value={jerseyNumbers[1]}
									onChange={(e) => handleJerseyChange(e, 1)}
								/>
							</div>
							<div>
								<Label className="hidden" htmlFor="jersey-number-2">
									Jersey Number 2
								</Label>
								<Input
									className="border border-[#D1D5DB] bg-[#111827]"
									value={jerseyNumbers[2]}
									onChange={(e) => handleJerseyChange(e, 2)}
								/>
							</div>
							<div>
								<Label className="hidden" htmlFor="jersey-number-3">
									Jersey Number 3
								</Label>
								<Input
									className="border border-[#D1D5DB] bg-[#111827]"
									value={jerseyNumbers[3]}
									onChange={(e) => handleJerseyChange(e, 3)}
								/>
							</div>
							{jerseyError && (
								<p className="text-primary text-sm">{jerseyError}</p>
							)}
						</div> */}
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
								placeholder="ex: @riseup.leagues"
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

						{/* terms and conditions */}
						<div className="my-1 flex items-center gap-2">
							<Checkbox
								checked={terms}
								onCheckedChange={(e) => setTerms(true)}
								id="terms-and-conditions"
							/>
							<Label
								htmlFor="terms-and-conditions"
								className="text-sm font-normal text-[#D1D5DB]"
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

						{/* refund policy */}
						<div className="my-1 flex items-center gap-2">
							<Checkbox
								checked={refund}
								onCheckedChange={(e) => setRefund(true)}
								id="refund-policy"
							/>
							<Label
								htmlFor="refund-policy"
								className="text-sm font-normal text-[#D1D5DB]"
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

						<Separator className="my-4 border-b border-[#1F2937]" />

						<section className="mb-4 mt-2 space-y-4">
							<p className="text-base capitalize text-[#F9FAFB]">
								Overall Total:
							</p>
							<p className="text-4xl  capitalize text-[#F9FAFB]">
								$
								{divisionPricePurposes?.earlyBirdOpen
									? divisionPricePurposes?.earlyBirdPrice
									: divisionPricePurposes?.regularPrice}
							</p>
							<Button
								className="mt-10 flex w-full justify-center text-center font-medium"
								onClick={handlePay}
							>
								{isLoader ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Proceed to checkout"
								)}
							</Button>
						</section>

						{!divisionPricePurposes.earlyBirdOpen && (
							<section>
								<Separator className="my-4 border-b border-neutral-600" />

								<p className="mb-4 text-2xl">
									${divisionPricePurposes.firstInstalmentPrice + ".00"} + tax
									and ${divisionPricePurposes.instalmentPrice + ".00"} + tax
									three times biweekly
								</p>
								<Button
									className="mt-10 flex w-full justify-center text-center font-medium"
									onClick={handlePayInstalments}
								>
									{isLoader ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										"Pay in instalments"
									)}
								</Button>
							</section>
						)}

						<p className="font-sm my-4">
							<span className="font-semibold">
								Registration Fee Allocation:
							</span>{" "}
							Upon immediate payment, $50
							<span className="text-sm"> + tax</span> will be allocated towards
							the jersey order, and another $50
							<span className="text-sm"> + tax</span> will be designated for gym
							fees. Please note that there will be no refunds for this
							transaction.
						</p>

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
								Please check the Terms and Conditions.
							</p>
						)}

						{checkboxErrors.refundChecked && (
							<p className="text-primary text-sm">
								Please check the Refund Policy.
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

const playerSkillsSum = (skills) => {
	return (
		skills.shooting +
		skills.dribbling +
		skills.defense +
		skills.fitness +
		skills.understanding +
		skills.years
	);
};

const determineDivision = (skillsSum, city) => {
	// brampton
	if (city.toLowerCase() === "brampton") {
		if (skillsSum < 15) return "Beginner";
		else if (skillsSum >= 15 && skillsSum < 20) return "Intermediate";
		else if (skillsSum >= 20 && skillsSum < 25) return "Great";
		else if (skillsSum >= 25) return "Elite";
	}

	// vaughan
	if (city.toLowerCase() === "vaughan") {
		if (skillsSum < 15) return "Beginner";
		else if (skillsSum >= 15 && skillsSum < 24) return "Intermediate";
		else if (skillsSum >= 24) return "Elite";
	}

	// markham
	if (city.toLowerCase() === "markham") {
		if (skillsSum < 20) return "Beginner";
		else if (skillsSum >= 20) return "Great";
	}
};

export default FreeAgentsSummary;
