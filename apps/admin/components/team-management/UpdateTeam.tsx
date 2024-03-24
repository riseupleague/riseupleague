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

const UpdateTeam = ({ team }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();

	const handleUpdateTeam = async (teamData: FormData) => {
		const result = await updateTeam(team._id, teamData);

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

	const handleDeleteTeam = async () => {
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
				<Button variant="signIn" className="w-full font-semibold">
					Update Team
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Update Team: {team?.teamName}</DialogTitle>
					<DialogDescription>Update this team.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={handleUpdateTeam} className="space-y-5">
					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="name">New Team Name:</Label>
						<Input
							name="name"
							id="name"
							placeholder="New team name"
							defaultValue={team?.teamName}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex w-full flex-col gap-3">
						<Label htmlFor="teamCaptain">New Team Captain:</Label>
						<select
							name="teamCaptain"
							id="teamCaptain"
							className="rounded border border-neutral-600 bg-neutral-900 p-2"
						>
							<option value="">Select Captain</option>
							{team.players.map((player) => (
								<option key={player._id} value={player._id}>
									{player.playerName}
								</option>
							))}
						</select>
					</div>

					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="nameShort">New Team Name Short:</Label>
							<Input
								name="nameShort"
								id="nameShort"
								placeholder="Team Name Short"
								defaultValue={team?.teamNameShort}
								className="text-neutral-900"
							/>
						</div>

						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="teamCode">Team Code:</Label>
							<Input
								name="teamCode"
								id="teamCode"
								placeholder="New team code"
								defaultValue={team?.teamCode}
								className="text-neutral-900"
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="wins">New wins:</Label>
							<Input
								name="wins"
								id="wins"
								placeholder="New wins"
								defaultValue={team?.wins}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="losses">New losses:</Label>
							<Input
								name="losses"
								id="losses"
								placeholder="New losses"
								defaultValue={team?.losses}
								className="text-neutral-900"
							/>
						</div>
						<div className="flex w-full flex-col gap-3">
							<Label htmlFor="losses">New Point Difference:</Label>
							<Input
								name="pointDifference"
								id="pointDifference"
								placeholder="New pointDifference"
								defaultValue={team?.pointDifference}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Checkbox
							name="paid"
							id="paid"
							defaultChecked={team?.paid}
							className="border-neutral-200"
						/>
						<Label htmlFor="paid">Paid</Label>
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<SubmitButton />
					</DialogFooter>
				</form>

				{/* <form action={handleDeleteTeam}>
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

export default UpdateTeam;
