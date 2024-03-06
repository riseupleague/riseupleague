"use client";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import submitForm from "@/actions/submitForm";

const NewsletterForm = () => {
	return (
		<form action={submitForm} className="space-y-7">
			<Label htmlFor="email" className="hidden">
				Email
			</Label>
			<Input
				type="text"
				name="email"
				placeholder="Enter your email"
				className="rounded-md px-5 py-4 text-left text-sm font-normal leading-5 text-[#111827]"
			/>

			<Button type="submit" className="w-full bg-[#555B64] text-white">
				Notify Me
			</Button>
		</form>
	);
};

export default NewsletterForm;
