import Link from "next/link";
import { Button } from "@ui/components/button";
import { Skeleton } from "@ui/components/skeleton";

export default function MVPLadderSkeleton(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3>mvp ladder 🎖️</h3>
			<hr />
			<div className="my-4 flex flex-col gap-2">
				<Skeleton className="h-10 w-full bg-neutral-700" />
				<Skeleton className=" h-10 w-full bg-neutral-700" />
				<Skeleton className="h-10 w-full bg-neutral-700" />
			</div>

			<Link href="/mvp-ladder" className="w-full">
				<Button className="w-full">View MVP Ladder Page</Button>
			</Link>
		</section>
	);
}
