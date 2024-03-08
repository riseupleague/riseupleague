import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import { getAllFreeAgents } from "@/api-helpers/controllers/players-controller";
import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import EditSeason from "@/components/seasons-management/EditSeason";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import FreeAgentsTable from "@/components/division-management/FreeAgentsTable";

export default async function SeasonPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const resSeason = await getSeasonById(params.id);
	const { season } = await resSeason.json();

	const resDivisions = await getAllDivisionsWithId(params.id);
	const { divisions } = await resDivisions.json();

	const resFreeAgents = await getAllFreeAgents(params.id);
	const { freeAgents } = await resFreeAgents.json();

	return (
		<section>
			<h1>{season?.seasonName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div className="flex flex-col gap-2">
				<h3>
					Name: <span className="text-primary">{season?.seasonName}</span>
				</h3>
				{season?.active !== null && (
					<h3>
						Active:{" "}
						<span className="text-primary">{season?.active?.toString()}</span>
					</h3>
				)}
				{season?.register !== null && (
					<h3>
						Register:{" "}
						<span className="text-primary">{season?.register?.toString()}</span>
					</h3>
				)}
			</div>

			<div>
				<div className="flex justify-between gap-4">
					<h3>Divisions:</h3>
					<Button>Add Division</Button>
				</div>
				<Separator className="my-4 border-b border-neutral-500" />

				<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
								className="text-2xl"
								asChild
							>
								<Link href={`/team-management/division/${division._id}`}>
									{division.divisionName}&nbsp;
									<span
										className={teamColour}
									>{`(${teams}${teams === 8 ? " - Full" : ""})`}</span>
								</Link>
							</Button>
						);
					})}
				</ul>

				<Separator className="my-4 border-b border-neutral-500" />
			</div>

			<EditSeason season={season} id={params.id} />

			<h2 className="my-8">Free Agents</h2>

			<FreeAgentsTable freeAgents={freeAgents} />
		</section>
	);
}
