import { getAllGames } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import Link from "next/link";

const DivisionPage = async ({ params }: { params: { division: string } }) => {
	await connectToDatabase();

	const resGames = await getAllGames(params.division);
	const { allGames } = await resGames.json();

	return (
		<main className="container mx-auto min-h-fit">
			<h1>{allGames[0].division.divisionName}</h1>

			<div className="flex flex-col gap-2">
				{allGames.map((game) => (
					<Button
						key={game._id}
						variant={game.status ? "signIn" : "destructive"}
					>
						<Link href={`/${params.division}/${game._id}`}>
							{game.gameName}
						</Link>
					</Button>
				))}
			</div>
		</main>
	);
};

export default DivisionPage;
