import PrimaryHeader from "./PrimaryHeader";
import TopHeader from "./TopHeader";
import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";

const Header = async (): Promise<JSX.Element> => {
	const session = await getServerSession();

	const resUser = await getCurrentUser(session?.user.email);
	const { user } = await resUser.json();

	return (
		<header className="sticky top-0 z-20 bg-neutral-900">
			<TopHeader />
			<PrimaryHeader />
			<PrimaryHeader user={user} />
		</header>
	);
};

export default Header;
