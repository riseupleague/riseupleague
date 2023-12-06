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

export default function EditDivision({
	division,
}: {
	division: any;
}): JSX.Element {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register">Edit Division</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Division:{" "}
						<span className="text-primary">{division?.divisionName}</span>
					</DialogTitle>
					<DialogDescription>Edit this division.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<div className="flex flex-col gap-3">
					<Label htmlFor="division-name">Division name:</Label>
					<Input
						id="division-name"
						placeholder="New division name"
						defaultValue={division?.divisionName}
						className="text-neutral-900"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="division-location">Division location:</Label>
					<Input
						id="division-location"
						placeholder="New location name"
						defaultValue={division?.location}
						className="text-neutral-900"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="division-day">Division day of the week:</Label>
					<Input
						id="division-day"
						placeholder="New day name"
						defaultValue={division?.day}
						className="text-neutral-900"
					/>
				</div>

				<div className="flex gap-3">
					<div className="w-1/2">
						<Label htmlFor="division-startTime">Start Time:</Label>
						<Input
							id="division-startTime"
							placeholder="New start name"
							defaultValue={division?.startTime}
							className="text-neutral-900"
						/>
					</div>
					<div className="w-1/2">
						<Label htmlFor="division-endTime">End Time:</Label>
						<Input
							id="division-endTime"
							placeholder="New end name"
							defaultValue={division?.endTime}
							className="text-neutral-900"
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="w-1/2">
						<Label htmlFor="division-earlyBirdPrice">Early Bird Price:</Label>
						<Input
							id="division-earlyBirdPrice"
							type="number"
							placeholder="New early bird price"
							defaultValue={division?.earlyBirdPrice}
							className="text-neutral-900"
						/>
					</div>
					<div className="w-1/2">
						<Label htmlFor="division-regularPrice">Regular Price:</Label>
						<Input
							id="division-regularPrice"
							type="number"
							placeholder="New regular price"
							defaultValue={division?.regularPrice}
							className="text-neutral-900"
						/>
					</div>
				</div>

				{division?.earlyBirdOpen && (
					<div className="flex items-center gap-3">
						<Checkbox
							id="division-earlyBirdOpen"
							defaultChecked={division?.earlyBirdOpen}
							className="border-neutral-200"
						/>
						<Label htmlFor="season-register">Early Bird Open</Label>
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
