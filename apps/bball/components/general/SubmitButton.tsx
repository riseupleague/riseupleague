"use client";

import { Button } from "@ui/components/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ btnText }: { btnText: string }) => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending} className="w-full">
			{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : btnText}
		</Button>
	);
};

export default SubmitButton;
