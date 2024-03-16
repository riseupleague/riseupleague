import { getDivisionFromIdWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import UpdateDivision from "@/components/team-management/UpdateDivision";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";
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
			<h1>Division: {division?.divisionName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div className="mb-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-1">
				<h5>Name: {division?.divisionName}</h5>
				<h5>Location: {division?.location}</h5>
				<h5>Description: {division?.description}</h5>
				<h5>City: {division?.city}</h5>
				<h5>Day: {division?.day}</h5>
				<h5>Start Time: {division?.startTime}</h5>
				<h5>End Time: {division?.endTime}</h5>
				{division?.earlyBirdPrice && (
					<>
						<h5>Early Bird Price: {division?.earlyBirdPrice}</h5>
						<h5>
							Early Bird Open:{" "}
							<span
								className={`${division?.earlyBirdOpen ? "text-green-400" : "text-primary"}`}
							>
								{division?.earlyBirdOpen.toString()}
							</span>
						</h5>
					</>
				)}
				<h5>Regular Price: {division?.regularPrice}</h5>
				<h5>Regular Instalment Price (x6): {division?.instalmentPrice}</h5>
				<h5>
					Regular Instalment Price ID: {division?.regularPriceInstalmentId}
				</h5>
				<h5>Early Bird ID: {division?.earlyBirdId}</h5>
				<h5>Regular Full Price ID: {division?.regularPriceFullId}</h5>
			</div>

			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{division.teams.map((team, index) => {
					let players = team?.players.length;
					let playersColour;

					if (players < 6) playersColour = "text-primary";
					else if (players >= 6 && players < 9)
						playersColour = "text-yellow-500";
					else playersColour = "text-green-400";

					return (
						<Button
							key={index}
							variant="secondary"
							className="text-2xl"
							asChild
						>
							<Link href={`/team-management/team/${team?._id}`}>
								{team?.teamName}&nbsp;
								{team?.players && (
									<span className={playersColour}>({players})</span>
								)}
							</Link>
						</Button>
					);
				})}
			</ul>

			<div className="my-8 space-y-3">
				<UpdateDivision division={division} />
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
