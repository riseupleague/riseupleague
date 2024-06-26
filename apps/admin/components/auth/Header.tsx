import React from "react";

interface HeaderProps {
	label: string;
}

const Header = ({ label }: HeaderProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-y-5">
			<h1 className="text-3xl font-semibold">RISEUP ADMIN</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	);
};

export default Header;
