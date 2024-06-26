"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@ui/components/button";

const SignOutButton = () => {
	return (
		<Button onClick={() => signOut()} variant="secondary" size="lg">
			Sign Out
		</Button>
	);
};

export default SignOutButton;
