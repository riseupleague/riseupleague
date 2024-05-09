import { getDivisionFromIdWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import EditDivision from "@/components/team-management/EditDivision";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

export default async function DivisionPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivision = await getDivisionFromIdWithTeams(params.id);
	const { division } = await resDivision.json();

	return (
		<section>
			<h1>
				Division: <span className="text-primary">{division?.divisionName}</span>
			</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div className="mb-4 flex flex-col gap-2">
				<h3>
					Name: <span className="text-primary">{division?.divisionName}</span>
				</h3>
				<h3>
					Location: <span className="text-primary">{division?.location}</span>
				</h3>
				<h3>
					Day: <span className="text-primary">{division?.day}</span>
				</h3>
				<h3>
					Start Time:{" "}
					<span className="text-primary">{division?.startTime}</span>
				</h3>
				<h3>
					End Time: <span className="text-primary">{division?.endTime}</span>
				</h3>
				{division?.earlyBirdPrice && (
					<>
						<h3>
							Early Bird Price:{" "}
							<span className="text-primary">{division?.earlyBirdPrice}</span>
						</h3>
						<h3>
							Early Bird Open:{" "}
							<span className="text-primary">
								{division?.earlyBirdOpen.toString()}
							</span>
						</h3>
					</>
				)}
				<h3>
					Regular Price:{" "}
					<span className="text-primary">{division?.regularPrice}</span>
				</h3>
			</div>

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{division.teams.map((team, index) => {
					return (
						<Button
							key={index}
							variant="secondary"
							className="text-2xl"
							asChild
						>
							<Link href={`/team-management/team/${team?._id}`}>
								{team?.teamName}
							</Link>
						</Button>
					);
				})}
			</ul>

			<div className="my-8">
				<EditDivision division={division} />
			</div>
		</section>
	);
}
