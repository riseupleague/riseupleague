"use client";

import Link from "next/link";
import { Button } from "@ui/components/button";

export default function SidebarContent({ sidebarLinks }): JSX.Element {
	return (
		<ul className="my-8 flex flex-col gap-4">
			{sidebarLinks.map((link, index) => (
				<Button asChild key={index}>
					<Link href={link.href}>{link.title}</Link>
				</Button>
			))}
		</ul>
	);
}
