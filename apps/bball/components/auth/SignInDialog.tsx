"use client";

import { Button } from "@ui/components/button";
import { signIn } from "next-auth/react";
import { Sheet, SheetClose, SheetContent } from "@ui/components/sheet";
import { useState, useEffect } from "react";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { redirect, useRouter } from "next/navigation";
import LeftChevronIcon from "../icons/LeftChevronIcon";
import EmailIcon from "../general/icons/EmailIcon";
import GoogleIcon from "../general/icons/GoogleIcon";
import Link from "next/link";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@ui/components/dialog";

const SignInDialog = ({ open, onOpenChange }): JSX.Element => {
	const router = useRouter();
	const [isEmail, setIsEmail] = useState(false);
	const [isCreateAccount, setIsCreateAccount] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
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

			if (user) {
				setIsPassword(true);
			} else {
				const regex = /@gmail/i;

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

		if (registerName && registerPassword && email) {
			const resSignUp = await fetch("/api/register", {
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

			if (resSignUp.ok) {
				const { email, password } = await resSignUp.json();

				const resLogin = await signIn("credentials", {
					email,
					password,
					redirect: false,
				});
				if (resLogin.ok) {
					router.push("/");
				}
			}
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

	const handleGoogleSignIn = () => {
		// TODO: figure out if in-app browser here
		signIn("google");
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
							<section className="gap-4 p-6 shadow-lg duration-200 sm:max-w-md sm:rounded-lg sm:border sm:bg-white sm:text-black md:w-full">
								<header className="flex flex-col space-y-3 text-center sm:space-y-1.5  sm:text-left">
									<h3 className="flex items-center justify-center gap-1 text-center text-lg font-semibold leading-none tracking-tight sm:gap-5">
										<SheetClose>
											<LeftChevronIcon />
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
								<div className="my-5 flex  flex-col gap-3 ">
									<Button variant="signIn" onClick={handleGoogleSignIn}>
										<GoogleIcon />
										Continue With Google
									</Button>
									<Button variant="signIn" onClick={() => setIsEmail(true)}>
										<EmailIcon />
										Continue With Email
									</Button>
								</div>
								<footer className="flex flex-col-reverse text-center sm:flex-row sm:justify-start  sm:space-x-2">
									<p className="text-xs">
										By continuing, you agree to Rise Up League&apos;s{" "}
										<Link href="/terms-and-conditions" className="underline">
											Terms and Conditions.{" "}
										</Link>{" "}
										Read our{" "}
										<Link href="/refund-policy" className="underline">
											Refund Policy.
										</Link>
									</p>
								</footer>
							</section>
						) : (
							<>
								{!isCreateAccount ? (
									<>
										{!isPassword ? (
											<section className="  gap-4 p-6 shadow-lg duration-200 sm:max-w-md sm:rounded-lg sm:border sm:bg-white sm:text-black md:w-full">
												<header className="flex flex-col space-y-3 text-center sm:space-y-1.5  sm:text-left">
													<h3 className="flex items-center justify-center gap-1 text-center text-lg font-semibold leading-none tracking-tight sm:gap-5">
														<button
															onClick={() => {
																setIsEmail(false);
																setName("");
																setEmail("");
															}}
														>
															<LeftChevronIcon />
														</button>{" "}
														Continue with your email
													</h3>
													<p className="text-muted-foreground text-center text-xs">
														We&apos;ll check if you have an account, and help
														create one if you don&apos;t.
													</p>
												</header>
												<div className="mt-6 flex  flex-col gap-3">
													<form
														onSubmit={handleEmailValidation}
														className="font-barlow flex flex-col gap-3"
													>
														<Label className="text-xs">Email Address</Label>
														<Input
															value={email}
															onChange={(e) => setEmail(e.target.value)}
															type="email"
															placeholder="john@example.com"
															className="text-black sm:text-white"
														/>
														<Button variant="signIn" type="submit">
															Continue
														</Button>
													</form>
												</div>
											</section>
										) : (
											<section className="gap-4 p-6 shadow-lg duration-200 sm:max-w-md sm:rounded-lg sm:border sm:bg-white sm:text-black md:w-full">
												<header className="flex flex-col space-y-3 text-center sm:space-y-1.5  sm:text-left">
													<h3 className="flex items-center justify-center gap-1 text-center text-lg font-semibold leading-none tracking-tight sm:gap-5">
														<button
															onClick={() => {
																setIsPassword(false);
																setName("");
																setEmail("");
															}}
														>
															<LeftChevronIcon />
														</button>{" "}
														Log in to your account
													</h3>
													<p className="text-muted-foreground text-center text-xs">
														using {email}
													</p>
												</header>
												<div className="mt-6 flex  flex-col gap-3">
													<form
														onSubmit={handleLoginCredentials}
														className="flex flex-col gap-3"
													>
														<Label className="text-xs">Password</Label>
														<Input
															value={password}
															onChange={(e) => setPassword(e.target.value)}
															type="password"
															className="text-black sm:text-white"
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
						<DialogContent className=" bg-neutral-800 text-neutral-50 sm:max-w-md">
							<DialogHeader className="text-center">
								<DialogTitle className="flex items-center justify-center gap-1 text-center text-2xl text-neutral-300">
									<DialogClose className="transition-all hover:opacity-80">
										<LeftChevronIcon />
									</DialogClose>{" "}
									Log in or sign up in seconds
								</DialogTitle>
								{!useGoogle ? (
									<DialogDescription className="text-center text-sm md:text-lg">
										Use your gmail or another email to continue.
									</DialogDescription>
								) : (
									<DialogDescription className="text-primary text-center text-xs">
										Please use your google account instead.
									</DialogDescription>
								)}
							</DialogHeader>
							<div className="flex flex-col  gap-3">
								<Button variant="signIn" onClick={handleGoogleSignIn}>
									<GoogleIcon />
									Continue With Google
								</Button>
								<Button variant="signIn" onClick={() => setIsEmail(true)}>
									<EmailIcon />
									Continue With Email
								</Button>
							</div>
							<DialogFooter className="mt-6 text-center text-neutral-300 sm:justify-start">
								<DialogDescription className="text-xs">
									By continuing, you agree to Rise Up League&apos;s{" "}
									<SheetClose>
										<Link
											href="/terms-and-conditions"
											className="underline transition-all hover:text-neutral-50"
										>
											Terms and Conditions.{" "}
										</Link>{" "}
									</SheetClose>{" "}
									Read our{" "}
									<SheetClose>
										<Link
											href="/refund-policy"
											className="underline transition-all hover:text-neutral-50"
										>
											Refund Policy.
										</Link>
									</SheetClose>
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
												<DialogTitle className="flex items-center justify-center gap-1 text-center text-2xl text-neutral-300">
													<button
														className="transition-all hover:opacity-80"
														onClick={() => {
															setIsEmail(false);
															setName("");
															setEmail("");
														}}
													>
														<LeftChevronIcon />
													</button>
													Continue with your email
												</DialogTitle>
												<DialogDescription className="text-center text-xs sm:text-base">
													We&apos;ll check if you have an account, and help
													create one if you don&apos;t.
												</DialogDescription>
											</DialogHeader>
											<div className="font-barlow flex flex-col gap-3">
												<form
													onSubmit={handleEmailValidation}
													className="flex flex-col gap-3"
												>
													<Label className="text-xs sm:text-base">
														Email Address
													</Label>
													<Input
														className="text-xs text-neutral-900 sm:text-base"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														type="email"
														placeholder="john@example.com"
													/>
													<Button variant="signIn" type="submit">
														Continue
													</Button>
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
														<LeftChevronIcon />
													</button>{" "}
													Log in to your account
												</DialogTitle>
												<DialogDescription className="text-center text-xs">
													using {email}
												</DialogDescription>
											</DialogHeader>
											<div className="flex flex-col gap-3">
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
															<LeftChevronIcon />
														</button>{" "}
														Create your account
													</DialogTitle>
													<DialogDescription className="text-center text-xs">
														You&apos;re creating a RiseUp account using {email}
													</DialogDescription>
												</DialogHeader>
												<div className="flex flex-col gap-3">
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
														<LeftChevronIcon />
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
