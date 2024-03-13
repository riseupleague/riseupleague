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
			errors.phoneNumber = "Invalid phone number.";
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
				</>
			)}
		</>
	);
};

export default CustomizeTeam;
