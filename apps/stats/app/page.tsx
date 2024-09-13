import { connectToDatabase } from "@/api-helpers/utils";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { getAllCurrentDivisions } from "@/api-helpers/controllers/divisions-controller";

const StatsApp = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	const resDivisions = await getAllCurrentDivisions();
	const { divisions } = await resDivisions.json();

	const groupedDivisions = divisions.reduce((acc, division) => {
		const divisionName = division.divisionName.toLowerCase();
		const level = divisionName.includes("beginner")
			? "beginner"
			: divisionName.includes("intermediate")
				? "intermediate"
				: divisionName.includes("elite")
					? "elite"
					: null;

		if (level) {
			const existingLevel = acc.find((l) => l.level === level);
			if (existingLevel) {
				existingLevel.divisions.push(division);
			} else {
				acc.push({ level, divisions: [division] });
			}
		}

		return acc;
	}, []);

	return (
		<section className="container mx-auto min-h-fit">
			<h1>Stats page</h1>

			<div className="space-y-8">
				{groupedDivisions.map((level, index) => (
					<div key={index}>
						<h3>{level.level}</h3>

						<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
							{level.divisions.map((division, index) => (
								<Button key={index} variant="secondary" asChild>
									<Link href={`/${division._id}`}>
										{division.divisionName} -&nbsp;
										<span className="capitalize">{division.city}</span>
									</Link>
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default StatsApp;
