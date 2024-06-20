"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

import { usePathname } from "next/navigation";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
} from "@ui/components/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@ui/components/button";

const MobileNav = ({ session, activeSeason }) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const sidebarLinks = [
		{
			title: "dashboard",
			href: "/",
		},
		{
			title: "league management",
			href: "/league-management",
		},

		{
			title: "league schedule",
			href: "/league-schedule",
		},

		{
			title: "website management",
			href: "/website-management",
		},
		{
			title: "customer management",
			href: "/customer-management",
		},
		{
			title: "settings",
			href: "/settings",
		},
	];

	return (
		<section className="block md:hidden">
			<RxHamburgerMenu
				onClick={() => setOpen(!open)}
				className="size-8 md:hidden"
			/>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent
					side="left"
					className="flex flex-col justify-between border-r border-neutral-600 bg-neutral-900 p-4"
				>
					<div>
						<SheetHeader className="my-4 text-3xl font-medium">
							Rise Up Admin
						</SheetHeader>
						<SheetDescription className="flex flex-col items-start gap-6 text-left">
							{sidebarLinks.map((link, index) => {
								let isActive;

								// if homepage, make active class exact
								if (link.title === "dashboard")
									isActive = pathname === link.href;
								else isActive = pathname.includes(link.href);

								return (
									<SheetClose key={index} asChild>
										<Link
											href={link.href}
											className={`${isActive && "text-primary font-medium"} hover:text-primary text-xl capitalize transition-all`}
										>
											{link.title}
										</Link>
									</SheetClose>
								);
							})}
						</SheetDescription>
					</div>

					<SheetFooter>
						{session && <Button onClick={() => signOut()}>Sign Out</Button>}
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNav;
