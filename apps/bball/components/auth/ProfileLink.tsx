"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { LogOut } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";
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
	return (
		<div className="bg-transparent">
			{session?.user ? (
				<>
					<div className="flex items-center gap-10">
						<DropdownMenu>
							<DropdownMenuTrigger className="font-oswald flex items-center gap-2 transition-all hover:opacity-80">
								<span className="text-primary hidden text-lg lg:inline-block">
									{session?.user?.name}
								</span>
								<div className="flex items-center gap-1 ">
									<Avatar className="block lg:hidden">
										<AvatarImage src={session?.user?.image} />
										<AvatarFallback className="bg-neutral-400 uppercase">
											{session?.user?.name[0]}
										</AvatarFallback>
									</Avatar>
									<FaChevronDown className="text-neutral-300" />
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="font-barlow w-56 border border-neutral-500 bg-neutral-900">
								<DropdownMenuLabel className="font-barlow text-xl font-medium uppercase">
									{session?.user?.email}
								</DropdownMenuLabel>

								<DropdownMenuSeparator className="border border-neutral-600" />

								<DropdownMenuGroup>
									<DropdownMenuItem asChild className="cursor-pointer text-lg">
										<Link
											href="/user"
											className="flex w-full items-center gap-2 transition-all hover:opacity-80"
										>
											<Avatar className="hidden size-7 lg:block">
												<AvatarImage src={session?.user?.image} />
												<AvatarFallback className="bg-neutral-400 uppercase">
													{session?.user?.name[0]}
												</AvatarFallback>
											</Avatar>
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>

								<DropdownMenuSeparator className="border border-neutral-600" />

								<DropdownMenuItem
									className="flex w-full cursor-pointer items-center gap-2 text-lg transition-all hover:opacity-80"
									onClick={() => signOut()}
								>
									<LogOut className="stroke-neutral-400" />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</>
			) : (
				<div className="flex items-center gap-3">
					<Button variant="register3" size="register2" asChild>
						<Link href="/login">Log In</Link>
					</Button>
					<Button
						variant="register2"
						size="register2"
						className="hidden sm:flex"
						asChild
					>
						<Link href="/signup">Sign Up</Link>
					</Button>
				</div>
			)}
		</div>
	);
};
export default ProfileLink;
