"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileLink from "@/components/auth/ProfileLink";
import HomeIcon from "@/components/icons/HomeIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PodiumIcon from "@/components/icons/PodiumIcon";
import TeamIcon from "@/components/icons/TeamIcon";
import PlayerIcon from "@/components/icons/PlayerIcon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import SideNav from "./SideNav";

export default function PrimaryHeader(): React.JSX.Element {
	const path = usePathname();

	const headerOptions = [
		{
			label: "home",
			href: "/",
			icon: <HomeIcon />,
		},
		{
			label: "schedule",
			href: `/schedule`,
			icon: <CalendarIcon />,
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
			icon: <PodiumIcon />,
		},
		{
			label: "leaders",
			href: "/leaders",
			icon: <TrophyIcon />,
		},
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
			<ul className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-around border border-neutral-600 bg-neutral-700 px-[15px] pb-[25px] pt-[15px] backdrop-blur-md md:hidden">
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
								className={`${isActive && "text-primary"} flex flex-col items-center justify-center`}
							>
								{option.icon}
								<span className="font-barlow text-base capitalize tracking-tighter">
									{option.label}
								</span>
							</Link>
						</li>
					) : null;
				})}

				<SideNav navPosition="bottom" />
			</ul>
		</nav>
	);
}
