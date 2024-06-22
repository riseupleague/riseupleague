import { getServerSession } from "next-auth";

export const currentWorker = async () => {
	const session = await getServerSession();

	return session?.user;
};
