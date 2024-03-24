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
	// Initialize an empty object to store divisions based on city
	const divisionsByCity = {};

	// Iterate through the divisions array
	divisions.forEach((division) => {
		// Check if the city already exists as a key in divisionsByCity
		if (divisionsByCity.hasOwnProperty(division.city)) {
			// If the city exists, push the division to its corresponding array
			divisionsByCity[division.city].push(division);
		} else {
			// If the city doesn't exist, create a new array with the division and assign it to the city key
			divisionsByCity[division.city] = [division];
		}
	});

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
						{
							// Render divisions grouped by city
							Object.keys(divisionsByCity).map((city) => (
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
														href={`/seasons-management/division/${division._id}`}
													>
														{division.divisionName}&nbsp;
														<span
															className={teamColour}
														>{`(${teams}${teams >= 8 ? " - Full" : ""})`}</span>
													</Link>
												</Button>
											);
										})}
									</ul>
								</div>
							))
						}
					</div>
				) : (
					<div className="text-center">
						<h3 className="text-primary my-8">
							No divisions created in this season yet.
						</h3>
					</div>
				)}

				{/* {divisions?.length > 0 ? (
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
				) : (
					<div className="text-center">
						<h3 className="text-primary my-8">
							No divisions created in this season yet.
						</h3>
					</div>
				)} */}
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
