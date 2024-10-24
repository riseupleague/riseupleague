"use client";

import { Button } from "@ui/components/button";
import { useFormStatus } from "react-dom";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
import { deleteGame } from "@/actions/games-action";
import { Loader2 } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

const DeleteGame = ({ game }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleDeleteGame = async () => {
		const result = await deleteGame(game._id);

		// successfully updated season
		if (result?.status === 200) {
			toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});

			router.push(
				`/league-schedule/${game?.division?.season}/${game?.division?._id}`
			);
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
				<Button
					variant="destructive"
					className="w-full font-semibold uppercase"
				>
					Delete Game
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete {game?.gameName}?
					</DialogTitle>
					<DialogDescription className="text-lg">
						This game will be permanently deleted.
					</DialogDescription>
				</DialogHeader>

				<form action={handleDeleteGame}>
					<DeleteButton />
				</form>
			</DialogContent>
		</Dialog>
	);
};

const DeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<DialogClose asChild>
			<Button
				type="submit"
				variant="destructive"
				className="w-full bg-red-500 transition-all hover:bg-red-700"
				disabled={pending}
			>
				{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
			</Button>
		</DialogClose>
	);
};

export default DeleteGame;
