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
import { createTeam } from "@/actions/teams-actions";
import { useToast } from "@ui/components/use-toast";

const CreateTeam = ({ divisionId, seasonId }): JSX.Element => {
	const { toast } = useToast();

	const handleFormAction = async (teamData: FormData) => {
		const result = await createTeam(seasonId, divisionId, teamData);

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
					Create Team
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Create New Team:</DialogTitle>
					<DialogDescription>Create a new team.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleFormAction} className="space-y-4">
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="name">Team Name</Label>
						<Input
							name="name"
							id="name"
							placeholder="Team name"
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="nameShort">Team Name Short</Label>
							<Input
								name="nameShort"
								id="nameShort"
								placeholder="Team Name Short"
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="code">Team Code</Label>
							<Input
								name="code"
								id="code"
								placeholder="Team code"
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex w-full items-center gap-3">
						<Checkbox name="paid" id="paid" className="border-neutral-200" />
						<Label htmlFor="paid">Paid</Label>
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

export default CreateTeam;
