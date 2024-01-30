import Link from "next/link";
import { Button } from "@ui/components/button";
import MVPGrid from "../mvp-ladder/MVPGrid";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { unstable_noStore as noStore } from "next/cache";

export default async function MVPLadder(): Promise<JSX.Element> {
	noStore();

	await connectToDatabase();

	const resAllPlayers = await getAllPlayersWithAvg();
	const { allPlayers } = await resAllPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: Division[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3>mvp ladder 🎖️</h3>
			<hr />
			<MVPGrid allPlayers={allPlayers} divisions={divisionsWithStats} />

			<Link href="/mvp-ladder" className="w-full">
				<Button className="w-full">View MVP Ladder Page</Button>
			</Link>
		</section>
	);
}

type Division = {
	_id: string;
	divisionName: string;
	season: string;
	teams: any[];
};
