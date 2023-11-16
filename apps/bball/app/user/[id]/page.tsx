import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";

export default async function Success({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}
	const resPlayer = await getUserPlayerPayment(session.user.email);
	const { players, season } = await resPlayer.json();
	console.log(players);
	const convertToAMPM = (timeString) => {
		const [hours, minutes] = timeString.split(":");
		const date = new Date(2023, 0, 1, hours, minutes); // Assuming year 2023, month 0 (January), day 1

		// Format the time to AM/PM
		const formattedTime = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});

		return formattedTime;
	};

	// Example usage:

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1 className=" mt-10 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
				You have successfully{" "}
			</h1>
			<h2 className=" mt-4 text-center text-lg font-semibold uppercase text-neutral-300 md:text-3xl">
				An email has been sent to {session.user.email}
			</h2>

			<h3 className=" mt-16 text-center text-4xl uppercase md:text-start">
				Season Summary
			</h3>

			<h3 className=" mt-16 text-center text-4xl uppercase md:text-start">
				Registration Next Steps
			</h3>

			<section className="mt-10 flex flex-col gap-10 md:flex-row">
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">Team Jersey</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>
							Customize your team jersey. You decide your own colors and
							designs!
						</p>
					</div>
					<Button className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
						Coming Soon
					</Button>
				</div>
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							Team Schedule
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>You decide on what time your team will play in. </p>{" "}
					</div>
					<Button className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
						Coming Soon
					</Button>
				</div>
			</section>
		</main>
	);
}
