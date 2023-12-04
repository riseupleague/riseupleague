import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getTeamById } from "@/api-helpers/controllers/teams-controller";
import ChooseSchedule from "@/components/register/choose-schedule/ChooseSchedule";

export const metadata: Metadata = {
	title: "Rise Up League | Choose Your Schedule",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Jersey({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	const resTeam = await getTeamById(params.id);
	const { team } = await resTeam.json();

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="mb-10">Choose Your Schedule</h1>
			<ChooseSchedule team={team} user={user} />
		</section>
	);
}
