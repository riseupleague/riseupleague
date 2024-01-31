import Link from "next/link";
import { Button } from "@ui/components/button";
import { connectToDatabase } from "@/api-helpers/utils";
import { getAllPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { unstable_noStore as noStore } from "next/cache";
import LeaderGrid from "../leaders/LeaderGrid";

export default async function HomeLeaders(): Promise<JSX.Element> {
	noStore();

	await connectToDatabase();

	const resAllPlayers = await getAllPlayersWithAvg();
	const { allPlayers } = await resAllPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: Division[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3>league leaders 🎖️</h3>
			<hr />

			<div className="my-4">
				<LeaderGrid allPlayers={allPlayers} divisions={divisionsWithStats} />
			</div>

			<Link href="/leaders" className="w-full">
				<Button className="w-full">View All League Leaders</Button>
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
