"use client"; // Error components must be Client Components

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="container mx-auto flex min-h-[50dvh] flex-col items-center justify-center gap-4 text-center">
			<h2>This page is out of bounds! 🏀🙅‍♂️</h2>
			<h6>(404 error)</h6>

			<Button
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-medium uppercase text-neutral-900 transition hover:bg-neutral-200"
				onClick={() => reset()}
			>
				Reload Page
			</Button>

			<p>
				If this page should be working, please DM us on our main IG account:
			</p>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-medium uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				<Link href="https://instagram.com/riseup.bball">@riseup.bball</Link>
			</Button>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-medium uppercase text-neutral-900 transition hover:bg-neutral-200"
			></Button>
			<p>Or go back to the homepage:</p>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-medium uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				<Link href="/">Home</Link>
			</Button>
		</div>
	);
}
