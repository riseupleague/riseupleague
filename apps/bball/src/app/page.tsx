import Hero from "@/src/components/home/hero";
import FeaturedSponsors from "@/src/components/home/featured-sponsors";
import AboutRiseUp from "@/src/components/home/about-rise-up";
import PlayersOfTheWeek from "@/src/components/home/players-of-the-week";
import LatestGames from "@/src/components/home/latest-games";
import MVPLadder from "@/src/components/home/mvp-ladder";
import Socials from "@/src/components/home/socials";
import FAQs from "@/src/components/home/faqs";

export default function Page(): JSX.Element {
	return (
		<div className="container mx-auto min-h-screen">
			{/* hero */}
			<Hero />

			{/* featured sponsors */}
			<FeaturedSponsors />

			{/* about */}
			<AboutRiseUp />

			{/* players of the week */}
			<PlayersOfTheWeek />

			{/* latest games */}
			<LatestGames />

			{/* mvp ladder */}
			<MVPLadder />

			{/* socials */}
			<Socials />

			{/* faqs */}
			<FAQs />

			{/* contact us */}

			{/* register */}
		</div>
	);
}
