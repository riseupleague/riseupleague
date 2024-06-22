import LoginForm from "@/components/auth/LoginForm";
import { isLoggedIn } from "@/utils/isLoggedIn";

export default async function LoginPage(): Promise<JSX.Element> {
	const loggedIn = await isLoggedIn();

	return <LoginForm loggedIn={loggedIn} />;
}
