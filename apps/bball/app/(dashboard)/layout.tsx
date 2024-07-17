import { connectToDatabase } from "@/api-helpers/utils";
import Footer from "@/components/structure/footer-components/Footer";
import Header from "@/components/structure/header-components/Header";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	await connectToDatabase();
	return (
		<>
			<Header />
			<>{children}</>

			<Footer />
		</>
	);
};

export default DashboardLayout;
