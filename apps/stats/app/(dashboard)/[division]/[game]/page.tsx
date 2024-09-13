import { getGameById } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import StatTracker from "@/components/game/StatTracker";

const GamePage = async ({ params }: { params: { game: string } }) => {
	await connectToDatabase();

	const resGame = await getGameById(params.game);
	const { game } = await resGame.json();

	return <StatTracker game={game} />;
};

export default GamePage;
