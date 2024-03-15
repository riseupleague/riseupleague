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

const EditCustomer = ({ user }): JSX.Element => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="signIn" className="w-full">
					Edit Customer
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Customer: <span className="text-primary">{user?.name}</span>
					</DialogTitle>
					<DialogDescription>Edit the current customer.</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default EditCustomer;
