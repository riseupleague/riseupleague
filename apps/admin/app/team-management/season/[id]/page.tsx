import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

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

	return (
		<section>
			<h1>{season?.seasonName} Divisions</h1>

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
		</section>
	);
}
