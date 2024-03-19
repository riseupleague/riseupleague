"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

const AddCustomer = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="signIn" className="w-full">
					Add Customer
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>Add Customer</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddCustomer;
