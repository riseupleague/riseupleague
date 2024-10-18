import Link from "next/link";
import { Button } from "@ui/components/button";
import { getAllPlayersWithAvg } from "@/api-helpers/controllers/players-controller";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { unstable_noStore as noStore } from "next/cache";
import HomeLeaderGrid from "./HomeLeaderGrid";
import { DivisionWithStats } from "@/types";

const HomeLeaders = async (): Promise<JSX.Element> => {
	noStore();

	const resAllPlayers = await getAllPlayersWithAvg();
	const { allPlayers } = await resAllPlayers.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 text-neutral-100 lg:w-1/2">
			<h3>league leaders 🥇</h3>
			<hr />

			<div className="my-4">
				<HomeLeaderGrid
					allPlayers={allPlayers}
					divisions={divisionsWithStats}
				/>
			</div>

			<Link href={`/leaders/stats`} className="w-full">
				<Button className="w-full">View All League Leaders</Button>
			</Link>
		</section>
	);
};

export default HomeLeaders;
