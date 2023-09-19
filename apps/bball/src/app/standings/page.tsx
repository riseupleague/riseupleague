import { connectToDatabase } from "@/src/api-helpers/utils";
import { getAllSeasons } from "@/src/api-helpers/controllers/seasons-controller";

export default async function Standings(): Promise<JSX.Element> {
	await connectToDatabase();
	const res = await getAllSeasons();
	const { seasons } = await res.json();

	const data = JSON.stringify(seasons);

	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-oswald my-8 text-3xl font-medium uppercase">
				standings page
			</h1>

			{/* show fetch data */}
			<pre>{data}</pre>
		</section>
	);
}
