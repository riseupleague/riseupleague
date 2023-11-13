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
} from "@ui/components/dialog";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
} from "@ui/components/sheet";
import { useState, useEffect } from "react";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const SignInDialog = ({ open, onOpenChange }) => {
	const router = useRouter();
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
	const [isSmallScreen, setIsSmallScreen] = useState(false);

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

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Call handleResize on initial mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<>
			{isSmallScreen ? (
				<Sheet open={open} onOpenChange={onOpenChange}>
					<SheetContent side="bottom" className="h-full w-full bg-neutral-900">
						{!isEmail ? (
							<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full">
								<header className="flex flex-col space-y-1.5 text-center sm:text-left">
									<h3 className="flex items-center justify-center text-center text-lg font-semibold leading-none tracking-tight">
										<SheetClose>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
											>
												<path
													d="M14.4 18L8.39999 12L14.4 6"
													stroke="#ABAFB3"
													strokeWidth="1.67"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</SheetClose>
										Log in or sign up in seconds
									</h3>
									{!useGoogle ? (
										<p className="text-muted-foreground text-center text-xs">
											Use your gmail or another email to continue.
										</p>
									) : (
										<p className="text-primary text-center text-xs">
											Please use your google account instead.
										</p>
									)}
								</header>
								<div className="flex flex-col  gap-3">
									<Button onClick={() => signIn("google")}>
										Continue With Google
									</Button>
									<Button onClick={() => setIsEmail(true)}>
										Continue With Email
									</Button>
								</div>
								<footer className="flex flex-col-reverse text-center sm:flex-row sm:justify-start  sm:space-x-2">
									<p className="text-xs">
										By continuing, you agree to Rise Up League&apos;s{" "}
										<Link href={"/terms"} className="underline">
											Terms of Use.
										</Link>{" "}
										Read our{" "}
										<Link href="/privacy" className="underline">
											Privacy Policy.
										</Link>
									</p>
								</footer>
							</section>
						) : (
							<>
								{!isCreateAccount ? (
									<>
										{!isPassword ? (
											<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full">
												<header className="flex flex-col space-y-1.5 text-center sm:text-left">
													<h3 className="text-center text-lg font-semibold leading-none tracking-tight">
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
													</h3>
													<p className="text-muted-foreground text-center text-xs">
														We&apos;ll check if you have an account, and help
														create one if you don&apos;t.
													</p>
												</header>
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
											</section>
										) : (
											<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full">
												<header className="flex flex-col space-y-1.5 text-center sm:text-left">
													<h3 className="text-center text-lg font-semibold leading-none tracking-tight">
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
													</h3>
													<p className="text-muted-foreground text-center text-xs">
														using {email}
													</p>
												</header>
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
											</section>
										)}
									</>
								) : (
									<>
										{!isRegisterName ? (
											<>
												<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full ">
													<header className="flex flex-col space-y-1.5 text-center sm:text-left">
														<h3 className="text-center text-lg font-semibold leading-none tracking-tight">
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
														</h3>
														<p className="text-muted-foreground text-center text-xs">
															You&apos;re creating a RiseUp account using{" "}
															{email}
														</p>
													</header>
													<div className="flex flex-col  gap-3">
														<div className="flex flex-col gap-3">
															<Label className="text-xs">Name</Label>
															<Input
																value={registerName}
																onChange={(e) =>
																	setRegisterName(e.target.value)
																}
																type="text"
																placeholder="John Smith"
															/>
															<Button onClick={() => setIsRegisterName(true)}>
																Continue
															</Button>
														</div>
													</div>
												</section>
											</>
										) : (
											<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full">
												<header className="flex flex-col space-y-1.5 text-center sm:text-left">
													<h3 className="text-center text-lg font-semibold leading-none tracking-tight">
														<button
															onClick={() => {
																setIsRegisterName(false);
																setRegisterPassword("");
															}}
														>
															Back
														</button>{" "}
														Create your password
													</h3>
													<p className="text-muted-foreground text-center text-xs">
														You&apos;re creating a RiseUp password for {email}
													</p>
												</header>
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
											</section>
										)}{" "}
									</>
								)}
							</>
						)}
					</SheetContent>
				</Sheet>
			) : (
				<Dialog open={open} onOpenChange={onOpenChange}>
					{!isEmail ? (
						<DialogContent className=" bg-neutral-800 text-white sm:max-w-md">
							<DialogHeader className="text-center">
								<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
									<DialogClose>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
										>
											<path
												d="M14.4 18L8.39999 12L14.4 6"
												stroke="#ABAFB3"
												strokeWidth="1.67"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</DialogClose>{" "}
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
										<DialogContent className=" bg-neutral-800 text-white sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
													<button
														onClick={() => {
															setIsEmail(false);
															setName("");
															setEmail("");
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
														>
															<path
																d="M14.4 18L8.39999 12L14.4 6"
																stroke="#ABAFB3"
																strokeWidth="1.67"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</button>
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
														className="text-black"
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
										<DialogContent className=" bg-neutral-800 text-white sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
													<button
														onClick={() => {
															setIsPassword(false);
															setName("");
															setEmail("");
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
														>
															<path
																d="M14.4 18L8.39999 12L14.4 6"
																stroke="#ABAFB3"
																strokeWidth="1.67"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
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
														className="text-black"
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
											<DialogContent className=" bg-neutral-800 text-white sm:max-w-md">
												<DialogHeader className="text-center">
													<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
														<button
															onClick={() => {
																setIsCreateAccount(false);
																setName("");
																setEmail("");
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none"
															>
																<path
																	d="M14.4 18L8.39999 12L14.4 6"
																	stroke="#ABAFB3"
																	strokeWidth="1.67"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
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
															className="text-black"
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
										<DialogContent className=" bg-neutral-800 text-white sm:max-w-md">
											<DialogHeader className="text-center">
												<DialogTitle className="flex items-center justify-center gap-5 text-center text-neutral-300">
													<button
														onClick={() => {
															setIsRegisterName(false);
															setRegisterPassword("");
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
														>
															<path
																d="M14.4 18L8.39999 12L14.4 6"
																stroke="#ABAFB3"
																strokeWidth="1.67"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
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
														className="text-black"
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
		</>
	);
};
export default SignInDialog;
