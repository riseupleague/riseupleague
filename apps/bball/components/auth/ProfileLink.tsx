"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { LogOut } from "lucide-react";
import SignInDialog from "@/components/auth/SignInDialog";
import PlayerIcon from "../icons/PlayerIcon";
import DownChevronIcon from "../icons/DownChevronIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";

const ProfileLink = ({ user }): JSX.Element => {
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	const handleLogOut = () => {
		closeDialog();
		signOut();
	};

	return (
		<div className="bg-transparent">
			{user !== null ? (
				<>
					<div className="flex items-center gap-10">
						<DropdownMenu>
							<DropdownMenuTrigger className="font-oswald flex items-center gap-2 transition-all hover:opacity-80">
								<span className="text-primary hidden text-lg lg:inline-block">
									{user?.name}
								</span>
								<div className="flex items-center gap-1 ">
									<Avatar className="block lg:hidden">
										<AvatarImage src={session?.user?.image} />
										<AvatarFallback className="bg-neutral-400 uppercase">
											{user?.name[0]}
										</AvatarFallback>
									</Avatar>
									<DownChevronIcon />
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="font-barlow w-56 border border-neutral-500 bg-neutral-900">
								<DropdownMenuLabel className="font-barlow text-xl font-medium uppercase">
									{user?.email}
								</DropdownMenuLabel>

								<DropdownMenuSeparator className="border border-neutral-600" />

								<DropdownMenuGroup>
									<DropdownMenuItem asChild className="cursor-pointer text-lg">
										<Link
											onClick={closeDialog}
											href="/user"
											className="flex w-full items-center gap-2 transition-all hover:opacity-80"
										>
											<Avatar className="hidden size-7 lg:block">
												<AvatarImage src={session?.user?.image} />
												<AvatarFallback className="bg-neutral-400 uppercase">
													{user?.name[0]}
												</AvatarFallback>
											</Avatar>
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>

								<DropdownMenuSeparator className="border border-neutral-600" />

								<DropdownMenuItem
									className="flex w-full cursor-pointer items-center gap-2 text-lg transition-all hover:opacity-80"
									onClick={handleLogOut}
								>
									<LogOut className="stroke-neutral-400" />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
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
