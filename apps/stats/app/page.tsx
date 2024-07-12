import { connectToDatabase } from "@/api-helpers/utils";

const StatsApp = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	return (
		<section className="container mx-auto flex h-dvh items-center justify-center">
			<h1>Stats page</h1>
		</section>
	);
};

export default StatsApp;
