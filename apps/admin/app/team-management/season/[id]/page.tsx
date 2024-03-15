import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import {
	getAllSeasons,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import TeamManagement from "@/components/team-management/TeamManagement";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";
import Link from "next/link";

export default async function SeasonPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	const resSeason = await getSeasonById(params.id);
	const { season } = await resSeason.json();

	const resDivisions = await getAllDivisionsWithId(params.id);
	const { divisions } = await resDivisions.json();

	return (
		<section>
			<h1>{season?.seasonName} Divisions</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<TeamManagement
				seasons={seasons}
				currentSeason={season}
				divisions={divisions}
			/>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
