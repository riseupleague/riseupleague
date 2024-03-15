"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { editSeasonAction } from "@/actions/editSeasonAction";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

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
