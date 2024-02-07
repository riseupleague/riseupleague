"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import footerOptions from "@/lib/data/footerOptions.json";
import packageJson from "../../../package.json";

export default function Footer(): React.JSX.Element {
	// for active class
	const path = usePathname();
	const versionNumber = packageJson.version;

	const year = new Date().getFullYear();

	return (
		<footer className="container mx-auto mb-40 flex flex-col gap-8 px-4 py-8 md:mb-0">
			<hr />

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

								if (link.label === "career" || link.label === "about us")
									return;

								return (
									<Link
										href={link.href}
										key={index}
										className={`font-barlow w-fit text-sm font-light capitalize text-neutral-200 transition hover:opacity-80 md:text-lg ${
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

			{/* logo & copyright */}
			<section className="flex flex-col items-center text-center">
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
				<div className="font-barlow my-7 text-sm text-neutral-200">
					<p className="text-sm">
						Copyright© {year}. Rise Up Sports League. All Rights Reserved.
					</p>
					<Link
						href="https://github.com/n9d0g/riseupleague/releases"
						target="_blank"
						className="hover:text-primary transition-all hover:underline"
					>
						v{versionNumber}
					</Link>
				</div>
			</section>

			{/* newsletter */}
			{/* <section className="font-barlow flex flex-col items-center text-center">
				<div className="font-barlow flex max-w-[300px] flex-col items-center gap-5 text-center">
					<h3 className="text-primary text-xl uppercase">
						subscribe to our newsletter
					</h3>
					<p className="text-sm text-neutral-200">
						Be the first to find out about the latest promotions of Rise Up and
						its community.
					</p>
				</div>
			</section> */}
		</footer>
	);
}
