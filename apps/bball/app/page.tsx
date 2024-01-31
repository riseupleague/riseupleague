import { Suspense } from "react";
import { Metadata } from "next";
import Hero from "@/components/home/hero";
import PlayersOfTheWeek from "@/components/home/PlayersOfTheWeek";
import LatestGames from "@/components/home/LatestGames";
import ContactUs from "@/components/home/ContactUs";
import HomeRegister from "@/components/home/HomeRegister";
import SecondaryHeader from "@/components/structure/header/SecondaryHeader";
import SetYourScheduleButton from "@/components/home/SetYourScheduleButton";
import SocialsSection from "@/components/home/SocialsSection";
import FaqSection from "@/components/home/FaqSection";
import SecondaryHeaderSkeleton from "@/components/skeleton/SecondaryHeaderSkeleton";
import MVPLadder from "@/components/home/MVPLadder";
import MVPLadderSkeleton from "@/components/skeleton/MVPLadderSkeleton";
import PlayersOfTheWeekSkeleton from "@/components/skeleton/PlayersOfTheWeekSkeleton";
import LatestGamesSkeleton from "@/components/skeleton/LatestGamesSkeleton";

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function Page(): JSX.Element {
	return (
		<div className="container mx-auto min-h-[100dvh]">
			<Suspense fallback={<SecondaryHeaderSkeleton />}>
				<SecondaryHeader />
			</Suspense>
			<SetYourScheduleButton />
			<Hero />
			<HomeRegister />
			{/* 
			<FeaturedSponsors />
			<AboutRiseUp /> */}
			<Suspense fallback={<PlayersOfTheWeekSkeleton />}>
				<PlayersOfTheWeek />
			</Suspense>
			<Suspense fallback={<LatestGamesSkeleton />}>
				<LatestGames />
			</Suspense>
			<Suspense fallback={<MVPLadderSkeleton />}>
				<MVPLadder />
			</Suspense>
			<SocialsSection />
			<FaqSection />
			<ContactUs />
		</div>
	);
}
