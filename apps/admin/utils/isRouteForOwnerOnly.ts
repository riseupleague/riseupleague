import { getWorkerType } from "./getWorkerType";
import { redirect } from "next/navigation";

export const isRouteForOwnerOnly = async () => {
	const workerType = await getWorkerType();
	if (workerType !== "owner") {
		redirect(`/error-page`);
		return null; // This line is important to prevent rendering anything on the page
	}

	return null; // This line is important to prevent rendering anything on the page
};
