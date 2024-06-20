"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";

import CardWrapper from "./CardWrapper";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { login } from "@/actions/login";
import { signIn } from "next-auth/react";

// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function LoginForm() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");
// 	const { data: session } = useSession();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		try {
// 			const res = await signIn("credentials", {
// 				email,
// 				password,
// 				redirect: false,
// 			});

// 			if (res.error) {
// 				setError("Invalid Credentials");
// 				return;
// 			}

// 			redirect("/");
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	if (session) redirect("/");

// 	return (
// 		<section className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
// 			<div className="w-full  rounded-lg border border-gray-700 bg-neutral-900 shadow sm:max-w-md md:mt-0 xl:p-0">
// 				<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
// 					<h1 className="font-oswald text-xl font-bold leading-tight  tracking-tight text-white md:text-2xl">
// 						Sign in
// 					</h1>
// 					<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
// 						<div>
// 							<label
// 								htmlFor="email"
// 								className="mb-2 block text-sm font-medium  text-white"
// 							>
// 								Email
// 							</label>
// 							<input
// 								onChange={(e) => setEmail(e.target.value)}
// 								type="email"
// 								name="email"
// 								id="email"
// 								className=" focus:ring-primary-600   focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
// 								placeholder="name@company.com"
// 								required
// 							/>
// 						</div>
// 						<div>
// 							<label
// 								htmlFor="password"
// 								className="mb-2 block text-sm font-medium  text-white"
// 							>
// 								Password
// 							</label>
// 							<input
// 								type="password"
// 								name="password"
// 								onChange={(e) => setPassword(e.target.value)}
// 								id="password"
// 								placeholder="••••••••"
// 								className=" focus:ring-primary-600   focus:border-primary-600 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
// 								required
// 							/>
// 						</div>

// 						<Button type="submit" className="mt-10 w-full">
// 							{" "}
// 							Sign in
// 						</Button>
// 						{error && (
// 							<div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
// 								{error}
// 							</div>
// 						)}
// 					</form>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

const LoginForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
		startTransition(async () => {
			try {
				const data = await login(values);
				if (data.error) {
					setError(data.error);
				} else if (data.success) {
					setSuccess(data.success);
				}
			} catch (e) {
				setError("An unexpected error occurred.");
			}
		});
	};
	return (
		<CardWrapper headerLabel="" backButtonHref="" backButtonLabel="">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-neutral-700 "
											disabled={isPending}
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className="bg-neutral-700"
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
