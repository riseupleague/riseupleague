"use client";
import SidebarContent from "./SidebarContent";

import { useSession } from "next-auth/react";

const Sidebar = (): JSX.Element => {
	const { data: session } = useSession();

	console.log("session:", session);
	const sidebarLinks = [
		{
			title: "dashboard",
			href: "/",
		},
		{
			title: "league management",
			href: "/league-management",
		},
		// {
		// 	title: "seasons management",
		// 	href: "/seasons-management",
		// },
		// {
		// 	title: "team management",
		// 	href: "/team-management",
		// },
		// {
		// 	title: "player management",
		// 	href: "/player-management",
		// },
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

	if (session)
		return (
			<aside className="static left-0 z-10 hidden h-full border-r border-neutral-500 bg-neutral-900 px-8 sm:fixed sm:block">
				<SidebarContent sidebarLinks={sidebarLinks} />
			</aside>
		);
};

export default Sidebar;
