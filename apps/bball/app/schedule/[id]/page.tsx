import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NewSchedule from "@/components/games/NewSchedule";
import { Metadata } from "next";

export default async function Schedule({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;

	const resAllUpcomingGames = await getGamesByDate(id);
	const { gamesByDate } = await resAllUpcomingGames.json();
	let divisionNamesAndCities = [];
	let cities = [];

	if (gamesByDate) {
		const divisionNamesAndCitiesArrays = gamesByDate[0]?.games.reduce(
			(result, game) => {
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
		// <main className="font-barlow container  mx-auto min-h-fit text-white">
		// 	<ScheduleFilterPage gamesByDate={gamesByDate} />
		// </main>
		<main>
			{/* new h1 with bg image */}
			<div className="mb-4 bg-[url('/images/register/createTeam.jpg')] bg-cover bg-center bg-no-repeat md:mb-8 lg:mb-12">
				<div className="to-trasparent bg-gradient-to-r from-black">
					<div className="container mx-auto py-8 sm:py-16 lg:py-36">
						<h1 className="font-abolition m-0 mb-4 text-left">
							Season Schedule
						</h1>

						{/* <Breadcrumb /> */}
					</div>
				</div>
			</div>

			<div className="font-barlow container mx-auto min-h-fit">
				{/* <ScheduleFilterPage gamesByDate={gamesByDate} /> */}
				<NewSchedule
					gamesByDate={gamesByDate}
					divisions={divisionNamesAndCities}
					cities={cities}
					formattedEstDate={id}
				/>
			</div>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Schedule",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
