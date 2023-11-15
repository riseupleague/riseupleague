import { Button } from "@ui/components/button";
import Link from "next/link";

export default function AboutRiseUp(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">about rise up</h2>
			<hr className="-mx-2 border-neutral-600" />
			<p className="py-4 text-neutral-200">
				Rise Up is a basketball league that welcomes players of all levels. Our
				focus on teamwork, sportsmanship, and community brings people together
				to celebrate their love of the game. Whether you&apos;re a seasoned pro
				or new to the sport, Rise Up has something for everyone. Join us today
				and experience the excitement of Rise Up basketball!
			</p>
			<div>
				<Link href="/">
					<Button>Learn More</Button>
				</Link>
			</div>
		</section>
	);
}
