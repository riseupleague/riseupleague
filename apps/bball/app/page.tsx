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
import Link from "next/link";

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Page(): Promise<JSX.Element> {
	return (
		<div className="container mx-auto min-h-[100dvh]">
			<SecondaryHeader />

			<section className="font-barlow my-8 flex flex-col items-center justify-center text-center text-neutral-50">
				<h2 className="my-8">Check out the teams for the upcoming season!</h2>
				{/* <p className="mb-8 w-11/12">Winter season registration now open.</p> */}
				<div className="w-full px-2">
					<Link
						href="/teams-upcoming"
						className="font-barlow block w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						View Teams
					</Link>
				</div>
			</section>
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
