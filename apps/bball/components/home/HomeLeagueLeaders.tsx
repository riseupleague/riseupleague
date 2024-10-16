import { unstable_noStore as noStore } from "next/cache";
import { getAllDivisionsWithTeamsByActiveSeason } from "@/api-helpers/controllers/divisions-controller";
import { DivisionWithStats } from "@/types";
import HomeStandingsTable from "./HomeStandingsTable";
import Image from "next/image";
import { Button } from "@ui/components/button";
import Link from "next/link";
import { connectToDatabase } from "@/api-helpers/utils";

const HomeLeagueLeaders = async (): Promise<JSX.Element> => {
	noStore();

	await connectToDatabase();
	const resDivisions = await getAllDivisionsWithTeamsByActiveSeason();

	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 flex  justify-between text-neutral-100 "></section>
	);
};

export default HomeLeagueLeaders;
