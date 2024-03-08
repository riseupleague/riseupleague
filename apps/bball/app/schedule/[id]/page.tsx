import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import {
	getAllUpcomingGamesSchedule,
	getGamesByDate,
} from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NewSchedule from "@/components/games/NewSchedule";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";
import Breadcrumb from "@/components/general/Breadcrumb";
import { DivisionWithStats } from "@/types";
import { parse } from "date-fns";
import { Metadata } from "next";

export default async function Schedule({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params;

	const parsedDate = parse(id, "yyyy-MM-dd", new Date());

	const resAllUpcomingGames = await getGamesByDate(parsedDate);
	const { gamesByDate } = await resAllUpcomingGames.json();

	const resAllUpcomingGamesSchedule = await getAllUpcomingGamesSchedule(
		new Date()
	);
	const { allGameDates } = await resAllUpcomingGamesSchedule.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<main>
			{/* new h1 with bg image */}
			<div className="mb-4 bg-[url('/images/register/createTeam.jpg')] bg-cover bg-center bg-no-repeat md:mb-8 lg:mb-12">
				<div className="to-trasparent bg-gradient-to-r from-black">
					<div className="container mx-auto py-8 sm:py-16 lg:py-36">
						<h1 className="font-abolition m-0 mb-4 text-left">
							Season Schedule
						</h1>

						<Breadcrumb />
					</div>
				</div>
			</div>

			<div className="font-barlow container mx-auto min-h-fit">
				<NewSchedule
					selectedDate={parsedDate}
					gamesByDate={gamesByDate}
					divisionsWithStats={divisionsWithStats}
					allGameDates={allGameDates}
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
