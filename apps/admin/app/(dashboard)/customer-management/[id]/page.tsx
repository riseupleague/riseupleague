import { getUserById } from "@/api-helpers/controllers/users-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import EditCustomer from "@/components/customer-management/EditCustomer";
import { Separator } from "@ui/components/separator";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import { format } from "date-fns";
import { Metadata } from "next";

const CustomerManagementPage = async ({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> => {
	await connectToDatabase();

	const resUser = await getUserById(params.id);
	const { user } = await resUser.json();

	return (
		<section>
			<h1>{user?.name}</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<h2 className="mb-0 mt-6">User Details</h2>
			<Table className="my-8 text-lg">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Created At</TableHead>
						<TableHead>Updated At</TableHead>
						<TableHead>Basketball</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>{user?.name}</TableCell>
						<TableCell>{user?.email}</TableCell>
						<TableCell>
							{format(new Date(user?.createdAt), "MMM do, yyyy @ h:mm a")}
						</TableCell>
						<TableCell>
							{format(new Date(user?.updatedAt), "MMM do, yyyy @ h:mm a")}
						</TableCell>
						<TableCell>{user?.basketball ? "Yes" : "No"}</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<EditCustomer user={user} />

			<h2 className="mb-0 mt-6">Basketball Details</h2>
			<Table className="my-8 text-left text-lg">
				<TableCaption className="text-lg text-neutral-300">
					{user?.basketball?.length} season
					{user?.basketball?.length > 1 ? "s" : ""} played
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>IG</TableHead>
						<TableHead>Jersey #</TableHead>
						<TableHead>Jersey Size</TableHead>
						<TableHead>Jersey Name</TableHead>
						<TableHead>Season</TableHead>
						<TableHead>Division</TableHead>
						<TableHead>Team</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{user?.basketball?.map((player, index) => (
						<TableRow key={index}>
							<TableCell>{player?.playerName}</TableCell>
							<TableCell>{player?.instagram}</TableCell>
							<TableCell>{player?.jerseyNumber}</TableCell>
							<TableCell>{player?.jerseySize}</TableCell>
							<TableCell>{player?.jerseyName}</TableCell>
							<TableCell>{player?.season?.seasonName}</TableCell>
							<TableCell>{player?.division?.divisionName}</TableCell>
							<TableCell>{player?.team?.teamName}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up Admin | Customer Management",
};

export default CustomerManagementPage;
