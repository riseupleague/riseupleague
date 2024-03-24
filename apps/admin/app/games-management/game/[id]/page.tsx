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
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;
	const resGame = await getGameById(id);
	const { game } = await resGame.json();
	return (
		<section>
			<h1>
				Game: <span className="text-primary">{game?.gameName}</span>
			</h1>

			<GameInfo game={game} />

			<div className="my-4">
				{/* <UpdateTeam team={team} /> */}
				<UpdateGame game={game} />
			</div>

			<Separator className="my-4 border-b border-neutral-500" />

			<h2 className="my-10 flex justify-center ">Player Statistics </h2>
			<GamePlayersTable game={game} />
			<div className="my-10">
				<UpdateGameStats />
			</div>
			<Separator className="border-b border-neutral-500" />

			<div className="my-4">
				{/* <DeleteTeam team={team} /> */}
				<DeleteGame />
			</div>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
