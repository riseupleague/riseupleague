import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	const activeSeason = seasons.findLast((season) => season.active === true);

	if (seasons.length !== 0) {
		redirect(`/league-schedule/${activeSeason._id}`);
	}

	redirect(`/league-schedule/${seasons[seasons.length - 1]._id}`);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | League Schedule",
};
