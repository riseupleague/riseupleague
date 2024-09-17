"use server";
import { connectToDatabase } from "@/api-helpers/utils";
import { userEmailSchema } from "@/validation/user-validations";
import User from "@/api-helpers/models/User";

import crypto from "crypto";
import { ForgotPasswordEmailTemplate } from "@/components/emails/forgot-password";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resetUserPassword = async (formData: FormData) => {
	try {
		await connectToDatabase();

		const email = formData.get("email").toString();

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

		const resetToken = crypto.randomBytes(20).toString("hex");
		const passwordResetToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		const passwordResetExpires = Date.now() + 3600000;

		user.resetToken = passwordResetToken;
		user.resetTokenExpiry = passwordResetExpires;
		const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}reset-password/${resetToken}`;

		user.save();

		const emails = [email];

		const emailPromises = Array.from(new Set(emails)).map((recipientEmail) => {
			return resend.emails.send({
				from: "Rise Up League <no-reply@riseupleague.com>",
				to: recipientEmail,
				reply_to: "riseupbballleague@gmail.com",
				subject: "Reset your Rise Up League password",
				react: ForgotPasswordEmailTemplate({
					name: user.name,
					link: resetUrl,
				}),
			});
		});

		const responses = await Promise.all(emailPromises);
		revalidatePath("/");

		return { status: 200, message: "Success" };
	} catch (error) {
		console.log(error);
		return { status: 500, message: "Internal server error." };
	}
};
