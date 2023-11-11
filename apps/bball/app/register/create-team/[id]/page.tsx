import { connectToDatabase } from "@/api-helpers/utils";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import CustomizeTeam from "@/components/register/create-team/CustomizeTeam";
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
	console.log(division);
	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-8xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Create a team
			</h1>

			<CustomizeTeam division={division} session={session} />
		</main>
	);
}
