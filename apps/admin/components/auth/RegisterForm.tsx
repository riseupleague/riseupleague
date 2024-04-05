"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			setError("All fields are necessary.");
			return;
		}

		try {
			const resWorkerExists = await fetch("api/workerExists", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const { worker } = await resWorkerExists.json();

			if (worker) {
				setError("Worker already exists.");
				return;
			}

			const res = await fetch("api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (res.ok) {
				const form = e.target;
				form.reset();
				router.push("/");
			} else {
				console.log("Worker registration failed.");
			}
		} catch (error) {
			console.log("Error during registration: ", error);
		}
	};

	return (
		<div className="grid h-screen place-items-center">
			<div className="rounded-lg border-t-4 border-green-400 p-5 shadow-lg">
				<h1 className="my-4 text-xl font-bold">Register</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<input
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Full Name"
					/>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<button className="cursor-pointer bg-green-600 px-6 py-2 font-bold text-white">
						Register
					</button>

					{error && (
						<div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
							{error}
						</div>
					)}

					<Link className="mt-3 text-right text-sm" href={"/"}>
						Already have an account? <span className="underline">Login</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
