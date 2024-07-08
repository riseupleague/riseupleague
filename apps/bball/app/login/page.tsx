import { connectToDatabase } from "@/api-helpers/utils";
import Login from "@/components/auth/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	await connectToDatabase();

	const session = await getServerSession();
	if (session !== null) redirect("/");

	return (
		<section className="font-barlow container mx-auto">
			<h1>Login or Sign Up</h1>

			<Login />
		</section>
	);
};

export default LoginPage;
