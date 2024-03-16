"use client";

import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { deleteSeason, updateSeason } from "@/actions/seasons-actions";
import { useFormStatus } from "react-dom";
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

const UpdateSeason = ({ season, id }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleEditSeason = async (seasonData: FormData) => {
		const result = await updateSeason(id, seasonData);

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

	const handleDeleteSeason = async () => {
		const result = await deleteSeason(id);

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
				<Button variant="signIn" className="w-full">
					Edit Season
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Season:{" "}
						<span className="text-primary">{season?.seasonName}</span>
					</DialogTitle>
					<DialogDescription>Edit the current season.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleEditSeason} className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<Label htmlFor="name">Season name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New season name"
							defaultValue={season?.seasonName}
							className="text-neutral-900"
						/>
					</div>

					{season?.active !== null && (
						<div className="flex items-center gap-3">
							<Checkbox
								name="active"
								id="active"
								defaultChecked={season?.active}
								className="border-neutral-200"
							/>
							<Label htmlFor="active">Active</Label>
						</div>
					)}

					{season?.register !== null && (
						<div className="flex items-center gap-3">
							<Checkbox
								name="register"
								id="register"
								defaultChecked={season?.register}
								className="border-neutral-200"
							/>
							<Label htmlFor="register">Register Open</Label>
						</div>
					)}

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter className="flex gap-2">
						<SubmitButton />
					</DialogFooter>
				</form>

				{/* delete season */}
				<form action={handleDeleteSeason}>
					<DialogFooter className="flex gap-2">
						<DeleteButton />
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

export default UpdateSeason;
