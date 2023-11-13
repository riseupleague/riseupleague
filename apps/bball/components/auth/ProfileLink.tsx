"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@ui/components/button";

import SignInDialog from "@/components/auth/SignInDialog";
const ProfileLink = () => {
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	// Function to close the dialog
	const closeDialog = () => {
		setOpen(false);
	};
	return (
		<div className="bg-neutral-800">
			{status === "authenticated" ? (
				<>
					<Image
						src={session?.user?.image}
						width={60}
						height={60}
						alt="profile photo"
						className="rounded-full"
					/>

					<span>{session?.user?.name}</span>
					<Button variant="register" onClick={() => signOut()}>
						Log Out
					</Button>
				</>
			) : (
				<>
					<Button onClick={openDialog} variant="register">
						Log In
					</Button>
					<SignInDialog open={open} onOpenChange={setOpen} />
				</>
			)}
		</div>
	);
};
export default ProfileLink;
