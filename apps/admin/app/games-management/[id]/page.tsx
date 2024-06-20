import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Separator } from "@ui/components/separator";
import { getAllGamesBySeasonId } from "@/api-helpers/controllers/games-controller";
import { format } from "date-fns";
import { Metadata } from "next";

export default async function SeasonPage({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeason = await getSeasonById(params.id);
	const { season } = await resSeason.json();

	const resGames = await getAllGamesBySeasonId(params.id);
	const { games } = await resGames.json();

	return (
		<section>
			<h1>{season?.seasonName}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{games.map((game, index) => (
					<div
						key={index}
						className="my-2 w-full grid-cols-1 rounded border border-neutral-500 p-4"
					>
						<p>{game.gameName}</p>
						<p>{format(new Date(game.date), "dd/MM/yyyy")}</p>
					</div>
				))}
			</div>
		</section>
	);
}
export const metadata: Metadata = {
	title: "Rise Up Admin | Games Management",
};
