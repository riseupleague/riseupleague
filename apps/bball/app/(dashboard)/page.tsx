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
import HomeCurrentSeasonStandings from "@/components/home/HomeCurrentSeasonStandings";
import HomeLeagueLeaders from "@/components/home/HomeLeagueLeaders";
import HomeLatestYoutubeVideos from "@/components/home/HomeLatestYoutubeVideos";
import LatestGames from "@/components/home/LatestGames";
import HomeUpcomingGames from "@/components/home/HomeUpcomingGames";
import HomeLeaders from "@/components/home/HomeLeaders";
import HomePromoBanner from "@/components/home/HomePromoBanner";
import HomeSkillsAssesment from "@/components/home/HomeSkillsAssesment";
import HomeGymFinder from "@/components/home/HomeGymFinder";

const Page = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	return (
		<div className="">
			{/* <Suspense fallback={<SecondaryHeaderSkeleton />}>
				<SecondaryHeader />
			</Suspense> */}

			{/* <Hero /> */}
			{/* <TournamentPromo /> */}
			<HomeRegister />

			<HomePromoBanner />

			<div className="container mx-auto flex min-h-fit flex-col gap-10 lg:flex-row">
				<HomeSkillsAssesment />

				<HomeLeaders />
			</div>

			{/* <HomeGymFinder /> */}

			<div className="container mx-auto flex min-h-fit flex-col lg:flex-row">
				<HomeLatestYoutubeVideos />
				<HomeCurrentSeasonStandings />
			</div>

			<Suspense fallback={<PlayersOfTheWeekSkeleton />}>
				<HomePlayersOfTheWeek />
			</Suspense>

			<Suspense fallback={<PlayersOfTheWeekSkeleton />}>
				<HomeLeagueLeaders />
			</Suspense>

			<HomeUpcomingGames />

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
