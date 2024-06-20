import LoginForm from "@/components/auth/LoginForm";
import { connectToDatabase } from "@/api-helpers/utils";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Login(): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await auth();
	const resWorker = await getCurrentWorker(session?.user?.email);
	const { worker } = await resWorker.json();
	if (worker) redirect("/");
	return <LoginForm />;
}
