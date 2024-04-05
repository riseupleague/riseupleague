import LoginForm from "@/components/auth/LoginForm";
import { connectToDatabase } from "@/api-helpers/utils";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login(): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();
	console.log("session:", session);
	const resWorker = await getCurrentWorker(session?.user?.email);
	const { worker } = await resWorker.json();
	if (worker) redirect("/");
	return <LoginForm />;
}
