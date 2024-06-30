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

	const tournament = {
		price: isRiseUpPlayer
			? tournamentObj.riseUpDiscountPrice
			: tournamentObj.regularPrice,
		priceId: isRiseUpPlayer
			? tournamentObj.riseUpDiscountPriceId
			: tournamentObj.regularPriceId,
		tournamentDivisions: [...tournamentObj.tournamentDivisions],
	};

	return (
		<main className="font-barlow container mx-auto my-10 min-h-fit text-white">
			<TournamentPage tournament={tournament} />
		</main>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};
