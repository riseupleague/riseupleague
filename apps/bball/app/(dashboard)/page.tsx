import { Suspense } from "react";
import { Metadata } from "next";
import HomeRegister from "@/components/home/HomeRegister";
import SecondaryHeader from "@/components/structure/header-components/SecondaryHeader";
import SecondaryHeaderSkeleton from "@/components/skeleton/SecondaryHeaderSkeleton";
import PlayersOfTheWeekSkeleton from "@/components/skeleton/PlayersOfTheWeekSkeleton";
import HomePlayersOfTheWeek from "@/components/home/HomePlayersOfTheWeek";
import HomeSocials from "@/components/home/HomeSocials";
import HomeFaq from "@/components/home/HomeFaq";
import HomeContactUs from "@/components/home/HomeContactUs";
import { connectToDatabase } from "@/api-helpers/utils";
import Hero from "@/components/home/Hero";
import TournamentPromo from "@/components/home/TournamentPromo";
import GoogleDrivePhotos from "@/components/home/GoogleDrivePhotos";

const Page = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	return (
		<div className="container mx-auto min-h-fit">
			<Suspense fallback={<SecondaryHeaderSkeleton />}>
				<SecondaryHeader />
			</Suspense>

			{/* <Hero /> */}
			{/* <TournamentPromo /> */}

			<HomeRegister />

			<Suspense fallback={<PlayersOfTheWeekSkeleton />}>
				<HomePlayersOfTheWeek />
			</Suspense>

			<GoogleDrivePhotos />

			<HomeSocials />
			<HomeFaq />
			<HomeContactUs />
		</div>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default Page;
