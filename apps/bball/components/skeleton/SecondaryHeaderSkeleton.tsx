import { Skeleton } from "@ui/components/skeleton";

const SecondaryHeaderSkeleton = (): JSX.Element => {
	const array10 = Array(10).fill("");

	return (
		<div className="flex h-[140px] w-full items-center overflow-x-auto overflow-y-hidden rounded-sm border-y border-neutral-600 xl:overflow-x-hidden">
			<div className="flex items-center space-x-4">
				{array10.map((_, index) => (
					<div className="space-y-3" key={index}>
						<Skeleton className="h-4 w-[100px] bg-neutral-700" />
						<Skeleton className="h-4 w-[120px] bg-neutral-700" />
						<Skeleton className="h-4 w-[150px] bg-neutral-700" />
						<Skeleton className="h-4 w-[250px] bg-neutral-700" />
					</div>
				))}
			</div>
		</div>
	);
};

export default SecondaryHeaderSkeleton;
