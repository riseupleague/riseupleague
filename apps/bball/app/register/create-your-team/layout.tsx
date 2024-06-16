import { connectToDatabase } from "@/api-helpers/utils";
import { getAllRegisterDivisions } from "@/api-helpers/controllers/divisions-controller";
import {
	getUserPlayerPayment,
	getCurrentUser,
	addNewUser,
} from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { upcomingSeasonName } from "@/utils/upcomingSeasonName";
import RegisterProgress from "@/components/register/create-your-team/RegisterProgress";
const RegisterLayout = async ({ children }: { children: React.ReactNode }) => {
	await connectToDatabase();

	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	if (!user) {
		await addNewUser(session.user.name, session.user.email, "google");

		redirect("/");
	}
	const resDivisions = await getAllRegisterDivisions();
	const { divisions } = await resDivisions.json();

	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();

	const seasonName = await upcomingSeasonName();

	const registerInfo = {
		step: 1,
		allowStep: { "1": true, "2": false, "3": false, "4": false, "5": false },
	};
	return (
		<main className="font-barlow container mx-auto my-10 min-h-fit text-white">
			<p className="font-barlow mb-0 mt-10 text-center text-xl uppercase md:text-3xl">
				{seasonName}
			</p>
			<h1 className="font-abolition mb-10 mt-0 text-7xl font-normal">
				Create a team
			</h1>
			<RegisterProgress registerInfo={registerInfo} />
			{/* <RegisterProgress
				registerInfo={registerInfo}
				setRegisterInfo={setRegisterInfo}
			/> */}
			<section>{children}</section>
		</main>
	);
};

export default RegisterLayout;
