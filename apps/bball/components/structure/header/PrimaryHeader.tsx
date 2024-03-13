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
import MiddleNav from "./MiddleNav";
import MobileBottomNav from "./MobileBottomNav";

const PrimaryHeader = ({ user }): JSX.Element => {
	const path = usePathname();

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

				<div className="hidden w-full justify-center lg:flex">
					<MiddleNav headerOptions={headerOptions} path={path} />
				</div>

				<div className="flex items-center justify-end">
					<ProfileLink user={user} />
				</div>
			</div>

			<MobileBottomNav headerOptions={headerOptions} path={path} />
		</nav>
	);
};

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
		icon: <PodiumIcon />,
	},
	{
		label: "teams",
		href: "/teams",
		icon: <TeamIcon />,
	},
	{
		label: "leaders",
		href: "/leaders",
		icon: <TrophyIcon />,
		submenu: [
			{
				label: "Stats",
				href: "/leaders",
			},
			{
				label: "MVP Ladder",
				href: "/leaders/mvp-ladder",
			},
		],
	},
	{
		label: "league",
		icon: <PlayerIcon />,
		submenu: [
			{
				label: "All Players",
				href: "/players",
			},
			{
				label: "League Rules",
				href: "/league-rules",
			},
			{
				label: "Terms and Conditions",
				href: "/terms-and-conditions",
			},
			{
				label: "Refund Policy",
				href: "/refund-policy",
			},
			{
				label: "FAQ",
				href: "/faq",
			},
			{
				label: "Contact Us",
				href: "/contact-us",
			},
		],
	},
];

export default PrimaryHeader;
