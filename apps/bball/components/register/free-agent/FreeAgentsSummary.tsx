"use client";

import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@ui/components/button";
import { Checkbox } from "@ui/components/checkbox";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Separator } from "@ui/components/separator";
import Link from "next/link";
import { useState } from "react";

interface FormData {
	teamName: string;
	teamNameShort?: string;
	jerseyName: string;
	jerseyNumber: string;
	jerseySize: string;
	shortSize: string;
	termsChecked: boolean;
	refundChecked: boolean;
}

interface CheckboxErrors {
	termsChecked?: boolean;
	refundChecked?: boolean;
}

const FreeAgentsSummary = ({ skills, city }): JSX.Element => {
	const skillsSum = playerSkillsSum(skills);
	const division = determineDivision(skillsSum, city);
	const [checkboxErrors, setCheckboxErrors] = useState<CheckboxErrors>({});

	// form fields
	const [termsAndConditions, setTermsAndConditions] = useState(false);
	const [refundPolicy, setRefundPolicy] = useState(false);

	const validateForm = () => {
		const errors: CheckboxErrors = {};

		if (!termsAndConditions) errors.termsChecked = true;
		if (!refundPolicy) errors.refundChecked = true;

		return errors;
	};

	// when submitting the form
	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = validateForm();
		if (Object.keys(errors).length === 0) {
			setCheckboxErrors({});
		} else setCheckboxErrors(errors);
	};

	return (
		<div className="mt-10 flex flex-col gap-12 md:flex-row">
			<div className="w-full md:w-2/3 xl:w-3/4">
				<h3 className="mb-6">Summary</h3>
				<Separator className="border-b border-[#374151]" />

				<div className="flex py-6">
					<div className="w-1/4">img</div>
					<div className="w-3/4">
						<h4 className="mb-4 text-2xl capitalize">
							Joining As A Free Agent
						</h4>

						<div className="mb-6 flex items-center gap-2">
							<span className="translate-y-[2px]">
								<LocationIcon />
							</span>
							<p className="text-xl capitalize">
								{city} - {division}
							</p>
						</div>

						<p className="mb-9 text-xl">
							Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis. Class
							aptent taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos.
						</p>

						<p className="text-right text-xl">Registration Fee: $210.00</p>
					</div>
				</div>
			</div>

			<div className="w-full md:w-1/3 xl:w-1/4">
				<div className="w-full rounded bg-[#111827] px-4 py-6">
					<h3 className="mb-4 text-base">Please Fill In The Details</h3>

					<Separator className="mb-4 border-b border-[#1F2937]" />

					{/* top 3 jersey numbers */}
					<div className="mt-4 space-y-3">
						<h3 className="mb-4 text-base font-normal uppercase text-[#D1D5DB]">
							Top 3 Jersey Numbers
						</h3>
						<div>
							<Label className="hidden" htmlFor="jersey-number-1">
								Jersey Number 1
							</Label>
							<Input
								id="jersey-number-1"
								placeholder="ie. 1"
								className="border border-[#D1D5DB] bg-[#111827]"
							/>
						</div>
						<div>
							<Label className="hidden" htmlFor="jersey-number-2">
								Jersey Number 2
							</Label>
							<Input
								id="jersey-number-1"
								placeholder="ie. 2"
								className="border border-[#D1D5DB] bg-[#111827]"
							/>
						</div>
						<div>
							<Label className="hidden" htmlFor="jersey-number-3">
								Jersey Number 3
							</Label>
							<Input
								id="jersey-number-3"
								placeholder="ie. 3"
								className="border border-[#D1D5DB] bg-[#111827]"
							/>
						</div>
					</div>

					{/* ig handle */}
					<div className="my-4 space-y-3">
						<Label className="mb-4 text-base font-normal uppercase text-[#D1D5DB]">
							instagram handle*
						</Label>
						<Input
							id="instagram"
							placeholder="ie. @riseup.web"
							className="border border-[#D1D5DB] bg-[#111827]"
						/>
						<p className="text-sm text-[#D1D5DB]">
							INSTAGRAM HANDLE WILL BE USED TO TAG YOU FOR HIGHLIGHTS AND
							PHOTOS. WE WILL ALSO CONTACT YOU THROUGH INSTAGRAM.
						</p>
					</div>

					{/* phone number */}
					<div className="my-4 space-y-3">
						<Label
							htmlFor="phone"
							className="mb-4 text-base font-normal uppercase text-[#D1D5DB]"
						>
							phone number
						</Label>
						<Input
							id="phone"
							placeholder="ie. 416-555-5555"
							className="border border-[#D1D5DB] bg-[#111827]"
						/>
					</div>

					{/* terms and conditions */}
					<div className="my-1 flex items-center gap-2">
						<Checkbox
							checked={termsAndConditions}
							onCheckedChange={(e) => setTermsAndConditions(true)}
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
							checked={refundPolicy}
							onCheckedChange={(e) => setRefundPolicy(true)}
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

					<div className="mb-4 mt-2 space-y-4">
						<p className="text-base capitalize text-[#F9FAFB]">
							overall total:
						</p>
						<p className="text-base capitalize text-[#F9FAFB]">$210.00</p>
						<Button
							onClick={handleSubmit}
							className="w-full font-medium capitalize"
						>
							Pay in Full
						</Button>
					</div>

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
