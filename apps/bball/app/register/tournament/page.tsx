import { connectToDatabase } from "@/api-helpers/utils";
import {
	getUserPlayerPayment,
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import TournamentPage from "@/components/register/tournament/TournamentPage";
import { getRegisterTournament } from "@/api-helpers/controllers/tournaments-controller";

export default async function Tournament(): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();
	const isRiseUpPlayer = user.basketball.length > 0;
	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}

	console.log("user:", user);

	const resRegisterTournament = await getRegisterTournament();

	const { tournament } = await resRegisterTournament.json();

	const tournamentObj = {
		_id: "123",
		tournamentName: "Tournament of Power",
		active: false,
		register: true,
		regularPrice: "600",
		regularPriceId: "regularPriceId",
		riseUpDiscountPrice: "550",
		riseUpDiscountPriceId: "riseUpDiscountPriceId",
		otherLeagueDiscountPrice: "450",
		otherLeagueDiscountPriceId: "otherLeagueDiscountPrice",
		tournamentDivisions: [
			{
				tournamentDivisionName: "All Asians",
				tournamentLevel: [
					{
						tournamentLevelName: "Beginner",
						teams: [],
						games: [],
						_id: "beginner",
					},
					{
						tournamentLevelName: "Intermediate",
						teams: [],
						games: [],
						_id: "intermediate",
					},
					{
						tournamentLevelName: "Advanced",
						teams: [],
						games: [],
						_id: "advanced",
					},
				],
				location: "Sheridan",
				city: "Brampton",
				_id: "all-asians",
			},
			{
				tournamentDivisionName: "All Mans Under 6ft",
				tournamentLevel: [
					{
						tournamentLevelName: "Beginner",
						teams: [],
						games: [],
						_id: "beginner",
					},
					{
						tournamentLevelName: "Intermediate",
						teams: [],
						games: [],
						_id: "intermediate",
					},
					{
						tournamentLevelName: "Advanced",
						teams: [],
						games: [],
						_id: "advanced",
					},
				],
				location: "Sheridan",
				city: "Brampton",
				_id: "all-mans-under-6ft",
			},
			{
				tournamentDivisionName: "All Nations",
				tournamentLevel: [
					{
						tournamentLevelName: "Beginner",
						teams: [],
						games: [],
						_id: "beginner",
					},
					{
						tournamentLevelName: "Intermediate",
						teams: [],
						games: [],
						_id: "intermediate",
					},
					{
						tournamentLevelName: "Advanced",
						teams: [],
						games: [],
						_id: "advanced",
					},
					{
						tournamentLevelName: "Elite",
						teams: [],
						games: [],
						_id: "elite",
					},
				],
				location: "Sheridan",
				city: "Brampton",
				_id: "all-nations",
			},
		],
	};

	const isRiseUpCustomer = user.basketball.length > 0;

	const selections = tournament.tournamentDivisions.reduce((acc, division) => {
		// Find or create the city object
		let cityObj = acc.find((c) => c.city === division.city);
		if (!cityObj) {
			cityObj = { city: division.city, divisions: [] };
			acc.push(cityObj);
		}

		// Find or create the division object
		let divisionObj = cityObj.divisions.find(
			(d) => d.division === division.tournamentDivisionName
		);
		if (!divisionObj) {
			divisionObj = { division: division.tournamentDivisionName, levels: [] };
			cityObj.divisions.push(divisionObj);
		}

		// Find or create the level object
		let levelObj = divisionObj.levels.find((l) => l.level === division.level);
		if (!levelObj) {
			levelObj = { level: division.level, division: division };
			divisionObj.levels.push(levelObj);
		}

		return acc;
	}, []);

	// // Convert the object into an array of cities with divisions
	console.log("divisions:", tournament.tournamentDivisions);
	return (
		<main className="font-barlow container mx-auto my-10 min-h-fit text-white">
			<TournamentPage
				tournament={tournament}
				isRiseUpCustomer={isRiseUpCustomer}
				user={user}
				selections={selections}
			/>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
