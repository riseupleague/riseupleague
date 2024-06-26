import LoginForm from "@/components/auth/LoginForm";
import { connectToDatabase } from "@/api-helpers/utils";

import { isLoggedIn } from "@/utils/isLoggedIn";

export default async function Login(): Promise<JSX.Element> {
	await connectToDatabase();
	const loggedIn = await isLoggedIn();

	return <LoginForm loggedIn={loggedIn} />;
}
