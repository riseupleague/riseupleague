import { Button } from "@ui/components/button";
import Link from "next/link";

export default function AboutRiseUp(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2>about rise up</h2>
			<hr />
			<p className="py-4">
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
