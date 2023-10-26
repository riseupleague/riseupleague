import { Skeleton } from "@ui/components/skeleton";

export default function GamesLoading() {
	const array16 = Array(30).fill("");
	const array6 = Array(6).fill("");
	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-oswald mb-16 mt-8 text-center text-3xl font-medium uppercase">
				<Skeleton className="h-10 w-[150px] bg-neutral-700" />
			</h1>
			<div>
				<div className="mb-10 flex flex-col gap-5 md:flex-row">
					<Skeleton className="h-10 w-[120px] bg-neutral-700" />
				</div>
				{array16?.map((_, index) => {
					return (
						<div key={index}>
							<h3 className="font-barlow my-4 text-sm uppercase md:text-2xl">
								{/* game date */}
								<Skeleton className="h-10 w-3/4 bg-neutral-700 lg:w-1/4" />
							</h3>
							<hr className="my-4 border border-neutral-600" />
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								{array6?.map((_, index) => {
									return (
										<Skeleton
											key={index}
											className="flex h-48 flex-col rounded border border-neutral-600 bg-neutral-700"
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
