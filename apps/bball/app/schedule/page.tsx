import { redirect } from "next/navigation";

export default async function Schedule(): Promise<JSX.Element> {
	// Get the current date and time
	const currentDate = new Date();

	// Convert the date to seconds
	const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);

	redirect(`/schedule/${currentDateInSeconds}`);

	return (
		<main className="container mx-auto min-h-[100dvh]">
			<h1>Welcome to rise up basketball</h1>
		</main>
	);
}
