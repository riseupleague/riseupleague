import { auth } from "@/auth";

export const getWorkerType = async () => {
	const session = await auth();

	return session?.user?.type;
};
