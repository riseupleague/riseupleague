import { getAllUsers } from "@/api-helpers/controllers/users-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import CustomerManagement from "@/components/customer-management/CustomerManagement";

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

export default CustomerManagementPage;
