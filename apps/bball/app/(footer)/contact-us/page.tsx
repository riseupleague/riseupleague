import ContactUs from "@/components/home/contact-us";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Contact",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function ContactUsPage(): JSX.Element {
	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1>contact us</h1>

			<ContactUs />
		</section>
	);
}
