import { Skeleton } from "@ui/components/skeleton";

const PlayerLoading = (): JSX.Element => (
	<section className="container mx-auto min-h-fit">
		<div className="mb-8 mt-16">
			<Skeleton className="h-16 w-3/4 rounded-lg bg-neutral-700 lg:w-1/4" />
		</div>
		<div>
			{/* title */}
			<Skeleton className="h-10 w-3/4 rounded-lg bg-neutral-700 lg:w-1/4" />

			{/* grid */}
			<div className="my-8 grid  grid-cols-1 gap-x-8 gap-y-4">
				<div className="grid w-full gap-4 lg:grid-cols-2">
					<div className="">
						<Skeleton className="h-64 rounded-lg bg-neutral-700 " />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Skeleton className="h-30 rounded-lg bg-neutral-700 p-4" />
						<Skeleton className="h-30 rounded-lg bg-neutral-700 p-4" />
						<Skeleton className="h-30 rounded-lg bg-neutral-700 p-4" />
						<Skeleton className="h-30 rounded-lg bg-neutral-700 p-4" />
					</div>
				</div>
			</div>
		</div>
		{/* title */}
		<Skeleton className="h-10 w-3/4 rounded-lg bg-neutral-700 lg:w-1/4" />
		{/* grid */}
		<div className="my-8 grid  grid-cols-1 gap-x-8 gap-y-4">
			<div className="grid w-full gap-4  lg:grid-cols-2">
				<Skeleton className="h-80 rounded-lg bg-neutral-700 " />
				<Skeleton className="h-80 rounded-lg bg-neutral-700 " />
			</div>
		</div>
	</section>
);

export default PlayerLoading;
