"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarContent({ sidebarLinks }): JSX.Element {
	const pathname = usePathname();

	return (
		<ul className="my-8 flex flex-col gap-4">
			{sidebarLinks.map((link, index) => {
				return (
					<Link
						key={index}
						href={link.href}
						className="hover:text-primary capitalize transition-all"
					>
						{link.title}
					</Link>
				);
			})}
		</ul>
	);
}
