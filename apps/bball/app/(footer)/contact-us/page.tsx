import ContactUs from "@/components/home/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Contact Us",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function ContactUsPage(): Promise<JSX.Element> {
	return (
		<section className="font-barlow container mx-auto min-h-[50dvh]">
			<h1>contact us</h1>
			<ContactUs />
		</section>
	);
}
