import { connectToDatabase } from "@/api-helpers/utils";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import ChooseTeam from "@/components/register/join-team/ChooseTeam";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function JoinTeam({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const resDivision = await getRegisterDivisionById(params.id);
	const { division } = await resDivision.json();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}
	const paidTeams = division.teams.filter((team) => team.paid);
	const newDivision = { ...division, teams: paidTeams };

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();
	const selectedPlayer = players.find((player) => {
		console.log(player, season);
		return player.season === season;
	});
	if (selectedPlayer) {
		if (selectedPlayer.paid) {
			if (selectedPlayer.division === params.id) {
				redirect(`/`);
			}
		}
	}

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join a team
			</h1>

			<ChooseTeam
				division={newDivision}
				session={session}
				player={selectedPlayer ? selectedPlayer : false}
				userTeam={selectedPlayer?.team ? selectedPlayer.team._id : false}
			/>
		</main>
	);
}
