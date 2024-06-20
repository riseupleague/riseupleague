import { auth } from "@/auth";

export const currentWorker = async () => {
	const session = await auth();

	return session?.user;
};
