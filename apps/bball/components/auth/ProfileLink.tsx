"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { LogOut } from "lucide-react";
import SignInDialog from "@/components/auth/SignInDialog";
import ProfileIcon from "../icons/ProfileIcon";
import PlayerIcon from "../icons/PlayerIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";

const ProfileLink = () => {
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	return (
		<div className="bg-transparent">
			{status === "authenticated" ? (
				<>
					<div className="flex items-center gap-10">
						<DropdownMenu>
							<DropdownMenuTrigger className="font-oswald flex items-center gap-2 transition-all hover:opacity-80">
								<span className="text-primary hidden text-lg lg:inline-block">
									Welcome back, {session?.user?.name}
								</span>
								<span>
									<ProfileIcon />
								</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 bg-neutral-900">
								<DropdownMenuLabel className="font-barlow text-lg font-medium uppercase">
									{session?.user?.name}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="cursor-pointer">
										<Link
											href="/user"
											className="flex items-center gap-2 transition-all hover:opacity-80"
										>
											<PlayerIcon />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />

								<DropdownMenuItem
									className="flex cursor-pointer items-center gap-2 transition-all hover:opacity-80"
									onClick={() => signOut()}
								>
									<LogOut className="stroke-neutral-400" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{/* <span className="font-barlow  font-semibold uppercase ">
							{session?.user?.name}
						</span> */}
					</div>
					{/* <Button variant="register" >
						Log Out
					</Button> */}
				</>
			) : (
				<>
					<Button onClick={openDialog} variant="register" size="sm">
						Log In
					</Button>
					<SignInDialog open={open} onOpenChange={setOpen} />
				</>
			)}
		</div>
	);
};
export default ProfileLink;
