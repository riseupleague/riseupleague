"use client";

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
import Link from "next/link";

const CustomerTable = ({ users }) => {
	return (
		<Table className="text-lg">
			<TableCaption className="text-base text-neutral-300">
				{users.length} customers found.
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-left text-lg">Name</TableHead>
					<TableHead className="text-left text-lg">Email</TableHead>
					<TableHead className="text-left text-lg">Type</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Updated At</TableHead>
					<TableHead className="text-left text-lg">Basketball</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users
					.sort((a, b) => (a.name > b.name ? 1 : -1))
					.map((user, index) => (
						<TableRow key={index}>
							<TableCell className="text-left text-lg">
								<Link
									href={`/customer-management/${user?._id}`}
									className="capitalize transition-all hover:text-neutral-400 hover:underline"
								>
									{user?.name}
								</Link>
							</TableCell>
							<TableCell className="text-left text-lg">{user?.email}</TableCell>
							<TableCell className="text-left text-lg">{user?.type}</TableCell>
							<TableCell>
								{format(new Date(user?.createdAt), "MMM do, yyyy @ h:mm a")}
							</TableCell>
							<TableCell>
								{format(new Date(user?.updatedAt), "MMM do, yyyy @ h:mm a")}
							</TableCell>
							<TableCell className="text-left text-lg">
								{user?.basketball ? "Yes" : "No"}
							</TableCell>
						</TableRow>
					))
					.slice(0, 10)}
			</TableBody>
		</Table>
	);
};

export default CustomerTable;
