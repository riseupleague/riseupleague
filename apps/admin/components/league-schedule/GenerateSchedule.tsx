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

const GenerateSchedule = ({ division }): JSX.Element => {
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

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="signIn" className="w-full font-semibold">
					Generate Schedule
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Generate Schedule:</DialogTitle>
					{/* <DialogDescription>Update this division.</DialogDescription> */}
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleUpdateDivision} className="space-y-5">
					<div className="flex flex-col gap-3">
						<Label htmlFor="name">How many teams in the division?</Label>
						<select
							name="teamNumber"
							id="teamNumber"
							className="rounded border border-neutral-600 bg-neutral-900 p-2"
						>
							<option value="SM">6</option>
							<option value="MD">7</option>
							<option value="LG">8</option>
							<option value="XL">9</option>
							<option value="XXL">10</option>
							<option value="XXXL">11</option>
							<option value="XXXXL">12</option>
						</select>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="startTime">Start Time:</Label>
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
							<Label htmlFor="endTime">End Time:</Label>
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
				{pending ? "Generating..." : "Generate"}
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

export default GenerateSchedule;
