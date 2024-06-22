import { connectToDatabase } from "@/api-helpers/utils";
import { getCurrentWorker } from "@/api-helpers/controllers/workers-controller";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Page(): Promise<JSX.Element> {
	try {
		// Connect to the database
		await connectToDatabase();

		// Retrieve the session
		const session = await getServerSession();

		// Check if the user is authenticated
		if (!session || !session.user || !session.user.email) {
			redirect("/login");
		}

		// Retrieve current worker
		const resWorker = await getCurrentWorker(session.user.email);
		const { worker } = await resWorker.json();

		// Check if worker exists and has the necessary permissions
		if (!worker || worker.type !== "owner") {
			redirect("/");
		}

		// Render the page
		return (
			<section>
				<h1>Settings</h1>
				<div>
					<h2 className="text-2xl">List of workers</h2>
					<div></div>
				</div>
			</section>
		);
	} catch (error) {
		// Handle any errors gracefully
		console.error("An error occurred:", error);
		// You might want to redirect to an error page or display an error message
		throw error;
	}
}
