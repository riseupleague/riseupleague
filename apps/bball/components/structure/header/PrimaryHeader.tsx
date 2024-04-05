"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileLink from "@/components/auth/ProfileLink";
import SideNav from "./SideNav";
import MiddleNav from "./MiddleNav";
import MobileBottomNav from "./MobileBottomNav";
import { CiCalendar } from "react-icons/ci";
import { IoHomeOutline, IoPodiumOutline } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { RiTeamLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

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
		icon: <IoHomeOutline className="size-7 text-neutral-300" />,
	},
	{
		label: "schedule",
		href: `/schedule`,
		icon: <CiCalendar className="size-7 text-neutral-300" />,
	},
	{
		label: "standings",
		href: "/standings",
		icon: <IoPodiumOutline className="size-7 text-neutral-300" />,
	},
	{
		label: "teams",
		href: "/teams",
		icon: <RiTeamLine className="size-7 text-neutral-300" />,
	},
	{
		label: "leaders",
		href: "/leaders/stats",
		icon: <HiOutlineTrophy className="size-7 text-neutral-300" />,
		submenu: [
			{
				label: "Stats",
				href: "/leaders/stats",
			},
			{
				label: "MVP Ladder",
				href: "/leaders/mvp-ladder",
			},
		],
	},
	{
		label: "league",
		icon: <CgProfile className="size-6 text-neutral-300" />,
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
