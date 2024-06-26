"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	user: any;
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({
	user,
	children,
	mode = "redirect",
}: LoginButtonProps) => {
	const router = useRouter();
	const onClick = () => {
		if (user) router.push("/league-management");
		else router.push("/auth/login");
	};

	if (mode === "modal") {
		return <span>TODO: Implement modal</span>;
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
