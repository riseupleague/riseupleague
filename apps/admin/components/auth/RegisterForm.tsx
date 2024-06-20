// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
// 	const [name, setName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState("");

// 	const router = useRouter();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		if (!name || !email || !password) {
// 			setError("All fields are necessary.");
// 			return;
// 		}

// 		try {
// 			const resWorkerExists = await fetch("api/workerExists", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ email }),
// 			});

// 			const { worker } = await resWorkerExists.json();

// 			if (worker) {
// 				setError("Worker already exists.");
// 				return;
// 			}

// 			const res = await fetch("api/register", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					name,
// 					email,
// 					password,
// 				}),
// 			});

// 			if (res.ok) {
// 				const form = e.target;
// 				form.reset();
// 				router.push("/");
// 			} else {
// 				console.log("Worker registration failed.");
// 			}
// 		} catch (error) {
// 			console.log("Error during registration: ", error);
// 		}
// 	};

// 	return (
// 		<div className="grid h-screen place-items-center">
// 			<div className="rounded-lg border-t-4 border-green-400 p-5 shadow-lg">
// 				<h1 className="my-4 text-xl font-bold">Register</h1>

// 				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
// 					<input
// 						onChange={(e) => setName(e.target.value)}
// 						type="text"
// 						placeholder="Full Name"
// 					/>
// 					<input
// 						onChange={(e) => setEmail(e.target.value)}
// 						type="text"
// 						placeholder="Email"
// 					/>
// 					<input
// 						onChange={(e) => setPassword(e.target.value)}
// 						type="password"
// 						placeholder="Password"
// 					/>
// 					<button className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white">
// 						Register
// 					</button>

// 					{error && (
// 						<div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
// 							{error}
// 						</div>
// 					)}

// 					<Link className="mt-3 text-right text-sm" href={"/"}>
// 						Already have an account? <span className="underline">Login</span>
// 					</Link>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }

"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			type: "worker",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonHref="/auth/login"
			backButtonLabel="Alerady have an account?"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-neutral-700 "
											disabled={isPending}
											placeholder="John Doe"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-neutral-700 "
											disabled={isPending}
											placeholder="John Doe"
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
						Create an account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
