import { useSession } from "next-auth/react";

export const useCurrentWorker = () => {
	const session = useSession();
	return session.data?.user;
};
