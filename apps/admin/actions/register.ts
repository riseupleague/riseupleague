"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getWorkerByEmail } from "@/api-helpers/controllers/workers-controller";

import Worker from "@/api-helpers/models/Worker";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { name, email, password, type } = validatedFields.data;
	console.log(name, email, password, type);

	const resExistingWorker = await getWorkerByEmail(email);
	const { worker } = await resExistingWorker.json();
	if (worker) {
		return { error: "Email already in use!" };
	}

	// Create a new user document with hashed password
	const newWorker = new Worker({
		name: name,
		email,
		password: password, // Save hashed password
		type: type,
	});

	// Save the user to the database
	await newWorker.save();

	return { success: "Account created!" };
};
