import { getActiveSeason } from "@/api-helpers/controllers/seasons-controller";
import PrimaryHeader from "./PrimaryHeader";
import { getCurrentUser } from "@/api-helpers/controllers/users-controller";
import { getServerSession } from "next-auth";

const Header = async (): Promise<JSX.Element> => {
	const session = await getServerSession();

	const resUser = await getCurrentUser(session?.user.email);
	const { user } = await resUser.json();
	const resActiveSeason = await getActiveSeason();
	const { season } = await resActiveSeason.json();

	return (
		<header className="sticky top-0 z-20 bg-neutral-900">
			<PrimaryHeader user={user} season={season} />
		</header>
	);
};

export default Header;
