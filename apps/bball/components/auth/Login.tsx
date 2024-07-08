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
import UserLoading from "@/app/user/loading";

const Login = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [userFound, setUserFound] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [errors, setErrors] = useState(null);

	const { status, data: session } = useSession();
	if (session || session?.user) router.push("/");

	const handleLogin = async (userData: FormData) => {
		// finding user first
		if (!userFound) {
			const result = await findUser(userData);

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

			setErrors(null);
			setUserFound(true);
		}

		// after user is found
		else {
			try {
				const result = await signIn("credentials", {
					email: userData.get("email").toString(),
					password: userData.get("password").toString(),
					redirect: false,
				});

				if (result.error) {
					setErrors({
						password: "You have entered the wrong password. Please try again.",
					});
					return toast({
						variant: "destructive",
						title: "Invalid credentials",
						description:
							"You have entered the wrong password. Please try again.",
					});
				}

				if (result.status === 200) {
					setErrors(null);

					toast({
						variant: "success",
						title: "Logged in successfully!",
						duration: 1500,
					});

					startTransition(() => router.push("/"));
					startTransition(() => router.refresh());
				}
			} catch (e) {
				console.error(e);
				toast({
					variant: "destructive",
					title: "Something went wrong.",
					description:
						"Internal server error. Please report this to @riseup.bball. Thanks!",
				});
			}
		}
	};

	if (isPending) return <UserLoading />;

	return (
		<div className="my-8">
			<Card className="mx-auto w-full sm:w-96">
				<CardHeader>
					<CardTitle className="text-center text-3xl">
						Log in to your account
					</CardTitle>
					<CardDescription>
						In order to register, you need to create an account.
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

					<p className="my-4 text-center text-base text-neutral-400">
						or with email and password
					</p>

					<form action={handleLogin} className="font-normal text-neutral-900">
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

						{userFound && (
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
						)}

						<div className="mt-5 flex justify-end">
							<SubmitButton btnText="Continue" />
						</div>
					</form>
				</CardContent>

				<CardFooter className="text-sm text-neutral-400">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-primary mx-1 transition-all hover:opacity-80"
					>
						Sign up here.
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
