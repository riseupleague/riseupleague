import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Join as a Free Agent",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and have Rise Up to the challenge!",
};

export default function FreeAgents(): JSX.Element {
	return (
		<section className="container mx-auto flex min-h-[100dvh] items-center justify-center">
			<h1 className="font-oswald text-3xl font-medium uppercase">
				Free Agent page
			</h1>
		</section>
	);
}
