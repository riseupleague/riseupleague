import { Button } from "@ui/components/button";
import { LoginButton } from "@/components/auth/LoginButton";
import { currentWorker } from "@/utils/currentWorker";

export default async function Page(): Promise<JSX.Element> {
	const user = await currentWorker();

	console.log("user homepage: ", user);
	return (
		<main className="mt-52 flex h-full flex-col items-center justify-center">
			<div className="space-y-6 text-center">
				<h1>Welcome to Rise Up Admin</h1>
				<LoginButton>
					<Button variant="secondary" size="lg">
						Sign in
					</Button>
				</LoginButton>
			</div>
		</main>
	);
}
