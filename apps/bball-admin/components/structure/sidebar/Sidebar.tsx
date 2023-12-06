import SidebarContent from "./SidebarContent";

export default function Sidebar(): JSX.Element {
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

	return (
		<aside className="static left-0 z-10 hidden h-full border-r border-neutral-500 bg-neutral-900 px-8 sm:fixed sm:block">
			<SidebarContent sidebarLinks={sidebarLinks} />
		</aside>
	);
}
