import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const SocialCard = ({ link, text, icon }): JSX.Element => {
	return (
		<div className="flex items-center justify-between rounded-sm border border-neutral-600 bg-neutral-800 transition hover:opacity-80">
			<Link
				href={link}
				className="flex h-full items-center bg-neutral-600 p-4 transition hover:opacity-80"
			>
				{icon}
			</Link>
			<div className="flex flex-1 items-center justify-between pl-4 pr-2">
				<Link
					href={link}
					className="font-barlow w-full py-4 text-sm uppercase transition hover:opacity-80 md:text-base"
				>
					{text}
				</Link>
				<Link
					href={link}
					target="_blank"
					className="transition hover:opacity-80"
				>
					<FaChevronRight />
				</Link>
			</div>
		</div>
	);
};

export default SocialCard;
