"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomeRegister = (): JSX.Element => {
	const { data: session } = useSession();

	return (
		// <section className="font-barlow mb-8 mt-16 flex flex-col items-center justify-center text-center text-neutral-50">
		// 	<h2 className="my-8">Ready to elevate your basketball experience?</h2>
		// 	<div className="w-full px-2">
		// 		{!session || !session.user ? (
		// 			<Button className="w-full" asChild>
		// 				<Link href="/login">Register Now For Fall Season</Link>
		// 			</Button>
		// 		) : (
		// 			<Link href="/register?info=true" className="w-full">
		// 				<Button className="w-full">Register Now For Fall Season</Button>
		// 			</Link>
		// 		)}
		// 	</div>
		// </section>
		<div className="relative h-[500px] lg:h-[750px] xl:h-[1000px] ">
			<div className="absolute inset-0">
				<Image
					src="/images/tournament/tournament-of-power-banner.jpg"
					alt="create a team image"
					className="h-full w-full object-cover object-center"
					fill
				/>
				<div className="absolute inset-0 bg-black opacity-75"></div>
			</div>
			<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
				<h2 className="mb-4 flex flex-col gap-3 text-xl font-bold leading-tight lg:gap-5 lg:text-5xl">
					<p className="text-xl lg:text-5xl">READY TO ELEVATE</p>
					<p className="text-xl lg:text-5xl">YOUR BASKETBALL EXPERIENCE?</p>
					<p className="text-xl lg:text-5xl">FALL REGISTRATION NOW OPEN</p>
				</h2>

				{!session || !session.user ? (
					<Button
						className="bg-primary mt-5 text-white"
						variant="default"
						asChild
					>
						<Link href={"/login"}>Register Now</Link>
					</Button>
				) : (
					<Button
						className="bg-primary mt-5 text-white"
						variant="default"
						asChild
					>
						<Link href="/register">Register Now</Link>
					</Button>
				)}
			</div>
		</div>
	);
};

export default HomeRegister;
