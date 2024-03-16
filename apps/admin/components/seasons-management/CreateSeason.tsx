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
import { useFormStatus } from "react-dom";
import { createSeason } from "@/actions/seasons-actions";
import { useToast } from "@ui/components/use-toast";

const CreateSeason = (): JSX.Element => {
	const { toast } = useToast();

	const handleFormAction = async (seasonData: FormData) => {
		const result = await createSeason(seasonData);

		// successfully created season
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
					Add New Season
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Add New Season:</DialogTitle>
					<DialogDescription>Add a new season.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleFormAction} className="space-y-4">
					<div className="flex flex-col gap-3">
						<Label htmlFor="name">Season name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New season name"
							className="text-neutral-900"
							required
						/>
					</div>

					<div className="flex gap-4">
						<div className="flex w-full items-center gap-3">
							<Checkbox
								name="active"
								id="active"
								className="border-neutral-200"
							/>
							<Label htmlFor="active">Active</Label>
						</div>

						<div className="flex w-full items-center gap-3">
							<Checkbox
								name="register"
								id="register"
								className="border-neutral-200"
							/>
							<Label htmlFor="register">Register Open</Label>
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
				{pending ? "Creating..." : "Create"}
			</Button>
		</DialogClose>
	);
};

export default CreateSeason;
