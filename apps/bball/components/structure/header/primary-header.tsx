"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { useRouter } from "next/navigation";
import ProfileLink from "@/components/auth/ProfileLink";
import { useSession, signOut, signIn } from "next-auth/react";
import HomeIcon from "@/components/icons/HomeIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PodiumIcon from "@/components/icons/PodiumIcon";
import TeamIcon from "@/components/icons/TeamIcon";
import PlayerIcon from "@/components/icons/PlayerIcon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import QuestionIcon from "@/components/icons/QuestionIcon";
import ChevronRight from "@/components/general/icons/ChevronRight";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SignInDialog from "@/components/auth/SignInDialog";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@ui/components/sheet";
import SideNav from "./SideNav";

export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();
	const router = useRouter();
	const currentDate = new Date();
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	// Convert the date to seconds
	const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);
	const headerOptions = [
		{
			label: "home",
			href: "/",
			icon: <HomeIcon />,
		},
		{
			label: "schedule",
			href: `/schedule/${currentDateInSeconds}`,
			icon: <CalendarIcon />,
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
			icon: <PodiumIcon />,
		},
		// {
		// 	label: "leaders",
		// 	href: "/leaders",
		// 	icon: <TrophyIcon />,
		// },
		{
			label: "teams",
			href: "/teams",
			icon: <TeamIcon />,
		},
		{
			label: "players",
			href: "/players",
			icon: <PlayerIcon />,
		},
	];

	return (
		<nav>
			<div className="container mx-auto grid grid-cols-3 py-4 lg:py-8">
				<div className="flex items-center justify-start lg:hidden">
					<SideNav navPosition="left" />
				</div>
				<div className="flex items-center justify-center lg:justify-start">
					<figure className="flex justify-center">
						<Link
							href="/"
							className="hidden transition hover:opacity-80 lg:inline-block"
						>
							<Image
								alt="Rise Up Logo"
								src="/images/riseup-logo.png"
								width={200}
								height={100}
								priority
							/>
						</Link>
						<Link href="/" className="transition hover:opacity-80 lg:hidden">
							<Image
								alt="Rise Up Logo"
								src="/images/logo.png"
								width={75}
								height={75}
								priority
							/>
						</Link>
					</figure>
				</div>
				<div className="hidden items-center gap-7 lg:flex lg:justify-center">
					{headerOptions.map((option, index) => {
						let isActive;

						// if homepage, make active class exact
						if (option.label === "home") {
							isActive = path === option.href;
						}
						// schedule
						else if (option.label === "schedule") {
							isActive = path.includes("/schedule");
						}
						// else just .includes()
						else {
							isActive = path.includes(option.href);
						}

						return option.label !== "home" ? (
							<Link
								href={option.href}
								className={`font-oswald hover:text-primary cursor-pointer p-2 font-medium uppercase transition hover:scale-110 ${
									isActive && "text-primary underline"
								}`}
								key={index}
							>
								{option.label}
							</Link>
						) : null;
					})}
				</div>
				<div className="flex items-center justify-end">
					<ProfileLink />
				</div>
			</div>

			{/* mobile bottom nav */}
			<ul className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border border-neutral-600 bg-neutral-700 px-[15px] pb-[25px] pt-[15px] backdrop-blur-md md:hidden">
				{headerOptions.map((option, index) => {
					let isActive;

					// if homepage, make active class exact
					if (option.label === "home") {
						isActive = path === option.href;

						// else just .includes()
					} else {
						isActive = path.includes(option.href);
					}

					return option.label !== "teams" && option.label !== "players" ? (
						<li
							className="flex flex-col items-center justify-center"
							key={index}
						>
							<Link
								href={option.href}
								className={`flex flex-col items-center justify-center"${
									isActive && "text-primary"
								}`}
							>
								{option.icon}
								<span className="font-barlow text-base capitalize tracking-tighter">
									{option.label}
								</span>
							</Link>
						</li>
					) : null;
				})}

				<SideNav navPosition={"bottom"} />
			</ul>
		</nav>
	);
}
