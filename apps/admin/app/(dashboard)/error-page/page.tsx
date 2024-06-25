"use client";

import { useCurrentWorker } from "@/hooks/use-current-worker";
import { Button } from "@ui/components/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
	const worker = useCurrentWorker();

	return (
		<div className="flex flex-col items-center space-y-8">
			<h1>This page cannot be accessed.</h1>

			<Button className="w-fit" variant="signIn" asChild>
				<Link href="/auth/login">Login Page</Link>
			</Button>
		</div>
	);
};

export default ErrorPage;
