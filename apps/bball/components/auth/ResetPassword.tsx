"use client";

import { signIn, useSession } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/card";
import Link from "next/link";
import { Label } from "@ui/components/label";
import { Button } from "@ui/components/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@ui/components/input";
import { useState, useTransition } from "react";
import { resetUserPassword } from "@/actions/resetUserPassword";
import SubmitButton from "../general/SubmitButton";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
// import UserLoading from "@/app/user/loading";

const ResetPassword = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [errors, setErrors] = useState(null);

	const { status, data: session } = useSession();
	if (session || session?.user) router.push("/");

	const handleResetPassword = async (userData: FormData) => {
		// finding user first
		const result = await resetUserPassword(userData);

		if (result?.status === 404) {
			setErrors({
				email: result.message,
			});

			return toast({
				variant: "destructive",
				title: "User not found",
				description: result.message,
			});
		}

		if (result?.status === 422) {
			setErrors({
				email: result.message,
			});

			return toast({
				variant: "destructive",
				title: "Invalid email format. Please try again.",
				description: result.message,
			});
		}

		if (result?.status === 500) {
			setErrors(null);

			return toast({
				variant: "destructive",
				title:
					"Internal server error. Please report this to @riseup.leagues. Thanks!",
				description: result.message,
			});
		}

		if (result.status === 200) {
			setErrors(null);

			toast({
				variant: "success",
				title: "Email Sent!",
				description:
					"We’ve emailed your login information to the address you provided.",
				duration: 4000,
			});
		}
	};

	return (
		<div className="my-8">
			<Card className="mx-auto w-full sm:w-96">
				<CardHeader>
					<CardTitle className="text-center text-3xl">
						Forgot Password?
					</CardTitle>
					<CardDescription>
						Just enter your email address and we’ll send you a reminder.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						action={handleResetPassword}
						className="font-normal text-neutral-900"
					>
						<div className="space-y-2">
							<Label htmlFor="email" className="hidden">
								Email
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Please enter your email"
								className={`${errors?.email ? "border-[3px] border-red-500" : ""}`}
							/>
							{errors?.email && (
								<p className="text-sm text-red-500">{errors.email}</p>
							)}
						</div>

						<div className="mt-5 flex justify-end">
							<SubmitButton btnText="Continue" />
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ResetPassword;
