import { getAllCurrentDivisionsWithTeams } from "@/api-helpers/controllers/divisions-controller";
import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import NewSchedule from "@/components/games/NewSchedule";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";
import { DivisionWithStats } from "@/types";
import { convertToEST } from "@/utils/convertToEST";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export default async function Schedule(): Promise<JSX.Element> {
	// get current date -> convert into seconds
	let currentDate = new Date();
	const currentDateInSeconds = currentDate
		.setUTCHours(0, 0, 0, 0)
		.toString()
		.slice(0, 10);

	const resAllUpcomingGames = await getGamesByDate(currentDateInSeconds);
	const { gamesByDate } = await resAllUpcomingGames.json();

	const resDivisions = await getAllCurrentDivisionsWithTeams();
	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	revalidatePath("/schedule", "page");

	return (
		<main className="font-barlow container mx-auto min-h-[100dvh]">
			<h1>Schedule</h1>
			{/* <ScheduleFilterPage gamesByDate={gamesByDate} /> */}
			<NewSchedule
				gamesByDate={gamesByDate}
				divisionsWithStats={divisionsWithStats}
			/>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Schedule",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
