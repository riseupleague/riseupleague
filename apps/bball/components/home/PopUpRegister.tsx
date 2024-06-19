"use client";
import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

const PopUpRegister = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const lastDialogTime = localStorage.getItem("lastDialogTime");
		if (
			!lastDialogTime ||
			Date.now() - parseInt(lastDialogTime, 10) > 24 * 60 * 60 * 1000
		) {
			// If last dialog time is not set or more than 24 hours has passed, show the dialog
			setIsOpen(true);
			localStorage.setItem("lastDialogTime", Date.now().toString());
		}
	}, []);

	return (
		<div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
					<DialogHeader>
						<DialogTitle>Register Now</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default PopUpRegister;
