import LoginForm from "@/components/auth/LoginForm";
import { connectToDatabase } from "@/api-helpers/utils";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getWorkerType } from "@/utils/getWorkerType";
import { isLoggedIn } from "@/utils/isLoggedIn";

export default async function Login(): Promise<JSX.Element> {
	await connectToDatabase();
	const loggedIn = await isLoggedIn();

	return <LoginForm />;
}
