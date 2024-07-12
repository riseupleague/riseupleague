import { connectToDatabase } from "@/api-helpers/utils";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { getAllCurrentDivisions } from "@/api-helpers/controllers/divisions-controller";

const StatsApp = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisions();
	const { divisions } = await resDivisions.json();

	return (
		<section className="container mx-auto min-h-fit">
			<h1>Stats page</h1>

			<div className="flex flex-col gap-4">
				{divisions.map((division) => (
					<Button key={division._id} variant="signIn" size="lg" asChild>
						<Link href={`/${division._id}`}>{division.divisionName}</Link>
					</Button>
				))}
			</div>
		</section>
	);
};

export default StatsApp;
