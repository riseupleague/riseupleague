"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { deleteDivision, updateDivision } from "@/actions/division-actions";
import { useFormStatus } from "react-dom";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
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

const UpdateDivision = ({ division }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleUpdateDivision = async (divisionData: FormData) => {
		const result = await updateDivision(divisionData, division._id);

		// successfully updated season
		if (result?.status === 200) {
			return toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});
		}

		// no season found
		if (result?.status === 404) {
			return toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}

		// internal server error
		if (result?.status === 500) {
			return toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}
	};

	const handleDeleteDivision = async () => {
		const result = await deleteDivision(division._id);

		// successfully updated season
		if (result?.status === 200) {
			toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});

			router.push("/seasons-management");
		}

		// no season found
		if (result?.status === 404) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}

		// internal server error
		if (result?.status === 500) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="signIn" className="w-full font-semibold">
					Update Division
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Update Division:</DialogTitle>
					<DialogDescription>Update this division.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleUpdateDivision} className="space-y-5">
					<div className="flex flex-col gap-3">
						<Label htmlFor="name">New Division Name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New division name"
							defaultValue={division?.divisionName}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="location">New Division Location:</Label>
						<Input
							name="location"
							id="location"
							placeholder="Division location"
							defaultValue={division?.location}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="description">New Description:</Label>
						<Input
							name="description"
							id="description"
							placeholder="Division Description"
							defaultValue={division?.description}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="city">New Division City:</Label>
							<Input
								name="city"
								id="city"
								placeholder="Division City"
								defaultValue={division?.city}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="day">New Day of the Week:</Label>
							<Input
								name="day"
								id="day"
								placeholder="Division Day of the Week"
								defaultValue={division?.day}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="startTime">New Start Time:</Label>
							<Input
								type="time"
								name="startTime"
								id="startTime"
								placeholder="Division Start Time"
								defaultValue={division?.startTime}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="endTime">New End Time:</Label>
							<Input
								type="time"
								name="endTime"
								id="endTime"
								placeholder="Division End Time"
								defaultValue={division?.endTime}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="earlyBirdPrice">New Early Bird Price</Label>
							<Input
								type="number"
								name="earlyBirdPrice"
								id="earlyBirdPrice"
								placeholder="Early Bird Price"
								defaultValue={division?.earlyBirdPrice}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="regularPrice">New Regular Price</Label>
							<Input
								type="number"
								name="regularPrice"
								id="regularPrice"
								placeholder="Regular Price"
								defaultValue={division?.regularPrice}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="instalmentPrice">New Instalment Price (x6)</Label>
							<Input
								type="number"
								name="instalmentPrice"
								id="instalmentPrice"
								placeholder="Instalment Price"
								defaultValue={division?.instalmentPrice}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="instalmentPrice">
								New Regular Instalment Price
							</Label>
							<Input
								type="number"
								name="instalmentPrice"
								id="instalmentPrice"
								placeholder="Regular Instalment Price"
								defaultValue={division?.instalmentPrice}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="regularPriceInstalmentId">
							New Regular Price Instalment ID:
						</Label>
						<Input
							name="regularPriceInstalmentId"
							id="regularPriceInstalmentId"
							placeholder="Regular Price Instalment ID"
							defaultValue={division?.regularPriceInstalmentId}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="earlyBirdId">New Early Bird ID:</Label>
							<Input
								type="text"
								name="earlyBirdId"
								id="earlyBirdId"
								placeholder="Early Bird ID"
								defaultValue={division?.earlyBirdId}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="regularPriceFullId">
								New Regular Full Price ID:
							</Label>
							<Input
								type="text"
								name="regularPriceFullId"
								id="regularPriceFullId"
								placeholder="Regular Full Price ID"
								defaultValue={division?.regularPriceFullId}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Checkbox
							name="earlyBirdOpen"
							id="earlyBirdOpen"
							defaultChecked={division?.earlyBirdOpen}
							className="border-neutral-200"
						/>
						<Label htmlFor="earlyBirdOpen">Early Bird Open</Label>
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<SubmitButton />
					</DialogFooter>
				</form>

				<form action={handleDeleteDivision}>
					<DeleteButton />
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
				{pending ? "Updating..." : "Update"}
			</Button>
		</DialogClose>
	);
};

const DeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<DialogClose asChild>
			<Button
				type="submit"
				className="w-full bg-red-500 transition-all hover:bg-red-700"
				disabled={pending}
			>
				{pending ? "Deleting..." : "Delete"}
			</Button>
		</DialogClose>
	);
};

export default UpdateDivision;
