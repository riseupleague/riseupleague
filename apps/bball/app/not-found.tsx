import { Button } from "@ui/components/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="container mx-auto flex min-h-[50dvh] flex-col items-center justify-center gap-4 text-center">
			<h2>This page is out of bounds! 🏀🙅‍♂️</h2>
			<h6>(404 error)</h6>
			<p>If this page should be working, please contact us below:</p>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				<Link href="/contact-us">Contact Page</Link>
			</Button>
			<p>Or go back to the homepage:</p>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				<Link href="/">Home</Link>
			</Button>
		</div>
	);
}
