import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllSeasons } from "@/src/api-helpers/controllers/seasons-controller";
import { getAllCurrentDivisionsWithTeams } from "@/src/api-helpers/controllers/divisions-controller";
import Link from "next/link";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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
		// <section className="container mx-auto min-h-screen">
		// 	<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
		// 		standings page
		// 	</h1>
		// 	<pre>{JSON.stringify(divisionsWithStats)}</pre>
		// </section>
		<section className="container mx-auto min-h-screen">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>#</TableHead>
						<TableHead className="w-1/2 text-left sm:w-auto">Team</TableHead>
						<TableHead>W</TableHead>
						<TableHead>L</TableHead>
						<TableHead>GP</TableHead>
						<TableHead>W%</TableHead>
						<TableHead>PD</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{divisionsWithStats[0].teams?.map((team, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell
									className={`w-1/2 text-left sm:w-auto ${
										team.teamBanner && "flex items-center gap-1"
									}`}
								>
									{team.teamBanner && (
										<img
											src={team.teamBanner}
											className="max-h-8 w-auto md:hidden"
										/>
									)}
									<Link href={`/teams/${team._id}`}>
										<p className="hover:underline">{team.teamName}</p>
									</Link>
								</TableCell>
								<TableCell>{team.wins || 0}</TableCell>
								<TableCell>{team.losses || 0}</TableCell>
								<TableCell>{team.gp}</TableCell>
								<TableCell>{team.wpct.toFixed(3)}</TableCell>
								<TableCell
									className={
										team.pointDifference > 0 ? "text-green-500" : "text-red-500"
									}
								>
									{team.pointDifference || 0}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</section>
	);
}
