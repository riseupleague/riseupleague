import { getAllGames } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Button } from "@ui/components/button";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { convertToEST } from "@utils/utils";

const DivisionPage = async ({ params }: { params: { division: string } }) => {
	await connectToDatabase();

	const resGames = await getAllGames(params.division);
	const { allGames } = await resGames.json();

	const gamesByDate: { date: string; games: any }[] = Object.entries(
		allGames.reduce((acc, game) => {
			const date = format(convertToEST(new Date(game.date)), "yyyy-MM-dd");
			if (!acc[date]) acc[date] = [];
			acc[date].push(game);

			return acc;
		}, {})
	).map(([date, games]) => ({
		date,
		games,
	}));

	return (
		<main className="container mx-auto min-h-fit">
			<h1>{allGames[0].division.divisionName}</h1>

			<div className="flex flex-col gap-2">
				{gamesByDate.map((date, index) => (
					<div key={index}>
						<h3>{format(new Date(date.date), "EEEE, MMMM dd, yyyy")}</h3>

						<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
							{date?.games?.map((game) => (
								<Button
									key={game._id}
									variant="secondary"
									className="flex justify-between"
									asChild
								>
									<Link href={`/${params.division}/${game._id}`}>
										<h5>
											{game.homeTeam.teamName} vs. {game.awayTeam.teamName}
										</h5>
										<p>{format(convertToEST(new Date(game.date)), "h:mm a")}</p>
									</Link>
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default DivisionPage;
