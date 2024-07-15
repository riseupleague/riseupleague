import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsNameAndId } from "@/api-helpers/controllers/divisions-controller";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getActiveSeason } from "@/api-helpers/controllers/seasons-controller";

export default async function MVPLadder(): Promise<JSX.Element> {
	await connectToDatabase();
	const resActiveSeason = await getActiveSeason();
	const { season } = await resActiveSeason.json();
	redirect(`/leaders/mvp-ladder/${season._id}/${season.divisions[0]}`);
}

export const metadata: Metadata = {
	title: "Rise Up League | MVP Ladder",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
