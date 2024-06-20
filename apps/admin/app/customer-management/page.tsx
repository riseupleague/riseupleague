import { getAllUsers } from "@/api-helpers/controllers/users-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import CustomerManagement from "@/components/customer-management/CustomerManagement";
import { Metadata } from "next";

const CustomerManagementPage = async (): Promise<JSX.Element> => {
	await connectToDatabase();

	const resUsers = await getAllUsers();
	const { users } = await resUsers.json();

	return (
		<section>
			<h1>customer management page</h1>

			<CustomerManagement users={users} />
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up Admin | Customer Management",
};

export default CustomerManagementPage;
