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
import { generateGameSchedule } from "@/actions/games-action";
import Link from "next/link";

const GenerateSchedule = ({ division }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleGenerateSchedule = async (gameData: FormData) => {
		const result = await generateGameSchedule(
			division._id,
			division.season,
			gameData
		);

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

				<form action={handleGenerateSchedule} className="space-y-5">
					<input type="hidden" name="location" value={division?.location} />
					<input type="hidden" name="startTime" value={division?.startTime} />
					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label>Start Time:</Label>
							<div>{division?.startTime}</div>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label>Location:</Label>
							<div>{division?.location}</div>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="teamsTotal">How many teams in the division?</Label>
						<select
							name="teamsTotal"
							id="teamsTotal"
							defaultValue="8"
							className="rounded border border-neutral-600 bg-neutral-900 p-2"
						>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
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

export default GenerateSchedule;
