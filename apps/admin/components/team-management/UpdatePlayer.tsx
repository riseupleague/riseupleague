"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
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
import { deletePlayer, updatePlayer } from "@/actions/players-action";

const UpdatePlayer = ({ player }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleUpdatePlayer = async (playerData: FormData) => {
		const result = await updatePlayer(player._id, playerData);

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

	// const handleDeleteTeam = async () => {
	// 	const result = await deleteTeam(team._id);

	// 	// successfully updated season
	// 	if (result?.status === 200) {
	// 		toast({
	// 			variant: "success",
	// 			title: "Success!",
	// 			description: result.message,
	// 		});

	// 		router.push("/team-management");
	// 	}

	// 	// no season found
	// 	if (result?.status === 404) {
	// 		toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}

	// 	// internal server error
	// 	if (result?.status === 500) {
	// 		toast({
	// 			variant: "destructive",
	// 			title: "Error",
	// 			description: result.message,
	// 		});
	// 	}
	// };

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="signIn" className="w-full font-semibold">
					Update Player
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Update Player: {player?.playerName}</DialogTitle>
					<DialogDescription>Update this player.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleUpdatePlayer} className="space-y-5">
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="name">New Player Name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New player name"
							defaultValue={player?.playerName}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="jerseyNumber">New Jersey Number:</Label>
							<Input
								name="jerseyNumber"
								id="jerseyNumber"
								placeholder="New jersey size"
								defaultValue={player?.jerseyNumber}
								className="text-neutral-900"
							/>
						</div>

						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="jerseySize">New Jersey Size:</Label>
							<Input
								name="jerseySize"
								id="jerseySize"
								placeholder="New jersey size"
								defaultValue={player?.jerseySize}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<SubmitButton />
					</DialogFooter>
				</form>
				{/* 
				<form action={handleDeleteTeam}>
					<DeleteButton />
				</form> */}
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

export default UpdatePlayer;
