export default function GameSummary({
	params,
}: {
	params: { id: string };
}): JSX.Element {
	return (
		<section className="container mx-auto flex min-h-[100dvh] items-center justify-center">
			<h1 className="font-oswald text-3xl font-medium uppercase">
				game summary id page: {params.id}
			</h1>
		</section>
	);
}
