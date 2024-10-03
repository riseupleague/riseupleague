import { Button } from "@ui/components/button";
import { Metadata } from "next";
import Link from "next/link";

const NotFound = (): JSX.Element => {
	return (
		<div className="container mx-auto flex min-h-[50dvh] flex-col items-center justify-center gap-4 text-center">
			<h2>This page is out of bounds! 🏀🙅‍♂️</h2>
			<h6>(404 error)</h6>
			<p>
				If this page should be working, please DM us on our main IG account:
			</p>
			<Button
				asChild
				className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				<Link href="https://instagram.com/riseup.leagues">@riseup.leagues</Link>
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
};

export const metadata: Metadata = {
	title: "Rise Up League | Error",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default NotFound;
