import { Button } from "@ui/components/button";
import Link from "next/link";

export default function AboutRiseUp(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">about rise up</h2>
			<hr className="-mx-2 border-neutral-600" />
			<p className="py-4 text-neutral-200">
				Lorem ipsum dolor sit amet consectetur. Dis ut iaculis ornare tellus. In
				molestie tincidunt purus in.
			</p>
			<div>
				<Link href="/">
					<Button>Learn More</Button>
				</Link>
			</div>
		</section>
	);
}
