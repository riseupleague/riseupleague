import { getSeasonById } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Separator } from "@ui/components/separator";
import {
	getAllGamesBySeasonId,
	getGamesByDate,
} from "@/api-helpers/controllers/games-controller";
import { format } from "date-fns";
import { Metadata } from "next";
import GamesListByDate from "@/components/game-management/GamesListByDate";

export default async function SeasonPage({
	params,
}: {
	params: { date: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	await connectToDatabase();
	const { date } = params;
	const resAllUpcomingGames = await getGamesByDate(date);
	const { gamesByDate } = await resAllUpcomingGames.json();
	let divisionNamesAndCities = [];
	let cities = [];

	if (gamesByDate) {
		const divisionNamesAndCitiesArrays = gamesByDate[0]?.games.reduce(
			(result, game) => {
				// Extract division names (unique)
				if (
					!result.divisionNamesAndCities.find(
						(item) => item._id === game.division._id
					)
				) {
					result.divisionNamesAndCities.push({
						_id: game.division._id,
						divisionName: game.division.divisionName,
						city: game.division.city,
					});
				}

				// Extract cities (unique)
				if (!result.cities.includes(game.division.city)) {
					result.cities.push(game.division.city);
				}

				return result;
			},
			{ divisionNamesAndCities: [], cities: [] }
		);
		divisionNamesAndCities =
			divisionNamesAndCitiesArrays?.divisionNamesAndCities || [];
		cities = divisionNamesAndCitiesArrays?.cities || [];
	}
	return (
		<section>
			<div className="mb-4 bg-[url('/images/register/createTeam.jpg')] bg-cover bg-center bg-no-repeat md:mb-8 lg:mb-12">
				<div className="to-trasparent bg-gradient-to-r from-black">
					<div className="container mx-auto py-8 sm:py-16 lg:py-36">
						<h1 className="font-abolition m-0 mb-4 text-left">
							Games Management
						</h1>

						{/* <Breadcrumb /> */}
					</div>
				</div>
			</div>

			<div className="font-barlow container mx-auto min-h-fit">
				{/* <ScheduleFilterPage gamesByDate={gamesByDate} /> */}

				<GamesListByDate
					gamesByDate={gamesByDate}
					divisions={divisionNamesAndCities}
					cities={cities}
					dateInSeconds={date}
				/>
			</div>
		</section>
	);
}
export const metadata: Metadata = {
	title: "Rise Up Admin | Games Management",
};
