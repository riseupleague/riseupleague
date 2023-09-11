import Placeholder from "../placeholder";

export default function FeaturedSponsors(): JSX.Element {
	return (
		<section className="font-barlow container mx-auto mb-8 text-neutral-100">
			<h2 className="px-4 py-2.5 text-3xl uppercase">featured sponsors</h2>
			<hr className="text-neutral-600" />
			<p className="p-4 text-neutral-200">
				Lorem ipsum dolor sit amet consectetur. Dis ut iaculis ornare tellus. In
				molestie tincidunt purus in.
			</p>
			<div className="flex justify-between p-4">
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</div>
		</section>
	);
}
