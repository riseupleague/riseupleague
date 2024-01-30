import Link from "next/link";
import { Button } from "@ui/components/button";

export default function MVPLadder(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3>mvp ladder 🎖️</h3>
			<hr />
			<Link href="/mvp-ladder" className="w-full">
				<Button variant="secondary" className="w-full">
					View MVP Ladder
				</Button>
			</Link>
		</section>
	);
}
