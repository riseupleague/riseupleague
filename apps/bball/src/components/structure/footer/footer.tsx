"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Footer(): React.JSX.Element {
	// for active class
	const path = usePathname();

	return (
		<footer className="container mx-auto flex flex-col justify-between pt-20 lg:flex-row lg:py-12">
			<div className="flex flex-col items-start justify-center gap-1 lg:items-center">
				<Link href="/" className="text-2xl font-bold">
					<Image
						src="/images/riseup-logo.png"
						alt="Logo"
						width={200}
						height={100}
						priority
					/>
				</Link>
				<p className="mt-5 text-xs text-[#a3a3a3]">
					&#169; Copyright 2023 Rise Up. All rights reserved.
				</p>
			</div>
			<div></div>
		</footer>
	);
}
