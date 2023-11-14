import { connectToDatabase } from "@/api-helpers/utils";
import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import LeadersTable from "@/components/leaders/LeadersTable";

// Define the type for a Division object
type Division = {
	_id: string; // Assuming _id is a string
	divisionName: string;
	season: string; // Assuming season is a string (ObjectId.toString())
	teams: any[]; // An array of Team objects
};

export default async function Leaders(): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: Division[] } =
		await resDivisions.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-barlow mb-16 mt-8 text-center text-5xl font-medium uppercase">
				league leaders
			</h1>

			<LeadersTable divisions={divisionsWithStats} />
		</section>
	);
}
