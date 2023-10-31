import { Button } from "@ui/components/button";
import Link from "next/link";

export default function ContactUs() {
	return (
		<section className="font-barlow container mx-auto flex flex-col rounded bg-neutral-600 px-5 py-12 text-center">
			<h3 className="mb-4 text-2xl uppercase">
				don&apos;t see the answers you need?
			</h3>
			<p className="mb-8">
				That&apos;s ok. Just drop a message and we will get back to you ASAP.
			</p>
			<Link href="/contact-us">
				<Button
					variant="ghost"
					className="border border-neutral-100 uppercase transition hover:opacity-80"
				>
					Contact Us
				</Button>
			</Link>
		</section>
	);
}
