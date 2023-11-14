import { getGamesByDate } from "@/api-helpers/controllers/games-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import ScheduleFilterPage from "@/components/games/ScheduleFilterPage";

export default async function Schedule({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const { id } = params; // Destructure the 'id' property from 'params'

	const resAllUpcomingGames = await getGamesByDate(id);
	const { gamesByDate } = await resAllUpcomingGames.json();
	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<ScheduleFilterPage gamesByDate={gamesByDate} linkDate={id} />
		</main>
	);
}
