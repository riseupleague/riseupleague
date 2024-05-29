import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NewSchedule from "@/components/games/NewSchedule";
import { startOfDay } from "date-fns";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export default async function Schedule(): Promise<JSX.Element> {
	await connectToDatabase();

	// Get the current date and time
	const currentDate = startOfDay(new Date());

	console.log(`currentDate: ${currentDate}`);
	console.log(`timezoneOffset: ${currentDate.getTimezoneOffset()}`);

	// Convert the current date to a Unix timestamp (in milliseconds)
	const unixTimestamp = currentDate.getTime();

	// Convert the Unix timestamp to seconds
	const currentDateInSeconds = Math.floor(unixTimestamp / 1000);

	const resAllUpcomingGames = await getGamesByDate(currentDateInSeconds);
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

	revalidatePath("/schedule", "page");

	return (
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
					dateInSeconds={currentDateInSeconds}
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
