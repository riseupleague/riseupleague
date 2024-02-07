import { Button } from "@ui/components/button";
import Link from "next/link";

const HomeContactUs = () => {
	return (
		<section className="font-barlow container mx-auto flex flex-col rounded bg-neutral-600 px-5 py-12 text-center">
			<h3 className="mb-4 text-2xl uppercase">
				don&apos;t see the answers you need?
			</h3>
			<p className="mb-8">
				That&apos;s ok. Send a message to our{" "}
				<Link
					href="https://instagram.com/riseup.web"
					target="_blank"
					className="underline transition-all hover:text-neutral-400"
				>
					@riseup.web
				</Link>{" "}
				IG account, and we will get back to you ASAP.
			</p>
			<div className="flex justify-center">
				<Button
					variant="ghost"
					className="w-fit border border-neutral-100 uppercase transition hover:opacity-80"
					asChild
				>
					<Link href="https://instagram.com/riseup.web" target="_blank">
						@riseup.web
					</Link>
				</Button>
			</div>
		</section>
	);
};

export default HomeContactUs;
