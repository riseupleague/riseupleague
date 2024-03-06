"use client";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import submitForm from "@/actions/submitForm";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@ui/components/use-toast";
import { useFormState, useFormStatus } from "react-dom";

const NewsletterForm = () => {
	const { toast } = useToast();
	const { pending } = useFormStatus();
	const [errors, setErrors] = useState("");
	const [email, setEmail] = useState("");

	const formAction = async (formData: FormData) => {
		const newEmail = {
			email: formData.get("email"),
		};

		const result = emailSchema.safeParse(newEmail);

		if (!result.success) {
			setErrors((result as any).error.issues[0].message);
			return;
		}

		toast({
			title: "Success!",
			description: `Your email ${email} has been added to our newsletter.`,
		});

		setErrors("");
		setEmail("");

		await submitForm(newEmail);
	};

	return (
		<form action={formAction} className="space-y-7">
			<Label htmlFor="email" className="hidden">
				Email
			</Label>
			<Input
				type="text"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
				className="rounded-md px-5 py-4 text-left text-base font-normal leading-5 text-[#111827]"
			/>

			<Button
				type="submit"
				disabled={pending}
				variant="signIn"
				className="w-full"
			>
				{pending ? "Submitting..." : "Notify Me"}
			</Button>

			{errors.length > 0 && <p className="text-primary">{errors}</p>}
		</form>
	);
};

const emailSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
});

export default NewsletterForm;
