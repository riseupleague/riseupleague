import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import FreeAgentsPlayerType from "@/components/register/free-agent/FreeAgentsPlayerType";

const FreeAgents = async ({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();
	const redirectUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}register/free-agent/${params.id}`;

	const session = await getServerSession();
	if (!session) {
		redirect(`/login?redirectUrl=${redirectUrl}`);
	}
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect(`/login?redirectUrl=${redirectUrl}`);
	}
	const resDivisions = await getAllRegisterDivisions();
	const { divisions } = await resDivisions.json();
	const selectedDivision = divisions.find((div) => div.city === params.id);

	if (!selectedDivision) redirect("/");
	const divisionPricePurposes = selectedDivision.divisions[0];

	return (
		<main className="font-barlow container  mx-auto my-10 min-h-fit text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				Season 5
			</p>
			<h1 className="font-abolition mb-10 mt-0 text-7xl font-normal">
				Join as a Free Agent
			</h1>
			<h3 className="text-center">
				City: {params.id} <span className="text-sm">(Not final!)</span>
			</h3>
			<FreeAgentsPlayerType
				city={params.id}
				divisionPricePurposes={divisionPricePurposes}
			/>
		</main>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Join as a Free Agent",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default FreeAgents;
