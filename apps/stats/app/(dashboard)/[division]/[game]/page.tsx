import { getGameById } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";

const GamePage = async ({ params }: { params: { game: string } }) => {
	await connectToDatabase();

	const resGame = await getGameById(params.game);
	const { game } = await resGame.json();

	return (
		<main className="container mx-auto min-h-fit">
			<h1>{game?.gameName}</h1>

			{/* first check if game is finished or not */}
			{/* if so, show summary + edit button */}

			{/* if not, show rosters of each team, add player button, continue, or default win button */}
		</main>
	);
};

export default GamePage;
