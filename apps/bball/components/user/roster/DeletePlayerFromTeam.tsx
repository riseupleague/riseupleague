"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Separator } from "@ui/components/separator";
import Link from "next/link";

const DeletePlayerFromTeam = ({}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="destructive">
					Delete Player
				</Button>
			</DialogTrigger>

			<DialogContent className="font-barlow bg-[#111827]">
				<DialogHeader>
					<DialogTitle>Delete a player from your team</DialogTitle>
				</DialogHeader>

				<Separator className="border-t border-neutral-500" />

				<p className="text-base">
					Please contact{" "}
					<Link
						href="https://instagram.com/riseup.bball"
						className="text-primary underline transition-all hover:opacity-80"
					>
						@riseup.bball
					</Link>{" "}
					to delete a player from your team.
				</p>
			</DialogContent>
		</Dialog>
	);
};
export default DeletePlayerFromTeam;
