"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";

export default function AddSeason(): JSX.Element {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register">Add New Season</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Add New Season:</DialogTitle>
					<DialogDescription>Add a new season.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<div className="flex flex-col gap-3">
					<Label htmlFor="season-name">Season name:</Label>
					<Input
						id="season-name"
						placeholder="New season name"
						className="text-neutral-900"
					/>
				</div>

				<div className="flex items-center gap-3">
					<Checkbox id="season-active" className="border-neutral-200" />
					<Label htmlFor="season-active">Active</Label>
				</div>

				<div className="flex items-center gap-3">
					<Checkbox id="season-register" className="border-neutral-200" />
					<Label htmlFor="season-register">Register Open</Label>
				</div>

				<Separator className="mb-4 border-b border-neutral-500" />

				<DialogFooter>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
