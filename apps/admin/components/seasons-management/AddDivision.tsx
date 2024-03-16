"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { useToast } from "@ui/components/use-toast";
import { addDivision } from "@/actions/division-actions";
import { useFormStatus } from "react-dom";

const AddDivision = ({ seasonId }): JSX.Element => {
	const { toast } = useToast();

	const handleFormAction = async (divisionData: FormData) => {
		const result = await addDivision(seasonId, divisionData);

		// successfully created division
		if (result?.status === 201) {
			return toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});
		}

		// show error toast
		return toast({
			variant: "destructive",
			title: "Error",
			description: result.message,
		});
	};

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

				<form action={handleFormAction} className="space-y-5">
					<div className="flex flex-col gap-3">
						<Label htmlFor="name">Division Name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New division name"
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="location">Division Location:</Label>
						<Input
							name="location"
							id="location"
							placeholder="Division location"
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="description">Description:</Label>
						<Input
							name="description"
							id="location"
							placeholder="Division description"
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="city">Division City:</Label>
							<Input
								name="city"
								id="city"
								placeholder="Division City"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="day">Division Day of the Week:</Label>
							<Input
								name="day"
								id="day"
								placeholder="Division Day of the Week"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="startTime">Division Start Time:</Label>
							<Input
								type="time"
								name="startTime"
								id="startTime"
								placeholder="Division Start Time"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="endTime">Division End Time:</Label>
							<Input
								type="time"
								name="endTime"
								id="endTime"
								placeholder="Division End Time"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="earlyBirdPrice">Early Bird Price</Label>
							<Input
								type="number"
								name="earlyBirdPrice"
								id="earlyBirdPrice"
								placeholder="Early Bird Price"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="regularPrice">Regular Price</Label>
							<Input
								type="number"
								name="regularPrice"
								id="regularPrice"
								placeholder="Regular Price"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="instalmentPrice">Instalment Price (x4)</Label>
							<Input
								type="number"
								name="instalmentPrice"
								id="instalmentPrice"
								placeholder="Instalment Price"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="regularPriceInstalmentId">
								Regular Instalment Price
							</Label>
							<Input
								type="number"
								name="regularPriceInstalmentId"
								id="regularPriceInstalmentId"
								placeholder="Regular Instalment Price"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="regularPriceInstalmentId">
							Regular Price Instalment ID:
						</Label>
						<Input
							name="regularPriceInstalmentId"
							id="regularPriceInstalmentId"
							placeholder="Regular Price Instalment ID"
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="earlyBirdId">Early Bird ID</Label>
							<Input
								type="text"
								name="earlyBirdId"
								id="earlyBirdId"
								placeholder="Early Bird ID"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="regularPriceFullId">Regular Full Price ID</Label>
							<Input
								type="text"
								name="regularPriceFullId"
								id="regularPriceFullId"
								placeholder="Regular Full Price ID"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Checkbox
							name="earlyBirdOpen"
							id="earlyBirdOpen"
							className="border-neutral-200"
						/>
						<Label htmlFor="earlyBirdOpen">Early Bird Open</Label>
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<SubmitButton />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<DialogClose asChild>
			<Button type="submit" className="w-full" disabled={pending}>
				{pending ? "Creating..." : "Create"}
			</Button>
		</DialogClose>
	);
};

export default AddDivision;
