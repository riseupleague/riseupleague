"use client";

import { signIn } from "next-auth/react";
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
import { createUser, findUser } from "@/actions/user-actions";
import SubmitButton from "../general/SubmitButton";
import { useToast } from "@ui/components/use-toast";
import { useRouter } from "next/navigation";
import UserLoading from "@/app/choose-team-schedule/[id]/loading";

const SignUp = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [newUser, setNewUser] = useState(false);
	const [errors, setErrors] = useState(null);
	const [isPending, startTransition] = useTransition();

	const handleSignUp = async (userData: FormData) => {
		// check if user exists firsts
		if (!newUser) {
			// finding user first
			const result = await findUser(userData);

			if (result?.status === 422) {
				setErrors({
					email: result.message,
				});

				return toast({
					variant: "destructive",
					title: "Please use Gmail method.",
					description: result.message,
				});
			}

			if (result?.status === 200) {
				return toast({
					variant: "destructive",
					title: "User already exists",
					description: "Please use login instead.",
				});
			}

			setNewUser(true);
		}

		// create user
		else {
			const result = await createUser(userData);

			if (result?.status === 422) {
				setErrors(result.errors);

				return toast({
					variant: "destructive",
					title: "Invalid fields.",
					description: "Please see the errors indicated.",
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

			setErrors(null);

			if (result.status === 201) {
				toast({
					variant: "success",
					title: "Logged in successfully!",
					duration: 1500,
				});

				startTransition(() => router.push("/"));
				startTransition(() => router.refresh());
			}
		}
	};

	if (isPending) return <UserLoading />;

	return (
		<div className="my-8">
			<Card className="mx-auto w-96">
				<CardHeader>
					<CardTitle className="text-center text-3xl">
						Create an account
					</CardTitle>
					<CardDescription className="text-center text-base text-neutral-300">
						Create an account with Gmail:
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						variant="signIn"
						onClick={() => signIn("google")}
						className="w-full"
					>
						<FcGoogle className="scale-110" />
						Continue With Google
					</Button>

					<p className="my-4 text-center text-base text-neutral-300">
						or with a non-Gmail account:
					</p>

					<form action={handleSignUp} className="font-normal text-neutral-900">
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
								<p className="text-primary text-sm">{errors?.email}</p>
							)}
						</div>

						{newUser && (
							<div className="my-2 space-y-1">
								<div className="space-y-2">
									<Label htmlFor="password" className="text-neutral-200">
										Please create a password (at least 4 characters):
									</Label>
									<Input
										id="password"
										name="password"
										type="password"
										placeholder="Password"
										className={`${errors?.password ? "border-[3px] border-red-500" : ""}`}
									/>
									{errors?.password && (
										<p className="text-primary text-sm">{errors?.password}</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="name" className="text-neutral-200">
										Please enter your first and last name:
									</Label>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="First and Last Name"
										className={`${errors?.name ? "border-[3px] border-red-500" : ""}`}
									/>
									{errors?.name && (
										<p className="text-primary text-sm">{errors?.name}</p>
									)}
								</div>
							</div>
						)}

						<div className="mt-5 flex justify-end">
							<SubmitButton btnText="Continue" />
						</div>
					</form>
				</CardContent>

				<CardFooter className="text-sm text-neutral-400">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-primary mx-1 transition-all hover:opacity-80"
					>
						Log in here.
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignUp;
