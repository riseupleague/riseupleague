import { connectToDatabase } from "@/api-helpers/utils";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import ChooseTeam from "@/components/register/join-team/ChooseTeam";

export default async function JoinTeam({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const resDivision = await getRegisterDivisionById(params.id);
	const { division } = await resDivision.json();

	console.log(division);
	return (
		<main className="font-barlow container  mx-auto my-10 min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-right text-7xl font-semibold uppercase text-neutral-700 md:mt-20 md:text-center  md:text-white">
				Join a team
			</h1>

			<ChooseTeam division={division} />
		</main>
	);
}
