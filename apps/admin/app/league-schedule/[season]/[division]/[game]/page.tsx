import { getGameById } from "@/api-helpers/controllers/games-controller";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import DeleteGame from "@/components/game-management/DeleteGame";
import GameInfo from "@/components/game-management/GameInfo";
import GamePlayersTable from "@/components/game-management/GamePlayersTable";
import UpdateGame from "@/components/game-management/UpdateGame";
import UpdateGameStats from "@/components/game-management/UpdateGameStats";
import AddNewPlayer from "@/components/team-management/AddNewPlayer";
import DeleteTeam from "@/components/team-management/DeleteTeam";
import TeamInfo from "@/components/team-management/TeamInfo";
import TeamPlayersTable from "@/components/team-management/TeamPlayersTable";
import UpdateTeam from "@/components/team-management/UpdateTeam";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Metadata } from "next";

export default async function DivisionPage({
	params,
}: {
	params: { game: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { game } = params;
	const resGame = await getGameById(game);
	const { selectedGame } = await resGame.json();
	return (
		<section>
			<h1>
				Game: <span className="text-primary">{selectedGame?.gameName}</span>
			</h1>

			<GameInfo game={selectedGame} />
			<div className="my-4">
				<UpdateGame game={selectedGame} />
			</div>

			<Separator className="my-4 border-b border-neutral-500" />

			<h2 className="my-10 flex justify-center ">Player Statistics </h2>
			<GamePlayersTable game={selectedGame} />
			<div className="my-10">
				<UpdateGameStats />
			</div>
			{!selectedGame?.status && (
				<div className="my-4">
					<DeleteGame game={selectedGame} />
				</div>
			)}
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
