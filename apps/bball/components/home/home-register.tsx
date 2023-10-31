import { Button } from "@ui/components/button";
import Link from "next/link";

export default function HomeRegister() {
	return (
		<section className="font-barlow my-8 flex flex-col items-center justify-center text-center text-neutral-50">
			<h3 className="mb-4 max-w-[240px] text-[31px] font-medium uppercase leading-snug">
				Ready to elevate your basketball experience?
			</h3>
			<p className="mb-8 w-11/12">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu vestibulum
				commodo non nunc tristique. Quis ullamcorper cursus congue pharetra at.
				Leo lobortis duis nisi quis. Sit fames diam nisi.
			</p>
			<div className="w-full px-2">
				<Link href="/register">
					<Button className="w-full">Register Now</Button>
				</Link>
			</div>
		</section>
	);
}
