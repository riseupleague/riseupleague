import { connectToDatabase } from "@/api-helpers/utils";
import Login from "@/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import crypto from "crypto";
import User from "@/api-helpers/models/User";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
const ResetPasswordTokenPage = async ({
	params,
}: {
	params: { token: string };
}) => {
	await connectToDatabase();
	let userEmail = ""; // Declare userEmail outside of the try block

	try {
		const session = await getServerSession();
		if (session) redirect("/");

		const hashedToken = crypto
			.createHash("sha256")
			.update(params.token)
			.digest("hex");

		const user = await User.findOne({
			resetToken: hashedToken,
			resetTokenExpiry: { $gt: Date.now() },
		});

		if (user) {
			userEmail = user.email; // Set userEmail if the user exists
		} else {
			return (
				<section className="font-barlow container mx-auto">
					<p>
						Invalid Token Or Token Has Expired. Please Make Another Reset
						Password Request.
					</p>
				</section>
			);
		}
	} catch (e) {
		console.log(e);
	}

	return (
		<section className="font-barlow container mx-auto">
			<h1>Login or Sign Up</h1>

			<NewPasswordForm userEmail={userEmail} />
		</section>
	);
};

export default ResetPasswordTokenPage;
