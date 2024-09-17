import { connectToDatabase } from "@/api-helpers/utils";
import ResetPassword from "@/components/auth/ResetPassword";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ResetPasswordPage = async () => {
	await connectToDatabase();

	try {
		const session = await getServerSession();
		console.log("session:", session);
		if (session) redirect("/");
	} catch (e) {
		console.log(e);
	}

	return (
		<section className="font-barlow container mx-auto">
			<h1>Reset Password</h1>

			<ResetPassword />
		</section>
	);
};

export default ResetPasswordPage;
