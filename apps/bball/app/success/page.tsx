import { redirect } from "next/navigation";

export default async function Success(): Promise<JSX.Element> {
	redirect(`/`);

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1>Welcome to rise up basketball!</h1>
		</main>
	);
}
