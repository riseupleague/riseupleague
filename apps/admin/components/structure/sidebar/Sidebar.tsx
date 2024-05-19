"use client";
import SidebarContent from "./SidebarContent";

import { useSession } from "next-auth/react";

const Sidebar = ({ activeSeason }): JSX.Element => {
	// const session = await getServerSession();
	const { data: session } = useSession();
	const sidebarLinks = [
		{
			title: "dashboard",
			href: "/",
			id: "dashboard",
		},
		{
			title: "league management",
			href: `${activeSeason ? "/league-management/" + activeSeason._id : "/league-management"}`,
			id: "league-management",
		},

		{
			title: "league schedule",
			href: `${activeSeason ? "/league-schedule/" + activeSeason._id : "/league-schedule"}`,
			id: "league-schedule",
		},
		{
			title: "website management",
			href: "/website-management",
			id: "website-management",
		},
		{
			title: "customer management",
			href: "/customer-management",
			id: "dashboard",
		},
		{
			title: "settings",
			href: "/settings",
			id: "settings",
		},
	];

	if (session)
		return (
			<aside className="static left-0 z-10 hidden h-full border-r border-neutral-500 bg-neutral-900 px-8 sm:fixed sm:block">
				<SidebarContent sidebarLinks={sidebarLinks} />
			</aside>
		);
};

export default Sidebar;
