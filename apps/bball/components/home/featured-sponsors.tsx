import Link from "next/link";
import Placeholder from "../placeholder";
import { Button } from "@ui/components/button";

export default function FeaturedSponsors(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">featured sponsors</h2>
			<hr className="border-neutral-600 -mx-2" />
			<p className="py-2 text-neutral-200">
				Lorem ipsum dolor sit amet consectetur. Dis ut iaculis ornare tellus. In
				molestie tincidunt purus in.
			</p>
			<div className="flex justify-between py-4">
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</div>
			<div>
				<Link href="/">
					<Button>View More</Button>
				</Link>
			</div>
		</section>
	);
}
