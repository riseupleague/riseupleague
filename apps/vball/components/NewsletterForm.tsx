"use client";

import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import submitForm from "@/actions/submitForm";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@ui/components/use-toast";
import NewsletterFormButton from "./NewsletterFormButton";

const NewsletterForm = () => {
	const { toast } = useToast();
	const [errors, setErrors] = useState("");
	const [email, setEmail] = useState("");

	const addEmail = async (formData: FormData) => {
		const newEmail = {
			email: formData.get("email"),
		};

		const result = emailSchema.safeParse(newEmail);

		if (!result.success) {
			setErrors((result as any).error.issues[0].message);
			return;
		}

		const response = await submitForm(newEmail);
		toast(response);

		setErrors("");
		setEmail("");
	};

	return (
		<form action={addEmail} className="space-y-7">
			<Label htmlFor="email" className="hidden">
				Email
			</Label>
			<Input
				type="email"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
				className="rounded-md px-5 py-4 text-left text-base font-normal leading-5 text-[#111827] disabled:cursor-not-allowed"
			/>

			<NewsletterFormButton email={email} />

			{errors.length > 0 && <p className="text-primary">{errors}</p>}
		</form>
	);
};

const emailSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
});

export default NewsletterForm;
