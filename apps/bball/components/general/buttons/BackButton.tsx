import Link from "next/link";

interface BackButtonProps {
	href: string;
	onClick?: () => void;
}

const BackButton = ({ href, onClick }: BackButtonProps) => (
	<Link
		href={href}
		onClick={onClick}
		className="my-2 flex items-center gap-3 text-xl text-neutral-300"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="20"
			viewBox="0 0 15 20"
			fill="none"
		>
			<path
				d="M8.125 16.25L1.875 10L8.125 3.75"
				stroke="#ABAFB3"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		Back
	</Link>
);

export default BackButton;
