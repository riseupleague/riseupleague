import { connectToDatabase } from "@/api-helpers/utils";
import Footer from "@/components/structure/footer-components/Footer";
import HeaderLogoOnly from "@/components/structure/header-components/HeaderLogoOnly";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	await connectToDatabase();
	return (
		<>
			<HeaderLogoOnly />
			<>{children}</>
			<Footer />
		</>
	);
};

export default AuthLayout;
