"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInDialog from "../auth/SignInDialog";
import { useState } from "react";

export default function HomeRegister() {
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	return (
		<section className="font-barlow my-8 flex flex-col items-center justify-center text-center text-neutral-50">
			<h2 className="my-8">Ready to elevate your basketball experience?</h2>
			<div className="w-full px-2">
				{!session || !session.user ? (
					<Button className="w-full" onClick={openDialog}>
						Register Now
					</Button>
				) : (
					<Link href="/register" className="w-full">
						<Button className="w-full">Register Now</Button>
					</Link>
				)}
			</div>
			<SignInDialog open={open} onOpenChange={setOpen} />
		</section>
	);
}
