import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NoSeasonsFound from "@/components/general/NoSeasonsFound";
import { currentWorker } from "@/utils/currentWorker";
import { isRouteForCommissioner } from "@/utils/isRouteForCommissioner";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	try {
		// Connect to the database
		await connectToDatabase();

		// Check if worker can view route
		await isRouteForCommissioner();
		// Fetch all seasons
		const resSeasons = await getAllSeasons();
		const { seasons } = await resSeasons.json();

		// Find the active season
		const activeSeason = seasons.find((season) => season.active === true);

		// Redirect to active season if one exists
		if (activeSeason) {
			redirect(`/league-management/${activeSeason._id}`);
			return null; // This line is important to prevent rendering anything on the page
		}

		// Render NoSeasonsFound component if no seasons exist
		return <NoSeasonsFound />;
	} catch (error) {
		// Handle any errors gracefully
		console.error("An error occurred:", error);
		// You might want to redirect to an error page or display an error message
		throw error;
	}
}

// Define metadata for the page
export const metadata: Metadata = {
	title: "Rise Up Admin | Seasons Management",
};
