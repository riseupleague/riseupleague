import { redirect } from "next/navigation";

export default async function Schedule(): Promise<JSX.Element> {
	// Get the current date and time
	const currentDate = new Date();

	// Convert the date to seconds
	const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);

	console.log(currentDateInSeconds);

	redirect(`/schedule/${currentDateInSeconds}`);

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
				Welcome to rise up basketball
			</h1>
		</main>
	);
}
