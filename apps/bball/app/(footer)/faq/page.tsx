import FAQs from "@/components/home/HomeFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | FAQs",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function FAQ(): JSX.Element {
	return (
		<section className="container mx-auto">
			<h1>FAQ page</h1>
			<FAQs />
		</section>
	);
}
