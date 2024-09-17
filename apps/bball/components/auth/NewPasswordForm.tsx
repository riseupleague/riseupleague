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
import { findUser } from "@/actions/user-actions";
import SubmitButton from "../general/SubmitButton";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
import { newPassword } from "@/actions/newPassword";
// import UserLoading from "@/app/user/loading";

const NewPasswordForm = ({ userEmail }) => {
	const { toast } = useToast();
	const [userFound, setUserFound] = useState(false);
	const [errors, setErrors] = useState(null);
	const router = useRouter();
	const handleNewPassword = async (userData: FormData) => {
		// finding user first
		const result = await newPassword(userData, userEmail);

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
					"Internal server error. Please report this to @riseup.bball. Thanks!",
				description: result.message,
			});
		}

		if (result.status === 200) {
			setErrors(null);

			await signIn("credentials", {
				email: userEmail,
				password: userData.get("password").toString(),
				redirect: false,
			});

			toast({
				variant: "success",
				title: "Email Sent!",
				description:
					"We’ve emailed your login information to the address you provided.",
				duration: 4000,
			});

			router.push("/");
		}
	};

	return (
		<div className="my-8">
			<Card className="mx-auto w-full sm:w-96">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Password Reset</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						action={handleNewPassword}
						className="font-normal text-neutral-900"
					>
						<div className="my-4 space-y-2">
							<Label htmlFor="password" className="text-neutral-200">
								Please enter your password:
							</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								className={`${errors?.password && "border-[3px] border-red-500"}`}
							/>
							{errors?.password && (
								<p className="text-sm text-red-500">{errors.password}</p>
							)}
						</div>

						<div className="mt-5 flex justify-end">
							<SubmitButton btnText="Reset Password" />
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default NewPasswordForm;
