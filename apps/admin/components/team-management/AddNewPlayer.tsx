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
import { findPlayerUser, addPlayer } from "@/actions/players-action";
import { useState } from "react";

const AddNewPlayer = ({ teamId, seasonId, divisionId }): JSX.Element => {
	const { toast } = useToast();
	const router = useRouter();
	const [userExist, setUserExist] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userId, setUserId] = useState("");

	const handleAddNewPlayer = async (playerData: FormData) => {
		const result = await addPlayer(playerData);

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

	const handleUserExist = async (emailData: FormData) => {
		const result = await findPlayerUser(emailData);
		// successfully updated season
		if (result?.status === 200) {
			setUserExist(true);
			setUserId(result?.userId);
			setUserEmail(result?.userEmail);

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
	const changeUser = () => {
		setUserExist(false);
		setUserId("");
		setUserEmail("");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="addition">Add new player</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Add New Player</DialogTitle>
					{userExist && (
						<DialogDescription className="flex items-center gap-5 text-lg">
							Add new player for {userEmail}{" "}
							<ChangeUserButton changeUser={changeUser} />
						</DialogDescription>
					)}
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				{userExist ? (
					<form action={handleAddNewPlayer} className="space-y-5">
						<input type="hidden" name="team" value={teamId} />
						<input type="hidden" name="division" value={divisionId} />
						<input type="hidden" name="season" value={seasonId} />
						<input type="hidden" name="user" value={userId} />

						<div className="flex gap-2">
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="name">New Player Name:</Label>
								<Input
									name="name"
									id="name"
									placeholder="New player name"
									className="text-neutral-900"
								/>
							</div>

							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="name">Instagram:</Label>
								<Input
									name="instagram"
									id="instagram"
									placeholder="New instagram"
									className="text-neutral-900"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="jerseyNumber">New Jersey Number:</Label>
								<Input
									name="jerseyNumber"
									id="jerseyNumber"
									placeholder="New jersey size"
									className="text-neutral-900"
								/>
							</div>

							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="jerseySize">New Jersey Name:</Label>
								<Input
									name="jerseyName"
									id="jerseyName"
									placeholder="New jersey name"
									className="text-neutral-900"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="jerseySize">New Jersey Size:</Label>
								<select
									name="jerseySize"
									id="jerseySize"
									className="rounded border border-neutral-600 bg-neutral-900 p-2"
								>
									<option value="SM">SM</option>
									<option value="MD">MD</option>
									<option value="LG">LG</option>
									<option value="XL">XL</option>
									<option value="XXL">XXL</option>
									<option value="XXXL">XXXL</option>
									<option value="XXXXL">XXXXL</option>
								</select>
							</div>
							<div className="flex w-full flex-col gap-3">
								<Label htmlFor="shortSize">New Short Size:</Label>
								<select
									name="shortSize"
									id="shortSize"
									className="rounded border border-neutral-600 bg-neutral-900 p-2"
								>
									<option value="SM">SM</option>
									<option value="MD">MD</option>
									<option value="LG">LG</option>
									<option value="XL">XL</option>
									<option value="XXL">XXL</option>
									<option value="XXXL">XXXL</option>
									<option value="XXXXL">XXXXL</option>
								</select>
							</div>
						</div>
						<Separator className="mb-4 border-b border-neutral-500" />

						<DialogFooter>
							<SubmitButton />
						</DialogFooter>
					</form>
				) : (
					<form action={handleUserExist}>
						<p className="my-4">Find user email</p>
						<div className="my-4 flex w-full flex-col gap-3">
							<Label htmlFor="email">Email:</Label>
							<Input
								name="email"
								id="email"
								placeholder="Email"
								className="bg-neutral-900 text-white"
							/>
						</div>

						<DialogFooter>
							<FindUserButton />
						</DialogFooter>
					</form>
				)}
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

const ChangeUserButton = ({ changeUser }) => {
	return (
		<Button variant="secondary" size="sm" onClick={changeUser}>
			Change
		</Button>
	);
};

const FindUserButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{pending ? "Finding..." : "Find"}
		</Button>
	);
};

export default AddNewPlayer;
