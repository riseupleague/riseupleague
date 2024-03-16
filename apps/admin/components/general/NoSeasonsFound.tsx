import CreateSeason from "../seasons-management/CreateSeason";

const NoSeasonsFound = (): JSX.Element => {
	return (
		<section className="flex h-dvh flex-col justify-center gap-6 text-center align-middle">
			<h1>No seasons found!</h1>
			<div className="mx-auto max-w-sm">
				<CreateSeason />
			</div>
		</section>
	);
};

export default NoSeasonsFound;
