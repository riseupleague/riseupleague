// async function getData() {
// 	const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 	const res = await fetch(`${baseURL}/api/test`);
// 	if (!res.ok) throw new Error("Cannot fetch standings data");

// 	return res.json();
// }

// export default async function Standings(): Promise<JSX.Element> {
export default function Standings(): JSX.Element {
	// const { data } = await getData();
	// console.log(data);

	return (
		<section className="container mx-auto flex min-h-screen items-center justify-center">
			<h1 className="font-oswald text-3xl font-medium uppercase">
				standings page
			</h1>
		</section>
	);
}
