import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import StandingsTable from "@/components/standings/StandingsTable";

// Define the type for a Division object
type Division = {
	_id: string; // Assuming _id is a string
	divisionName: string;
	season: string; // Assuming season is a string (ObjectId.toString())
	teams: any[]; // An array of Team objects
};

export default async function Standings(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: Division[] } =
		await resDivisions.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				standings page
			</h1>
			<StandingsTable divisions={divisionsWithStats} />
		</section>
	);
}
