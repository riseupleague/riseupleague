"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const HomeRegister = (): JSX.Element => {
	const { data: session } = useSession();

	// useEffect(() => {
	// 	if (navigator.userAgent.includes("Instagram"))
	// 		redirect("/instagram-redirect");
	// }, []);

	return (
		<section className="relative mb-16 flex h-[500px] max-h-[100dvh-300px] flex-col items-center justify-center text-center lg:mb-24 lg:h-[750px] xl:h-[1000px]">
			<Image
				src="/images/tournament/tournament-of-power-banner.jpg"
				alt="Hero Image"
				className="absolute -z-10 object-cover object-center opacity-20"
				fill
			/>

			<h1 className="text-4xl lg:text-[84px] lg:leading-[100px]">
				Join Rise Up <br className="hidden md:block" /> League Now
			</h1>
			<p className="mb-8 text-lg">
				Ready to elevate your basketball experience?
			</p>

			{!session || !session.user ? (
				<Button variant="register2" size="register2" asChild>
					<Link href={"/login"}>Register Now</Link>
				</Button>
			) : (
				<Button variant="register2" size="register2" asChild>
					<Link href="/register">Register Now</Link>
				</Button>
			)}
		</section>
	);
};

export default HomeRegister;
