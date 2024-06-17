import React, { useState } from "react";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import { Button } from "@ui/components/button";
import { z } from "zod";
import { jerseyDetailSchema } from "@/schemas";

// Define TypeScript type for form data
type FormData = {
	jerseyTeamName: string;
	customJersey: boolean;
};

const JerseyDetails = ({ onJerseyDetail, registerInfo, setRegisterInfo }) => {
	// Initialize form data state with proper type
	const [formData, setFormData] = useState<FormData>(
		registerInfo.jerseyDetails || {
			jerseyTeamName: "",
			customJersey: false,
		}
	);

	const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

	const handleJerseyTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, jerseyTeamName: e.target.value });
	};

	const handleCustomJersey = (value: string) => {
		setFormData({ ...formData, customJersey: value === "true" });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = jerseyDetailSchema.safeParse(formData);

		if (!result.success) {
			const formErrors = result.error.formErrors.fieldErrors;
			setErrors(formErrors);
			return;
		}

		const updatedRegisterInfo = {
			...registerInfo,
			jerseyDetails: formData,
		};

		setRegisterInfo(updatedRegisterInfo);
		onJerseyDetail(true);

		setErrors({});
		// Form submission logic here
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Jersey Details</h3>
			<div className="my-8 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 md:grid-cols-2">
				<div className="space-y-3">
					<Label htmlFor="jerseyTeamName" className="text-xl uppercase">
						Jersey Team Name
					</Label>
					<Input
						variant="form"
						type="text"
						name="jerseyTeamName"
						placeholder="Enter your Team's Jersey Name"
						value={formData.jerseyTeamName}
						onChange={handleJerseyTeamName}
					/>
					{errors.jerseyTeamName && (
						<p className="text-red-500">{errors.jerseyTeamName[0]}</p>
					)}
				</div>
			</div>

			<div className="my-8 grid grid-cols-1 gap-3 rounded border border-neutral-600 bg-[#111827] px-4 py-6 ">
				<div className="space-y-3">
					<Label htmlFor="customJersey" className="text-xl uppercase">
						Would you like to have a custom design jersey for an additional fee
						of $150?
					</Label>
					<Select onValueChange={handleCustomJersey}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="No, I'll stick with Rise Up's Jerseys" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="true">Yes</SelectItem>
							<SelectItem value="false">
								No, I&apos;ll stick with Rise Up&apos;s Jerseys
							</SelectItem>
						</SelectContent>
					</Select>
					{errors.customJersey && (
						<p className="text-red-500">{errors.customJersey[0]}</p>
					)}
				</div>
			</div>

			<Button type="submit" className="w-full">
				Continue
			</Button>
		</form>
	);
};

export default JerseyDetails;
