"use client";
import DivisionAndDifficulty from "@/components/register/DivisionAndDifficulty";
import SummaryPayment from "@/components/register/create-team/SummaryPayment";
import CustomizeTeam from "@/components/register/create-team/CustomizeTeam";

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
export default function CreateYourTeam(): JSX.Element {
	const [isDivisionSelected, setIsDivisionSelected] = useState(false);
	const [isSummary, setIsSummary] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		teamName: "",
		teamNameShort: "",
		jerseyName: "",
		jerseyNumber: "",
		jerseySize: "",
		shortSize: "",
		termsChecked: false,
		refundChecked: false,
	});
	return (
		<>
			{!isSummary ? (
				<>
					{!isDivisionSelected ? (
						<DivisionAndDifficulty onDivisionSelected={setIsDivisionSelected} />
					) : (
						<CustomizeTeam
							onSummary={setIsSummary}
							formData={formData}
							onFormData={setFormData}
						/>
					)}
				</>
			) : (
				<SummaryPayment formData={formData} />
			)}
		</>
	);
}
