import { getAllDivisionsWithId } from "@/api-helpers/controllers/divisions-controller";
import {
	getAllSeasons,
	getSeasonById,
} from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import CreateDivision from "@/components/seasons-management/CreateDivision";
import TeamManagement from "@/components/team-management/TeamManagement";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

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

	return (
		<section>
			<h1>{season?.seasonName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			{divisions.length > 0 ? (
				<TeamManagement
					seasons={seasons}
					currentSeason={season}
					divisions={divisions}
				/>
			) : (
				<div className="my-8 space-y-3 text-center">
					<h3 className="text-primary">
						No divisions created in this season yet.
					</h3>
					<CreateDivision seasonId={season._id} />
				</div>
			)}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
