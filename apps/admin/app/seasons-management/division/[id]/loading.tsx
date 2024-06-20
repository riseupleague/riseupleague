import { Skeleton } from "@ui/components/skeleton";

const TeamManagementLoading = (): JSX.Element => {
	const array16 = Array(30).fill("");

	return (
		<section className="container mx-auto min-h-fit">
			<div>
				{/* search */}
				<div className="flex gap-4">
					<Skeleton className="h-10 w-3/4 rounded-lg bg-neutral-700 lg:w-1/4" />
				</div>

				{/* grid */}
				<div className="my-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
					{array16.map((_, index) => (
						<div className="flex gap-2" key={index}>
							<Skeleton className="h-10 w-full rounded-lg bg-neutral-700" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamManagementLoading;
