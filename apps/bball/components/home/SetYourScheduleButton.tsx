"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInDialog from "../auth/SignInDialog";
import { useState } from "react";

const SetYourScheduleButton = (): JSX.Element => {
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	const openDialog = () => {
		setOpen(true);
	};

	return (
		<section className="font-barlow my-8 flex flex-col items-center justify-center text-center text-neutral-50">
			<h2 className="my-8">
				Choose your team schedule for the upcoming season!
			</h2>
			<div className="w-full px-2">
				{!session || !session.user ? (
					<Button className="w-full" onClick={openDialog}>
						Set Your Schedule
					</Button>
				) : (
					<Link
						href="/choose-team-schedule"
						className="font-barlow block w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Set Your Schedule
					</Link>
				)}
			</div>
			<SignInDialog open={open} onOpenChange={setOpen} />
		</section>
	);
};

export default SetYourScheduleButton;
