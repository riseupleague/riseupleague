"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HomeRegister = (): JSX.Element => {
	const { data: session } = useSession();

	return (
		<section className="font-barlow mb-8 mt-16 flex flex-col items-center justify-center text-center text-neutral-50">
			<h2 className="my-8">Ready to elevate your basketball experience?</h2>
			<div className="w-full px-2">
				{!session || !session.user ? (
					<Button className="w-full" asChild>
						<Link href="/login">Register Now For Fall Season</Link>
					</Button>
				) : (
					<Link href="/register?info=true" className="w-full">
						<Button className="w-full">Register Now For Fall Season</Button>
					</Link>
				)}
			</div>
		</section>
	);
};

export default HomeRegister;
