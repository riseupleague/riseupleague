import HomeContactUs from "@/components/home/HomeContactUs";
import { Metadata } from "next";

export default async function ContactUsPage(): Promise<JSX.Element> {
	return (
		<section className="font-barlow container mx-auto min-h-[50dvh]">
			<h1>contact us</h1>
			<HomeContactUs />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Contact Us",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
