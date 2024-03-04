import Link from "next/link";

interface BackButtonProps {
	href: string;
}

const BackButton = ({ href }: BackButtonProps) => (
	<Link
		href={href}
		className="group my-2 flex w-fit items-center gap-3 text-xl"
	>
		<svg
			className="translate-y-[1px] stroke-neutral-300 transition-all group-hover:stroke-neutral-200"
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="20"
			viewBox="0 0 15 20"
			fill="none"
		>
			<path
				d="M8.125 16.25L1.875 10L8.125 3.75"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		<span className="text-neutral-300 transition-all group-hover:text-neutral-200">
			Back
		</span>
	</Link>
);

export default BackButton;
