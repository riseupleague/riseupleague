import { Skeleton } from "@ui/components/skeleton";

const HomeLeadersSkeleton = (): JSX.Element => {
	const array3 = new Array(3).fill("");

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">league leaders</h3>
			<hr />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{array3.map((_, index) => (
					<Skeleton key={index} className="h-40 w-full bg-neutral-700" />
				))}
			</div>
		</section>
	);
};

export default HomeLeadersSkeleton;
