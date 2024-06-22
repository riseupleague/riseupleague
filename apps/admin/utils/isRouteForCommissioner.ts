import { getWorkerType } from "./getWorkerType";
import { redirect } from "next/navigation";

export const isRouteForCommissioner = async () => {
	const workerType = await getWorkerType();

	console.log("workerType:", workerType);
	if (workerType !== "commissioner" && workerType !== "owner") {
		redirect(`/error-page`);
	}

	return null; // This line is important to prevent rendering anything on the page
};
