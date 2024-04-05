"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (res.error) {
				setError("Invalid Credentials");
				return;
			}

			router.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
			<div className="w-full  rounded-lg border border-gray-700 bg-neutral-900 shadow sm:max-w-md md:mt-0 xl:p-0">
				<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
					<h1 className="font-oswald text-xl font-bold leading-tight  tracking-tight text-white md:text-2xl">
						Sign in
					</h1>
					<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="mb-2 block text-sm font-medium  text-white"
							>
								Email
							</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								name="email"
								id="email"
								className=" focus:ring-primary-600   focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
								placeholder="name@company.com"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="mb-2 block text-sm font-medium  text-white"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								onChange={(e) => setPassword(e.target.value)}
								id="password"
								placeholder="••••••••"
								className=" focus:ring-primary-600   focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
								required
							/>
						</div>

						<Button type="submit" className="mt-10 w-full">
							{" "}
							Sign in
						</Button>
						{error && (
							<div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
								{error}
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
