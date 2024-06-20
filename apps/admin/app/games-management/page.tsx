import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";
import Link from "next/link";

const GamesManagement = async (): Promise<JSX.Element> => {
	await connectToDatabase();
	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	return (
		<section>
			<h1>games management page</h1>

			<div>
				<Separator className="my-4 border-b border-neutral-400" />
				<div className="flex flex-col gap-2">
					{seasons?.map((season, index) => (
						<Button key={index} variant="secondary" className="p-4" asChild>
							<Link href={`games-management/${season._id}`}>
								<h4>{season.seasonName}</h4>
							</Link>
						</Button>
					))}
				</div>
			</div>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up Admin | Games Management",
};

export default GamesManagement;
