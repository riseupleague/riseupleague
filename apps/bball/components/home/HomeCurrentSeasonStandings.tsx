import { unstable_noStore as noStore } from "next/cache";
import { getAllDivisionsWithTeamsByActiveSeason } from "@/api-helpers/controllers/divisions-controller";
import { DivisionWithStats } from "@/types";
import HomeStandingsTable from "./HomeStandingsTable";
import Image from "next/image";
import { Button } from "@ui/components/button";
import Link from "next/link";
import { connectToDatabase } from "@/api-helpers/utils";

const HomeCurrentSeasonStandings = async (): Promise<JSX.Element> => {
	noStore();

	await connectToDatabase();

	const resDivisions = await getAllDivisionsWithTeamsByActiveSeason();

	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 flex w-full flex-col justify-between text-neutral-100 lg:w-1/2">
			<HomeStandingsTable divisionsWithStats={divisionsWithStats} />
		</section>
	);
};

export default HomeCurrentSeasonStandings;
