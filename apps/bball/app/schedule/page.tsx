import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import NewSchedule from "@/components/games/NewSchedule";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";
import Breadcrumb from "@/components/general/Breadcrumb";
import { DivisionWithStats } from "@/types";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export default async function Schedule(): Promise<JSX.Element> {
	await connectToDatabase();

	const dateToday = new Date();

	const resAllUpcomingGames = await getGamesByDate(dateToday);
	const { gamesByDate } = await resAllUpcomingGames.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

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

						<Breadcrumb />
					</div>
				</div>
			</div>

			<div className="font-barlow container mx-auto min-h-fit">
				{/* <ScheduleFilterPage gamesByDate={gamesByDate} /> */}
				<NewSchedule
					date={dateToday}
					gamesByDate={gamesByDate}
					divisionsWithStats={divisionsWithStats}
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
