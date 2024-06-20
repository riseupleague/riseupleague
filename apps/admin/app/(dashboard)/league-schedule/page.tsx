import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	try {
		await connectToDatabase();

		const resSeasons = await getAllSeasons();
		const { seasons } = await resSeasons.json();
		// Find the active season

		const activeSeason = seasons.findLast((season) => season.active === true);
		// Redirect to active season if one exists
		if (activeSeason) {
			redirect(`/league-schedule/${activeSeason._id}`);
		}

		redirect(`/league-schedule/${seasons[seasons.length - 1]._id}`);
	} catch (error) {
		// Handle any errors gracefully
		console.error("An error occurred:", error);
		// You might want to redirect to an error page or display an error message
		throw error;
	}
}

export const metadata: Metadata = {
	title: "Rise Up Admin | League Schedule",
};
