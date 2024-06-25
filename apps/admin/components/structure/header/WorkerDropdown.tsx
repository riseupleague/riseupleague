"use client";

import React from "react";
import { LogOut } from "lucide-react";
import DownChevronIcon from "@/components/icons/DownChevronIcon";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";

const WorkerDropdown = ({ user }) => {
	const router = useRouter();

	const handleLogOut = () => {
		signOut();
	};

	return (
		<div className="hidden items-center gap-10 sm:flex">
			<DropdownMenu>
				<DropdownMenuTrigger className="font-oswald flex items-center gap-2 transition-all hover:opacity-80">
					<span className="text-primary  text-lg uppercase ">{user?.name}</span>
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
