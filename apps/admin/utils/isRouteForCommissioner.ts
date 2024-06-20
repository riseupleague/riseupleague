import { getWorkerType } from "./getWorkerType";
import { redirect } from "next/navigation";

export const isRouteForCommissioner = async () => {
	const workerType = await getWorkerType();
	if (workerType !== "commissioner" && workerType !== "owner") {
		redirect(`/error-page`);
	}

	return null; // This line is important to prevent rendering anything on the page
};
