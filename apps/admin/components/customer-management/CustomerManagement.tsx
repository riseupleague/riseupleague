"use client";

import { useState } from "react";
import CustomerTable from "./CustomerTable";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import AddCustomer from "./AddCustomer";

const CustomerManagement = ({ users }) => {
	const [currentUsers, setCurrentUsers] = useState(users);

	const handleSearch = (e) => {
		const searchValue = e.target.value.toLowerCase();

		// empty search
		if (searchValue === "") return setCurrentUsers(users);

		const filteredUsers = users.filter(
			(user) =>
				user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
				user.email.toLowerCase().includes(searchValue.toLowerCase())
		);

		setCurrentUsers(filteredUsers);
	};

	return (
		<section>
			<div className="mb-4 space-y-3">
				<Label>Search Customer (name or email):</Label>
				<Input
					type="search"
					placeholder="Search Customer"
					className="w-full bg-transparent md:w-[350px]"
					onChange={handleSearch}
				/>
			</div>

			<CustomerTable users={currentUsers} />

			<div className="my-6">
				<AddCustomer />
			</div>
		</section>
	);
};

export default CustomerManagement;
