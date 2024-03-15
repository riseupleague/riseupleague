import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NoSeasonsFound from "@/components/general/NoSeasonsFound";
import AddSeason from "@/components/seasons-management/AddSeason";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	if (seasons.length !== 0) {
		redirect(`/seasons-management/${seasons[seasons.length - 1]._id}`);
	}

	return <>{seasons.length === 0 ? <NoSeasonsFound /> : <></>}</>;
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Seasons Management",
};
