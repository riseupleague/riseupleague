"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Button } from "@ui/components/button";

const Login = (): JSX.Element => {
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
				callbackUrl: "/",
			});

			if (res.error) {
				alert("wrong credentials");
				return;
			}
		} catch (error) {}
	};

	return (
		<div className="font-barlow container mx-auto flex min-h-[100dvh] items-center justify-center text-black">
			{!isEmail ? (
				<section className=" gap-4 border bg-white p-6 text-black shadow-lg duration-200 sm:max-w-md sm:rounded-lg md:w-full">
					<header className="flex flex-col space-y-1.5 text-center sm:text-left">
						<h3 className="text-center text-lg font-semibold leading-none tracking-tight">
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
					{/* <footer className="flex flex-col-reverse text-center sm:flex-row sm:justify-start  sm:space-x-2">
						<p className="text-xs">
							By continuing, you agree to Rise Up League&apos;s{" "}
							<Link href={"/terms-of-use"} className="underline">
								Terms of Use.
							</Link>{" "}
							Read our{" "}
							<Link href="/privacy-policy" className="underline">
								Privacy Policy.
							</Link>
						</p>
					</footer> */}
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
											We&apos;ll check if you have an account, and help create
											one if you don&apos;t.
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
												You&apos;re creating a RiseUp account using {email}
											</p>
										</header>
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
												onChange={(e) => setRegisterPassword(e.target.value)}
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
		</div>
	);
};

export default Login;
