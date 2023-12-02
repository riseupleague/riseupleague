import ContactUs from "@/components/home/contact-us";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Contact",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function ContactUsPage(): JSX.Element {
	return (
		<section className="font-barlow container mx-auto min-h-[50dvh]">
			<h1>contact us</h1>
			<form className="mx-auto flex h-fit max-w-3xl flex-col gap-4 rounded border border-neutral-400 px-4 py-8 sm:mt-32">
				{/* name */}
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Name:</label>
					<Input id="name" type="name" />
				</div>

				{/* email */}
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email:</label>
					<Input id="email" type="email" />
				</div>

				{/* message */}
				<div className="flex flex-col gap-2">
					<label htmlFor="message">Message:</label>
					<Input id="message" type="message" />
				</div>
				<Button type="submit" variant="register">
					submit
				</Button>
			</form>
		</section>
	);
}
