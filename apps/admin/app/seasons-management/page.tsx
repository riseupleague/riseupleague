import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import AddSeason from "@/components/seasons-management/AddSeason";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();
	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	return (
		<section>
			<h1>seasons management</h1>

			<div>
				<Separator className="my-4 border-b border-neutral-400" />
				<div className="flex flex-col gap-2">
					{seasons?.map((season, index) => (
						<Button key={index} variant="secondary" className="p-4" asChild>
							<Link href={`seasons-management/season/${season._id}`}>
								<h4>{season.seasonName}</h4>
							</Link>
						</Button>
					))}
				</div>
			</div>

			<Separator className="my-4 border-b border-neutral-500" />

			<AddSeason />
		</section>
	);
}
