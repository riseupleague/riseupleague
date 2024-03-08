"use client";

import { Button } from "@ui/components/button";
import { useFormStatus } from "react-dom";

const NewsletterFormButton = ({ email }) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending || email.length === 0}
			variant="signIn"
			className="w-full"
		>
			{pending ? "Submitting..." : "Notify Me"}
		</Button>
	);
};

export default NewsletterFormButton;
