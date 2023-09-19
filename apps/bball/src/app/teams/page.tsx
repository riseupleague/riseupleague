import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllSeasons } from "@/src/api-helpers/controllers/seasons-controller";
import { getAllCurrentTeams } from "@/src/api-helpers/controllers/teams-controller";
interface Season {
	_id: string;
	seasonName: string;
	active: boolean;
	divisions: string[];
	__v: number;
}
export default async function Teams(): Promise<JSX.Element> {
	await connectToDatabase();
	const resSeasons = await getAllSeasons();
	const { seasons }: { seasons: Season[] } = await resSeasons.json(); // Specify the type
	// Find the season with active: true
	const activeSeason = seasons.find((season) => season.active === true);

	if (activeSeason) {
		// If an active season is found, call getAllCurrentDivisionsWithTeams
		const resTeams = await getAllCurrentTeams(activeSeason._id);
		// Continue with the rest of your code here
		const { teams } = await resTeams.json(); // Specify the type
		console.log(teams);
	} else {
		// Handle the case when no active season is found
		// You can show a message or render something else
	}
	return (
		<section className="container mx-auto flex min-h-[100dvh] items-center justify-center">
			<h1 className="font-oswald text-3xl font-medium uppercase">
				teams page danny
			</h1>
		</section>
	);
}
