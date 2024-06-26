import { Button } from "@ui/components/button";
import { LoginButton } from "@/components/auth/LoginButton";
import { currentWorker } from "@/utils/currentWorker";
import { connectToDatabase } from "@/api-helpers/utils";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	const user = await currentWorker();

	return (
		<main className="mt-52 flex h-full flex-col items-center justify-center">
			<div className="space-y-6 text-center">
				<h1>Welcome to Rise Up Admin</h1>
				<LoginButton user={user}>
					<Button variant="secondary" size="lg">
						Sign in
					</Button>
				</LoginButton>
			</div>
		</main>
	);
}
