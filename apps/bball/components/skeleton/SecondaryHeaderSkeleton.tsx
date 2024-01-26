import { Skeleton } from "@ui/components/skeleton";

export default function SecondaryHeaderSkeleton() {
	const array3 = Array(3).fill("");

	return (
		<section className="flex h-[140px] items-center rounded-sm border-y border-neutral-600">
			<div className="flex items-center space-x-4">
				{array3.map((_, index) => (
					<div className="space-y-3" key={index}>
						<Skeleton className="h-4 w-[100px] bg-neutral-700" />
						<Skeleton className="h-4 w-[120px] bg-neutral-700" />
						<Skeleton className="h-4 w-[150px] bg-neutral-700" />
						<Skeleton className="h-4 w-[250px] bg-neutral-700" />
					</div>
				))}
			</div>
		</section>
	);
}
