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

export default function EditSeason({ season }: { season: any }): JSX.Element {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register">Edit Season</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Season:{" "}
						<span className="text-primary">{season.seasonName}</span>
					</DialogTitle>
					<DialogDescription>Edit the current season.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<div className="flex flex-col gap-3">
					<Label htmlFor="season-name">Season name:</Label>
					<Input
						id="season-name"
						placeholder="New season name"
						defaultValue={season.seasonName}
						className="text-neutral-900"
					/>
				</div>

				<div className="flex items-center gap-3">
					<Checkbox
						id="season-active"
						defaultChecked={season?.active}
						className="border-neutral-200"
					/>
					<Label htmlFor="season-active">Active</Label>
				</div>

				{season?.register && (
					<div className="flex items-center gap-3">
						<Checkbox
							id="season-register"
							defaultChecked={season?.register}
							className="border-neutral-200"
						/>
						<Label htmlFor="season-register">Register Open</Label>
					</div>
				)}

				<Separator className="mb-4 border-b border-neutral-500" />

				<DialogFooter>
					<Button>Update</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
