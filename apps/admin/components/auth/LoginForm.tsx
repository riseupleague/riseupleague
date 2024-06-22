"use client";
import { useState } from "react";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ loggedIn }) => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, setIsPending] = useState<boolean>(false);
	const router = useRouter();
	console.log("loggedIn:", loggedIn);
	if (loggedIn) router.push("/");
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
		setIsPending(true);

		const validatedFields = LoginSchema.safeParse(values);

		if (!validatedFields.success) {
			return { error: "error message" };
		}
		const { email, password } = validatedFields.data;
		console.log(email, password);
		try {
			const login = await signIn("credentials", {
				email,
				password,
				callbackUrl: "/league-management",
				redirect: false,
			});

			console.log("login:", login);
		} catch (error) {
			console.log(error);
		}

		return {
			success: "success message",
		};
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
											className="bg-neutral-700"
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
					<Button type="submit" className="w-full" disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
