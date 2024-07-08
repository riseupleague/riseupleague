"use server";

import User from "@/api-helpers/models/User";
import { connectToDatabase } from "@/api-helpers/utils";
import {
	createUserSchema,
	userEmailSchema,
} from "@/validation/user-validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

/**
 * Finds a user in the database based on the provided email.
 *
 * @param {FormData} formData - The form data containing the email.
 * @return {Promise<{status: number, message: string, errors?: Record<string, string>}>} - A promise that resolves to an object with the status code, message, and optional errors.
 * - If the email is invalid, the status code is 422 and the message is "Invalid email." with the field errors.
 * - If the user is not found, the status code is 404 and the message is "User not found. Please try a different email.".
 * - If there is an error connecting to the database or retrieving the user, the status code is 500 and the message is "Internal server error.".
 * - If the user is found, the status code is 200 and the message is "Success".
 */
export const findUser = async (formData: FormData) => {
	try {
		await connectToDatabase();

		const email = formData.get("email").toString();

		if (email.includes("@gmail")) {
			return {
				status: 422,
				message: "Please use Gmail method above when using a Gmail account.",
			};
		}

		const validatedEmail = userEmailSchema.safeParse(email);

		//  invalid email
		if (validatedEmail.success === false) {
			const errors = validatedEmail.error.flatten().fieldErrors;

			return {
				status: 422,
				message: "Invalid email.",
				errors: errors,
			};
		}

		const user = await User.findOne({ email });

		if (!user) {
			return {
				status: 404,
				message: "User not found. Please try a different email.",
			};
		}

		revalidatePath("/");

		return { status: 200, message: "Success" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal server error." };
	}
};

/**
 * Creates a new user based on the provided form data.
 *
 * @param {FormData} formData - The form data containing user information.
 * @return {Promise<{status: number, message: string}>} A promise that resolves to an object with the status code and message indicating the success or failure of user creation.
 */
export const createUser = async (formData: FormData) => {
	try {
		await connectToDatabase();

		const rawUserData = {
			email: formData.get("email").toString(),
			password: formData.get("password").toString(),
			name: formData.get("name").toString(),
		};

		const validatedUser = createUserSchema.safeParse(rawUserData);
		if (validatedUser.success === false) {
			const errors = validatedUser.error.flatten().fieldErrors;

			return {
				status: 422,
				message: "Invalid fields provided. Please see errors below.",
				errors: errors,
			};
		}

		const hashedPassword = await bcrypt.hash(rawUserData.password, 10);

		const newUser = new User({
			name: rawUserData.name,
			email: rawUserData.email,
			password: hashedPassword,
			type: "email",
		});

		await newUser.save();

		revalidatePath("/");

		return { status: 201, message: "Success" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal server error." };
	}
};
