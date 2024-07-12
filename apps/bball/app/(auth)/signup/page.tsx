import { connectToDatabase } from "@/api-helpers/utils";
import SignUp from "@/components/auth/SignUp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
	await connectToDatabase();

	try {
		const session = await getServerSession();
		if (session) redirect("/");
	} catch (e) {
		console.log(e);
	}

	return (
		<section className="font-barlow container mx-auto">
			<h1>Create a new account</h1>

			<SignUp />
		</section>
	);
};

export default SignUpPage;
