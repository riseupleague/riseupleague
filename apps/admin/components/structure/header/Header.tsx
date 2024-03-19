"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@ui/components/button";
import { useState } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
} from "@ui/components/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = (): JSX.Element => {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-20 border-b border-neutral-500 bg-neutral-900 py-4">
			<RxHamburgerMenu
				onClick={() => setOpen(!open)}
				className="ml-3 size-8 md:hidden"
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
						<SheetDescription className="flex flex-col items-start gap-3 text-left">
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
		</header>
	);
};

const sidebarLinks = [
	{
		title: "dashboard",
		href: "/",
	},
	{
		title: "seasons management",
		href: "/seasons-management",
	},
	{
		title: "team management",
		href: "/team-management",
	},
	{
		title: "league schedule",
		href: "/league-schedule",
	},
	{
		title: "games management",
		href: "/games-management",
	},
	{
		title: "website management",
		href: "/website-management",
	},
	{
		title: "customer management",
		href: "/customer-management",
	},
];

export default Header;
