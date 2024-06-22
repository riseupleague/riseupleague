import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const isLoggedIn = async () => {
	const session = await getServerSession(authOptions);
	if (session) return true;
};
