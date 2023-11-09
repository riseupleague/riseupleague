"use client";

import { Button } from "@ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
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
import { useState } from "react";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";

const SignInDialog = () => {
	const { status, data: session } = useSession();
	const [isEmail, setIsEmail] = useState(false);
	const [isCreateAccount, setIsCreateAccount] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isRegisterPassword, setIsRegisterPassword] = useState(false);
	const [isRegisterName, setIsRegisterName] = useState(false);

	const [useGoogle, setUseGoogle] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerName, setRegisterName] = useState("");

	const [name, setName] = useState("");
	const handleEmailValidation = async (event: React.FormEvent) => {
		event.preventDefault();

		if (email) {
			const res = await fetch("/api/userExists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: email }),
			});

			const { user } = await res.json();

			console.log(user);

			if (user) {
				console.log("type password");
				setIsPassword(true);
			} else {
				const regex = /@gmail/i;
				console.log("create account");

				if (regex.test(email)) {
					setIsEmail(false);
					setIsPassword(false);
					setIsCreateAccount(false);
					setUseGoogle(true);
				} else {
					setIsCreateAccount(true);
				}
			}
		}
	};

	const handleCreateAccountWithEmail = async (event: React.FormEvent) => {
		event.preventDefault();

		console.log(registerName, registerPassword, email);

		if (registerName && registerPassword && email) {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					name: registerName,
					password: registerPassword,
				}),
			});
		}
	};

	const handleLoginCredentials = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (res.error) {
				alert("wrong credentials");
				return;
			}
		} catch (error) {}
	};
	return (
		<div>
			{status === "authenticated" ? (
				<>
					<Image
						src={session?.user?.image}
						width={60}
						height={60}
						alt="profile photo"
						className="rounded-full"
					/>

					<span>{session?.user?.name}</span>
					<Button variant="register" onClick={() => signOut()}>
						Log Out
					</Button>
				</>
			) : (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="register">Log In</Button>
					</DialogTrigger>

					{!isEmail ? (
						<DialogContent className="bg-white text-black sm:max-w-md">
							<DialogHeader className="text-center">
								<DialogTitle className="text-center">
									Log in or sign up in seconds
								</DialogTitle>
								{!useGoogle ? (
									<DialogDescription className="text-center text-xs">
										Use your gmail or another email to continue.
									</DialogDescription>
								) : (
									<DialogDescription className="text-primary text-center text-xs">
										Please use your google account instead.
									</DialogDescription>
								)}
							</DialogHeader>
							<div className="flex flex-col  gap-3">
								<Button onClick={() => signIn("google")}>
									Continue With Google
								</Button>
								<Button onClick={() => setIsEmail(true)}>
									Continue With Email
								</Button>
							</div>
							<DialogFooter className="text-center sm:justify-start">
								<DialogDescription className="text-xs">
									By continuing, you agree to Rise Up League&apos;s{" "}
									<Link href={"/terms"} className="underline">
										Terms of Use.
									</Link>{" "}
									Read our{" "}
									<Link href="/privacy" className="underline">
										Privacy Policy.
									</Link>
								</DialogDescription>
							</DialogFooter>
						</DialogContent>
					) : (
						<>
							{!isCreateAccount ? (
								<>
									{!isPassword ? (
										<DialogContent className="bg-white text-black sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="text-center">
													<button
														onClick={() => {
															setIsEmail(false);
															setName("");
															setEmail("");
														}}
													>
														Back
													</button>{" "}
													Continue with your email
												</DialogTitle>
												<DialogDescription className="text-center text-xs">
													We&apos;ll check if you have an account, and help
													create one if you don&apos;t.
												</DialogDescription>
											</DialogHeader>
											<div className="flex flex-col  gap-3">
												<form
													onSubmit={handleEmailValidation}
													className="flex flex-col gap-3"
												>
													<Label className="text-xs">Email Address</Label>
													<Input
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														type="email"
														placeholder="john@example.com"
													/>
													<Button type="submit">Continue</Button>
												</form>
											</div>
										</DialogContent>
									) : (
										<DialogContent className="bg-white text-black sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="text-center">
													<button
														onClick={() => {
															setIsPassword(false);
															setName("");
															setEmail("");
														}}
													>
														Back
													</button>{" "}
													Log in to your account
												</DialogTitle>
												<DialogDescription className="text-center text-xs">
													using {email}
												</DialogDescription>
											</DialogHeader>
											<div className="flex flex-col  gap-3">
												<form
													onSubmit={handleLoginCredentials}
													className="flex flex-col gap-3"
												>
													<Label className="text-xs">Password</Label>
													<Input
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														type="password"
													/>
													<Button type="submit">Log in</Button>
												</form>
											</div>
										</DialogContent>
									)}
								</>
							) : (
								<>
									{!isRegisterName ? (
										<>
											<DialogContent className="bg-white text-black sm:max-w-md">
												<DialogHeader className="text-center">
													<DialogTitle className="text-center">
														<button
															onClick={() => {
																setIsCreateAccount(false);
																setName("");
																setEmail("");
															}}
														>
															Back
														</button>{" "}
														Create your account
													</DialogTitle>
													<DialogDescription className="text-center text-xs">
														You&apos;re creating a RiseUp account using {email}
													</DialogDescription>
												</DialogHeader>
												<div className="flex flex-col  gap-3">
													<div className="flex flex-col gap-3">
														<Label className="text-xs">Name</Label>
														<Input
															value={registerName}
															onChange={(e) => setRegisterName(e.target.value)}
															type="text"
															placeholder="John Smith"
														/>
														<Button onClick={() => setIsRegisterName(true)}>
															Continue
														</Button>
													</div>
												</div>
											</DialogContent>
										</>
									) : (
										<DialogContent className="bg-white text-black sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="text-center">
													<button
														onClick={() => {
															setIsRegisterName(false);
															setRegisterPassword("");
														}}
													>
														Back
													</button>{" "}
													Create your password
												</DialogTitle>
												<DialogDescription className="text-center text-xs">
													You&apos;re creating a RiseUp password for {email}
												</DialogDescription>
											</DialogHeader>
											<div className="flex flex-col  gap-3">
												<form
													onSubmit={handleCreateAccountWithEmail}
													className="flex flex-col gap-3"
												>
													<Label className="text-xs">Password</Label>
													<Input
														value={registerPassword}
														onChange={(e) =>
															setRegisterPassword(e.target.value)
														}
														type="password"
													/>
													<Button type="submit">Continue</Button>
												</form>
											</div>
										</DialogContent>
									)}
								</>
							)}
						</>
					)}
				</Dialog>
			)}
		</div>
	);
};
export default SignInDialog;
