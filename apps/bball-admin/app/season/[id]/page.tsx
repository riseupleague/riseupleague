import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

export default async function SeasonPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const resSeason = await getSeasonById(params.id);
	const { season } = await resSeason.json();

	console.log(season);

	return (
		<section>
			<h1>{season?.seasonName}</h1>

			<div>
				<h2>Divisions</h2>
				<Separator className="my-4 border-b border-neutral-500" />
				<ul className="flex flex-col gap-2">
					{season?.divisions.map((division, index) => (
						<Button key={index} variant="secondary" asChild>
							<Link href={`/season/${params.id}/${division}`}>{division}</Link>
						</Button>
					))}
				</ul>
			</div>
		</section>
	);
}
