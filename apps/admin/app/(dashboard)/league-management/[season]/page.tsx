import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import { getAllFreeAgents } from "@/api-helpers/controllers/players-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";
import FreeAgentsTable from "@/components/division-management/FreeAgentsTable";
import SeasonManagement from "@/components/seasons-management/SeasonManagement";
import { Metadata } from "next";
import CreateDivision from "@/components/seasons-management/CreateDivision";
import { isRouteForCommissioner } from "@/utils/isRouteForCommissioner";
import {
	getAllSeasons,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";

export default async function SeasonPage({
	params,
}: {
	params: { season: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	// Check if worker can view route
	// await isRouteForCommissioner();

	// Fetch all data concurrently using Promise.all
	const [seasonsRes, seasonRes, divisionsRes, freeAgentsRes] =
		await Promise.all([
			getAllSeasons(),
			getSeasonById(params.season),
			getAllDivisionsWithId(params.season),
			getAllFreeAgents(params.season),
		]);

	// Parse JSON from responses
	const [seasonsData, seasonData, divisionsData, freeAgentsData] =
		await Promise.all([
			seasonsRes.json(),
			seasonRes.json(),
			divisionsRes.json(),
			freeAgentsRes.json(),
		]);

	// Extract data
	const seasons = seasonsData.seasons;
	const season = seasonData.season;
	const divisions = divisionsData.divisions;
	const freeAgents = freeAgentsData.freeAgents;

	// Create divisionsByCity using Array.reduce
	const divisionsByCity = divisions?.reduce((acc, division) => {
		const { city } = division;
		acc[city] = acc[city] || [];
		acc[city].push(division);
		return acc;
	}, {});

	return (
		<section>
			<h1 className="mb-8">{season?.seasonName}</h1>

			<SeasonManagement seasons={seasons} currentSeason={season} />

			<Separator className="my-4 border-b border-neutral-500" />

			<div>
				<div className="flex justify-between gap-4">
					<h2 className="mb-8">Divisions</h2>
				</div>

				{divisions?.length > 0 ? (
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
						{Object.keys(divisionsByCity).map((city) => (
							<div key={city}>
								<p className="my-2 text-center uppercase">{city}</p>

								<ul className="grid grid-cols-1 gap-2 ">
									{divisionsByCity[city].map((division) => {
										let teams = division.teams.length;
										let teamColour;

										if (teams < 4) teamColour = "text-green-500";
										else if (teams >= 4 && teams < 8)
											teamColour = "text-yellow-500";
										else teamColour = "text-primary";

										return (
											<Button
												key={division._id}
												variant="secondary"
												className="text-base lg:text-lg"
												asChild
											>
												<Link
													href={`/league-management/${season?._id}/${division._id}`}
												>
													{division.divisionName}&nbsp;
													<span className={teamColour}>{`(${teams}${
														teams >= 8 ? " - Full" : ""
													})`}</span>
												</Link>
											</Button>
										);
									})}
								</ul>
							</div>
						))}
					</div>
				) : (
					<div className="text-center">
						<h3 className="text-primary my-8">
							No divisions created in this season yet.
						</h3>
					</div>
				)}

				<div className="my-4">
					<CreateDivision seasonId={params.season} />
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
