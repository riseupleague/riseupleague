import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import { getAllFreeAgents } from "@/api-helpers/controllers/players-controller";
import {
	getAllSeasons,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";
import FreeAgentsTable from "@/components/division-management/FreeAgentsTable";
import SeasonManagement from "@/components/seasons-management/SeasonManagement";
import { Metadata } from "next";
import CreateDivision from "@/components/seasons-management/CreateDivision";

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

	const resFreeAgents = await getAllFreeAgents(params.id);
	const { freeAgents } = await resFreeAgents.json();

	return (
		<section>
			<h1 className="mb-8">{season?.seasonName}</h1>

			<SeasonManagement seasons={seasons} currentSeason={season} />

			<Separator className="my-4 border-b border-neutral-500" />

			<div>
				<div className="flex justify-between gap-4">
					<h2 className="mb-8">Divisions</h2>
				</div>

				<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{divisions.map((division, index) => {
						let teams = division.teams.length;
						let teamColour;

						if (teams < 4) teamColour = "text-green-500";
						else if (teams >= 4 && teams < 8) teamColour = "text-yellow-500";
						else teamColour = "text-primary";

						return (
							<Button
								key={index}
								variant="secondary"
								className="text-base lg:text-lg"
								asChild
							>
								<Link href={`/team-management/division/${division._id}`}>
									{division.divisionName}&nbsp;
									<span
										className={teamColour}
									>{`(${teams}${teams >= 8 ? " - Full" : ""})`}</span>
								</Link>
							</Button>
						);
					})}
				</ul>

				<div className="my-4">
					<CreateDivision seasonId={params.id} />
				</div>

				<Separator className="my-4 border-b border-neutral-500" />
			</div>

			{freeAgents.length > 0 && (
				<>
					<h2 className="my-8">Free Agents</h2>
					<FreeAgentsTable freeAgents={freeAgents} />
				</>
			)}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Seasons Management",
};
