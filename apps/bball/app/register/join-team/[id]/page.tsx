import { connectToDatabase } from "@/api-helpers/utils";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import ChooseTeam from "@/components/register/join-team/ChooseTeam";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Join a Team",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and have Rise Up to the challenge!",
};

export default async function JoinTeam({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}
	const resDivision = await getRegisterDivisionById(params.id);
	const { division } = await resDivision.json();

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join a team
			</h1>

			<ChooseTeam division={division} session={session} />
		</main>
	);
}
