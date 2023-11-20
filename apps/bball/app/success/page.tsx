import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Rise Up League | Success!",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and have Rise Up to the challenge!",
};

export default async function Success(): Promise<JSX.Element> {
	redirect(`/`);

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1>Welcome to rise up basketball!</h1>
		</main>
	);
}
