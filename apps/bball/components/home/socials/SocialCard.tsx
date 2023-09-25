import ChevronRight from "@/components/general/icons/ChevronRight";
import { Card } from "@ui/components/card";
import Link from "next/link";

export default function SocialCard({ link, text, icon }) {
	return (
		<Card className="flex items-center justify-between">
			<Link
				href={link}
				className="flex h-full items-center bg-neutral-600 p-4 transition hover:opacity-80"
			>
				{icon}
			</Link>
			<div className="flex flex-1 items-center justify-between py-4 pl-4 pr-2">
				<Link
					href={link}
					className="font-barlow text-sm uppercase transition hover:opacity-80 md:text-base"
				>
					{text}
				</Link>
				<Link
					href={link}
					target="_blank"
					className="transition hover:opacity-80"
				>
					<ChevronRight />
				</Link>
			</div>
		</Card>
	);
}
