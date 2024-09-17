"use server";
import { connectToDatabase } from "@/api-helpers/utils";
import {
	newPasswordSchema,
	userEmailSchema,
} from "@/validation/user-validations";
import User from "@/api-helpers/models/User";

import crypto from "crypto";
import { ForgotPasswordEmailTemplate } from "@/components/emails/forgot-password";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
const resend = new Resend(process.env.RESEND_API_KEY);

export const newPassword = async (formData: FormData, email: string) => {
	try {
		await connectToDatabase();

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

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return {
				status: 404,
				message: "User not found. Please try a different email.",
			};
		}

		const password = formData.get("password").toString();

		const validatedPassword = newPasswordSchema.safeParse(password);

		//  invalid email
		if (validatedPassword.success === false) {
			const errors = validatedPassword.error.flatten().fieldErrors;

			return {
				status: 422,
				message: "Invalid password.",
				errors: errors,
			};
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		existingUser.password = hashedPassword;
		existingUser.resetToken = undefined;
		existingUser.resetTokenExpiry = undefined;

		existingUser.save();

		revalidatePath("/");

		return { status: 200, message: "Success" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal server error." };
	}
};
