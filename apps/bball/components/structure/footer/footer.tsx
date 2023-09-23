"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import footerOptions from "@/lib/data/footerOptions.json";

export default function Footer(): React.JSX.Element {
	// for active class
	const path = usePathname();

	return (
		<footer className="container mx-auto flex flex-col gap-8 px-4 py-8">
			{/* logo & copyright */}
			<section>
				<Link
					href="/"
					className="text-2xl font-bold transition hover:opacity-80"
				>
					<Image
						alt="Logo"
						height={100}
						priority
						src="/images/riseup-logo.png"
						width={200}
					/>
				</Link>
				<p className="font-barlow my-7 text-sm capitalize text-neutral-200">
					Copyright© 2023. Rise Up Sports League. All Rights Reserved.
				</p>
			</section>

			{/* links */}
			<section className="grid grid-cols-2 gap-y-9">
				{footerOptions.map((option, index) => (
					<div key={index}>
						<h4 className="text-primary font-barlow mb-8 font-medium uppercase">
							{option.section}
						</h4>
						<div className="flex flex-col gap-x-9 gap-y-4">
							{option.links.map((link, index) => {
								const isActive = path === link.href;

								return (
									<Link
										href={link.href}
										key={index}
										className={`font-barlow w-fit text-sm font-light capitalize text-neutral-200 transition hover:opacity-80 ${
											isActive && "text-primary pointer-events-none underline"
										}`}
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</section>

			{/* newsletter */}
			<section className="font-barlow flex flex-col items-center text-center">
				<div className="font-barlow flex max-w-[300px] flex-col items-center gap-5 text-center">
					<h3 className="text-primary text-xl uppercase">
						subscribe to our newsletter
					</h3>
					<p className="text-sm text-neutral-200">
						Be the first to find out about the latest promotions of Rise Up and
						its community.
					</p>
				</div>
			</section>
		</footer>
	);
}
