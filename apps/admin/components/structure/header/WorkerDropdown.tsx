"use client";
import React from "react";
import { LogOut } from "lucide-react";
import DownChevronIcon from "@/components/icons/DownChevronIcon";
import { signOut } from "next-auth/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
const WorkerDropdown = ({ session }) => {
	const handleLogOut = () => {
		signOut();
	};
	return (
		<div className="flex items-center gap-10">
			<DropdownMenu>
				<DropdownMenuTrigger className="font-oswald flex items-center gap-2 transition-all hover:opacity-80">
					<span className="text-primary hidden text-lg uppercase lg:inline-block">
						{session?.user?.name}
					</span>
					<div className="flex items-center gap-1 ">
						<DownChevronIcon />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="font-barlow w-56 border border-neutral-500 bg-neutral-900">
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
	);
};

export default WorkerDropdown;
