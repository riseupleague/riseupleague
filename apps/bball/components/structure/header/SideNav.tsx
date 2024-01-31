"use client";

import MenuIcon from "@/components/icons/MenuIcon";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import ChevronRight from "@/components/general/icons/ChevronRight";
import HomeIcon from "@/components/icons/HomeIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import PodiumIcon from "@/components/icons/PodiumIcon";
import TeamIcon from "@/components/icons/TeamIcon";
import PlayerIcon from "@/components/icons/PlayerIcon";
import { usePathname } from "next/navigation";
import SignInDialog from "@/components/auth/SignInDialog";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@ui/components/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import TrophyIcon from "@/components/icons/TrophyIcon";

export default function SideNav({ navPosition }): React.JSX.Element {
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
		{
			label: "MVP Ladder",
			href: "/mvp-ladder",
			icon: <TrophyIcon />,
		},
	];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="flex flex-col items-center justify-center">
					<MenuIcon />
					{navPosition === "bottom" && "More"}
				</button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex flex-col border-neutral-600 bg-neutral-800"
			>
				<div className="flex-1">
					<div className="mt-[47px] flex uppercase">
						<h3 className="px-4 py-[18px] font-medium">menu</h3>
					</div>
					<Separator className="bg-neutral-600" />
					<ul className="flex flex-col">
						{/* if user logged in, show name and email */}
						{status === "authenticated" && (
							<li className="flex items-center">
								<SheetClose asChild>
									<Button
										className="flex w-full items-center gap-2 px-4 py-[11px]"
										variant="navlink"
										size="navlink"
										onClick={() => router.push("/user")}
									>
										<div className="flex flex-1 gap-2">
											<Avatar>
												<AvatarImage src={`${session.user.image}`} />
												<AvatarFallback className="bg-neutral-400 uppercase">
													{session?.user?.name[0]}
												</AvatarFallback>
											</Avatar>
											<div className="font-barlow flex flex-col items-start">
												<h5 className="m-0 text-base font-medium">
													{session.user.name}
												</h5>
												<h6 className="m-0 text-sm font-light lowercase">
													{session.user.email}
												</h6>
											</div>
										</div>
										<ChevronRight />
									</Button>
								</SheetClose>
							</li>
						)}
						{headerOptions.map((option, index) => {
							let isActive;

							// if homepage, make active class exact
							if (option.label === "home") {
								isActive = path === option.href;
							} else if (option.label === "schedule") {
								isActive = path.includes("/schedule");
							} else {
								isActive = path.includes(option.href);
							}

							return (
								<li className={`${isActive && "bg-neutral-600"}`} key={index}>
									<SheetClose asChild>
										<Button
											className="flex px-4 py-[11px]"
											variant="navlink"
											size="navlink"
											onClick={() => router.push(option.href)}
										>
											<div className="flex flex-1 gap-2">
												<span>{option.icon}</span>
												<span className="font-barlow text-lg font-medium uppercase">
													{option.label}
												</span>
											</div>
											<ChevronRight />
										</Button>
									</SheetClose>
								</li>
							);
						})}

						<Separator className="mb-4 bg-neutral-600" />
						{/* <li className="flex items-center gap-3 px-6 py-2">
										<QuestionIcon />
										<span className="font-barlow text-[24px] uppercase tracking-tighter">
											League
										</span>
									</li> */}
					</ul>
				</div>
				<div className="mx-4 mb-[38px]">
					{status === "authenticated" ? (
						<Button
							className="w-full bg-neutral-500 text-base font-medium uppercase text-neutral-50"
							onClick={() => signOut()}
						>
							Log out
						</Button>
					) : (
						<Button
							className="w-full bg-neutral-500 text-base font-medium uppercase text-neutral-50"
							onClick={() => setOpen(true)}
						>
							Log in
						</Button>
					)}
					<SignInDialog open={open} onOpenChange={setOpen} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
