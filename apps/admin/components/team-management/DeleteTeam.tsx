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
import { deleteTeam, updateTeam } from "@/actions/teams-actions";

const DeleteTeam = ({ team }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleDeleteTeam = async () => {
		if (team.players.length > 0) {
			toast({
				variant: "destructive",
				title: "Error!",
				description: "Please delete all the players in this team first.",
			});

			return;
		}

		const result = await deleteTeam(team._id);

		// successfully updated season
		if (result?.status === 200) {
			toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});

			router.push("/team-management");
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
				<Button variant="destructive" className="w-full font-semibold">
					Delete Team
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete {team?.teamName}?
					</DialogTitle>
					<DialogDescription className="text-lg">
						This team will be permanently deleted.
					</DialogDescription>
				</DialogHeader>

				<form action={handleDeleteTeam}>
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
				{pending ? "Deleting..." : "Delete"}
			</Button>
		</DialogClose>
	);
};

export default DeleteTeam;
