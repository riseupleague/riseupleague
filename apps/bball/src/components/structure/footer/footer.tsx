"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { usePathname } from "next/navigation";

export default function Footer(): React.JSX.Element {
	// for active class
	// const path = usePathname();

	return (
		<footer className="container mx-auto flex flex-col items-center justify-center py-8">
			<Link href="/" className="text-2xl font-bold transition hover:opacity-80">
				<Image
					alt="Logo"
					height={100}
					priority
					src="/images/riseup-logo.png"
					width={200}
				/>
			</Link>
			<p className="mt-5 text-xs text-[#a3a3a3]">
				&#169; Copyright 2023 Rise Up. All rights reserved.
			</p>
		</footer>
	);
}
