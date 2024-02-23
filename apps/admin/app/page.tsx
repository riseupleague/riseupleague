import { connectToDatabase } from "@/api-helpers/utils";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	return (
		<section>
			<h1>dashboard page</h1>
		</section>
	);
}
