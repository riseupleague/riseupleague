import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllSeasons } from "@/src/api-helpers/controllers/seasons-controller";
import { getAllCurrentDivisionsWithTeams } from "@/src/api-helpers/controllers/divisions-controller";
import Link from "next/link";
import { Suspense } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import StandingsTable from "@/src/components/standings/StandingsTable";

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
		<section className="container mx-auto min-h-screen">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				standings page
			</h1>
			<Suspense fallback={"loading data..."}>
				<StandingsTable divisions={divisionsWithStats} />
			</Suspense>
		</section>
	);
}
