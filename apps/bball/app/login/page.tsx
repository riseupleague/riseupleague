import Login from "@/components/login/Login";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	const session = await getServerSession();

	if (session || session?.user) {
		redirect("/");
	}

	return (
		<div className="font-barlow container  mx-auto min-h-[100dvh] text-black">
			<Login />
		</div>
	);
}
