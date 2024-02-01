import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/api-helpers/utils";
import UserProfile from "@/components/user/UserProfile";
import { Metadata } from "next";

export default async function User({
	searchParams,
	params,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	await connectToDatabase();

	const session = await getServerSession();
	if (!session || !session.user) redirect("/");

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	const userScheduleParams =
		typeof searchParams.userSchedule === "string"
			? searchParams.userSchedule
			: "";

	return (
		<section className="container mx-auto">
			<h1 className="mb-8 md:mb-40">{session.user.name}&apos;s Profile</h1>
			<UserProfile
				session={session}
				user={user}
				userSchedule={userScheduleParams}
			/>
		</section>
	);
}

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

// export async function generateMetadata() {
// 	const session = await getServerSession();
// 	if (!session || !session.user) redirect("/");

// 	return {
// 		title: `Rise Up League | ${session.user.name}'s Profile`,
// 		description:
// 			"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
// 	};
// }
