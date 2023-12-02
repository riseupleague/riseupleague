import Hero from "@/components/home/hero";
import FeaturedSponsors from "@/components/home/featured-sponsors";
import AboutRiseUp from "@/components/home/about-rise-up";
import PlayersOfTheWeek from "@/components/home/players-of-the-week";
import LatestGames from "@/components/home/latest-games";
import MVPLadder from "@/components/home/mvp-ladder";
import Socials from "@/components/home/socials";
import FAQs from "@/components/home/faqs";
import ContactUs from "@/components/home/contact-us";
import HomeRegister from "@/components/home/home-register";
import SecondaryHeader from "@/components/structure/header/secondary-header";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Page(): Promise<JSX.Element> {
	return (
		<div className="container mx-auto min-h-[100dvh]">
			<SecondaryHeader />
			<Hero />
			<HomeRegister />
			{/* 
			<FeaturedSponsors />
			<AboutRiseUp /> */}
			<PlayersOfTheWeek />
			<LatestGames />
			{/* <MVPLadder /> */}
			<Socials />
			{/* <FAQs /> */}
			<ContactUs />
		</div>
	);
}
