import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import EditSeason from "@/components/seasons-management/EditSeason";
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
			<h1>{season?.seasonName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div className="flex flex-col gap-2">
				<h3>
					Name: <span className="text-primary">{season?.seasonName}</span>
				</h3>
				<h3>
					Active:{" "}
					<span className="text-primary">{season?.active.toString()}</span>
				</h3>
			</div>

			<div>
				<div className="flex justify-between gap-4">
					<h3>Divisions:</h3>
					<Button>Add Division</Button>
				</div>
				<Separator className="my-4 border-b border-neutral-500" />

				<ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{divisions.map((division, index) => (
						<Button key={index} variant="secondary" asChild>
							<Link href={`/team-management/division/${division._id}`}>
								{division.divisionName}
							</Link>
						</Button>
					))}
				</ul>

				<Separator className="my-4 border-b border-neutral-500" />
			</div>

			<EditSeason season={season} />
		</section>
	);
}
