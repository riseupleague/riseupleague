import Link from "next/link";
import { Button } from "@ui/components/button";
import { getAllPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { unstable_noStore as noStore } from "next/cache";
import HomeMVPGrid from "../mvp-ladder/HomeMVPGrid";
import { DivisionWithStats } from "@/types";

export default async function MVPLadder(): Promise<JSX.Element> {
	noStore();

	const resAllPlayers = await getAllPlayersWithAvg();
	const { allPlayers } = await resAllPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3>mvp ladder 🎖️</h3>
			<hr />
			<HomeMVPGrid allPlayers={allPlayers} divisions={divisionsWithStats} />

			<Link href="/mvp-ladder" className="w-full">
				<Button className="w-full">View MVP Ladder Page</Button>
			</Link>
		</section>
	);
}
