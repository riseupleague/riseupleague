import { Card, CardHeader } from "@ui/components/card";
import BackButton from "../../general/buttons/BackButton";
import Link from "next/link";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

const FreeAgentsRegistration = ({ divisions, user }): JSX.Element => {
	return (
		<>
			<BackButton href="/register" />

			<h3 className="mb-6 mt-10 text-3xl font-normal uppercase">
				Pick a city:
			</h3>

			<div className="flex flex-col gap-y-3 sm:gap-y-6">
				{divisions.map((division, index) => (
					<Link href={`/register/free-agent/${division.city}`} key={index}>
						<Card className="rounded-md border border-neutral-600 bg-[#111827] transition-all hover:cursor-pointer hover:bg-neutral-600">
							<CardHeader className="flex flex-row items-center justify-between px-4 py-6 uppercase sm:px-8 sm:py-12">
								<h4 className="my-0 text-2xl">{division.city}</h4>
								<ArrowRightIcon />
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</>
	);
};

export default FreeAgentsRegistration;
