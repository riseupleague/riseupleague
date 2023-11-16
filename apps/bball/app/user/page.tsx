import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Success(): Promise<JSX.Element> {
	const session = await getServerSession();
	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();
	if (!session || !session.user) {
		redirect("/");
	}
	redirect(`/user/${user._id}`);

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
				Welcome to rise up basketball
			</h1>
		</main>
	);
}
