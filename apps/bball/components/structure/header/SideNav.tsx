"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { CiCalendar } from "react-icons/ci";
import { IoHomeOutline, IoPodiumOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";
import { FaMedal } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@ui/components/sheet";
import Link from "next/link";

const SideNav = ({ navPosition }): React.JSX.Element => {
	const path = usePathname();
	const router = useRouter();
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	const headerOptions = [
		{
			label: "home",
			href: "/",
			icon: <IoHomeOutline className="size-7 text-neutral-300" />,
		},
		{
			label: "schedule",
			href: "/schedule",
			icon: <CiCalendar className="size-7 text-neutral-300" />,
		},
		{
			label: "standings",
			href: "/standings",
			dropdown: true,
			icon: <IoPodiumOutline className="size-7 text-neutral-300" />,
		},
		{
			label: "leaders",
			href: "/leaders/stats",
			icon: <FaMedal className="size-7 text-neutral-300" />,
		},
		{
			label: "teams",
			href: "/teams",
			icon: <RiTeamLine className="size-7 text-neutral-300" />,
		},
		{
			label: "players",
			href: "/players",
			icon: <MdOutlinePerson className="size-7 text-neutral-300" />,
		},
		{
			label: "MVP Ladder",
			href: "/leaders/mvp-ladder",
			icon: <HiOutlineTrophy className="size-7 text-neutral-300" />,
		},
	];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="flex flex-col items-center justify-center">
					<IoIosMenu className="size-7 text-neutral-300" />
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
										variant="nav"
										size="nav"
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
										<FaChevronRight />
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
											variant="nav"
											size="nav"
											onClick={() => router.push(option.href)}
										>
											<div className="flex flex-1 gap-2">
												<span>{option.icon}</span>
												<span className="font-barlow text-lg font-medium uppercase">
													{option.label}
												</span>
											</div>
											<FaChevronRight />
										</Button>
									</SheetClose>
								</li>
							);
						})}

						<Separator className="mb-4 bg-neutral-600" />
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
						<div className="space-y-2">
							<SheetClose asChild>
								<Button variant="addition" className="w-full" asChild>
									<Link href="/login">Log in</Link>
								</Button>
							</SheetClose>
							<SheetClose asChild>
								<Button
									variant="secondary"
									className="w-full uppercase"
									asChild
								>
									<Link href="/signup">Sign Up</Link>
								</Button>
							</SheetClose>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SideNav;
