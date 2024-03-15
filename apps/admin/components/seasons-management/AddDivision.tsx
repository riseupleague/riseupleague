"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

const AddDivision = (): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register" className="w-full font-semibold">
					Add New Division
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Add New Division:</DialogTitle>
					<DialogDescription>Add a new division.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<div className="flex flex-col gap-3">
					<Label htmlFor="division-name">Division Name:</Label>
					<Input
						id="division-name"
						placeholder="New division name"
						className="text-neutral-900"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="division-location">Division Location:</Label>
					<Input
						id="division-location"
						placeholder="Division location"
						className="text-neutral-900"
					/>
				</div>

				<div className="flex gap-2">
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="division-start-time">Division Start Time:</Label>
						<Input
							id="division-start-time"
							placeholder="Division Start Time"
							className="text-neutral-900"
						/>
					</div>
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="division-end-time">Division End Time:</Label>
						<Input
							id="division-end-time"
							placeholder="Division End Time"
							className="text-neutral-900"
						/>
					</div>
				</div>

				<div className="flex gap-2">
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="division-early-bird-price">Early Bird Price</Label>
						<Input
							type="number"
							id="division-early-bird-price"
							placeholder="Early Bird Price"
							className="text-neutral-900"
						/>
					</div>
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="division-regular-price">Regular Price</Label>
						<Input
							type="number"
							id="division-regular-price"
							placeholder="Regular Price"
							className="text-neutral-900"
						/>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<Checkbox id="early-bird-open" className="border-neutral-200" />
					<Label htmlFor="early-bird-open">Early Bird Open</Label>
				</div>

				<Separator className="mb-4 border-b border-neutral-500" />

				<DialogFooter>
					<Button className="w-full" disabled>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddDivision;
