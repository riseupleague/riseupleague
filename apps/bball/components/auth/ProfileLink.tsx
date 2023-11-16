"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@ui/components/button";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import SignInDialog from "@/components/auth/SignInDialog";
const ProfileLink = () => {
	const { status, data: session } = useSession();
	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	// Function to close the dialog
	const closeDialog = () => {
		setOpen(false);
	};
	return (
		<div className="bg-neutral-900">
			{status === "authenticated" ? (
				<>
					<div className="flex items-center gap-10">
						{/* <Image
							src={session?.user?.image}
							width={40}
							height={40}
							alt="profile photo"
							className="cursor-pointer rounded-full"
						/> */}

						<DropdownMenu>
							<DropdownMenuTrigger>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className=" h-[40px] w-[40px] cursor-pointer"
								>
									<path
										fillRule="nonzero"
										stroke="currentColor"
										strokeWidth="0.5"
										d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm0-.846c-2.25 0-4.324-.745-6.01-1.988a46.658 46.658 0 0 1 1.653-.747c.075-.03.875-.368.875-.368.361-.18 1.91-1.024 2.119-2.302.067-.415.022-1.036-.576-1.641-.224-.226-.538-.762-.765-2.034l-.123-.68-.447-.012c-.095-.15-.237-.447-.344-.883a3.948 3.948 0 0 1-.1-.588l.519.14-.153-1.246c-.093-.763-.03-1.124.001-1.199l.469-.654c.346-.481.597-.83.99-1.49.315-.53 1.672-.916 2.999-1.104-.02.165-.014.334.027.502.063.26.265.732.913.967.353.126.47.323.754.875.144.28.309.597.546.938-.006 0 .1.291.017 1.188l-.105 1.137.457-.094a3.94 3.94 0 0 1-.105.628c-.108.436-.248.733-.343.883l-.449.011-.12.68c-.23 1.272-.542 1.808-.765 2.033-.599.606-.644 1.227-.577 1.64.208 1.28 1.758 2.122 2.065 2.278.053.024.854.362.943.398.6.259 1.146.507 1.641.743A10.068 10.068 0 0 1 12 22.154zm0-20.308c5.599 0 10.154 4.555 10.154 10.154 0 3.014-1.327 5.717-3.42 7.579a47.862 47.862 0 0 0-2.929-1.307s-2.538-1.285-1.27-2.57c.514-.518.814-1.46.997-2.48.296-.007.688-.653.901-1.519.228-.918.167-1.724-.136-1.8-.03-.007-.06-.001-.09.004.069-.74.047-1.444-.163-1.749-.657-.939-.713-1.767-1.708-2.125-.992-.36.202-1.648.202-1.648s-4.25.119-5.157 1.645c-.532.893-.79 1.188-1.445 2.128-.212.305-.218 1.01-.127 1.75a.213.213 0 0 0-.11-.005c-.304.076-.365.882-.138 1.8.215.866.607 1.512.902 1.52.183 1.02.482 1.96.996 2.48 1.27 1.284-1.27 2.569-1.27 2.569l-.88.37c-.56.241-1.314.578-2.045.935C3.173 17.716 1.846 15.013 1.846 12 1.846 6.401 6.401 1.846 12 1.846z"
									></path>
								</svg>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 bg-neutral-900">
								<DropdownMenuLabel className="uppercase">
									{session?.user?.name}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem className="cursor-pointer">
										<Link href={"/user"} className="flex">
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />

								<DropdownMenuItem
									className="cursor-pointer"
									onClick={() => signOut()}
								>
									<LogOut className="mr-2 h-4 w-4" />
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
					<Button onClick={openDialog} variant="register">
						Log In
					</Button>
					<SignInDialog open={open} onOpenChange={setOpen} />
				</>
			)}
		</div>
	);
};
export default ProfileLink;
