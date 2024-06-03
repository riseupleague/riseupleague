import { Button } from "@ui/components/button";
import Link from "next/link";

const HomeContactUs = (): JSX.Element => {
	return (
		<section className="font-barlow container mx-auto flex flex-col rounded bg-neutral-600 px-5 py-12 text-center">
			<h3 className="mb-4 text-2xl uppercase">
				don&apos;t see the answers you need?
			</h3>
			<p className="mb-8">
				That&apos;s ok. Send a message to one of our location specific IG
				accounts and we will get back to you as soon as we can.
			</p>

			<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
				{instagrams.map((ig, index) => (
					<Button
						key={index}
						variant="ghost"
						className="w-full border border-neutral-100 uppercase transition hover:opacity-80"
						asChild
					>
						<Link href={ig.url} target="_blank">
							@{ig.name}
						</Link>
					</Button>
				))}
			</div>

			<p className="my-4">
				For any general league inquiries, please message our main Instagram
				account:
			</p>

			<Button
				variant="ghost"
				className="mx-auto w-fit border border-neutral-100 uppercase transition hover:opacity-80"
				asChild
			>
				<Link href="https://instagram.com/riseup.bball" target="_blank">
					@riseup.bball
				</Link>
			</Button>
		</section>
	);
};

const instagrams = [
	{
		name: "riseup.brampton",
		url: "https://instagram.com/riseup.brampton",
	},
	{
		name: "riseup.vaughan",
		url: "https://instagram.com/riseup.vaughan",
	},
	{
		name: "riseup.markham",
		url: "https://instagram.com/riseup.markham",
	},
	{
		name: "riseup.niagara",
		url: "https://instagram.com/riseup.niagara",
	},
];

export default HomeContactUs;
