"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Separator } from "@ui/components/separator";
import { deletePlayerFromTeam } from "@/actions/player-actions";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";

const DeletePlayerFromTeam = ({ open, setOpen, team }) => {
	const { toast } = useToast();
	const router = useRouter();

	const roster = team.filter((player) => !player.teamCaptain && !player.user);

	const handleDeletePlayer = async (player) => {
		const result = await deletePlayerFromTeam(player);

		// successfully updated season
		if (result?.status === 200) {
			toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});

			setOpen(false);
			router.push("/user");
		}

		// tried to delete registered player
		if (result?.status === 403) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}

		// no player found
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild onClick={() => setOpen(!open)}>
				<Button size="sm" variant="destructive" disabled={roster.length === 0}>
					{roster.length === 0 ? "Cannot Delete Players" : "Delete Player"}
				</Button>
			</DialogTrigger>

			<DialogContent className="font-barlow bg-[#111827]">
				<DialogHeader>
					<DialogTitle>Delete Player</DialogTitle>
					<DialogDescription>
						Delete an unregistered player from your team.
					</DialogDescription>
				</DialogHeader>

				<Separator className="border-t border-neutral-500" />

				<div className="grid grid-cols-2 gap-2">
					{roster.map((player) => (
						<Button
							variant="signIn"
							key={player._id}
							onClick={() => handleDeletePlayer(player)}
						>
							<p className="text-lg">{player.playerName}</p>
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default DeletePlayerFromTeam;
