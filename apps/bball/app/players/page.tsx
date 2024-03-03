import { getAllCurrentPlayers } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import PlayerGrid from "@/components/players/PlayerGrid";
import { Metadata } from "next";

export default async function Players(): Promise<JSX.Element> {
	await connectToDatabase();

	const res = await getAllCurrentPlayers();
	const { allPlayers } = await res.json();

	return (
		<section className="container mx-auto min-h-fit">
			<h1>league roster</h1>
			<PlayerGrid allPlayers={allPlayers} />
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Players",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
