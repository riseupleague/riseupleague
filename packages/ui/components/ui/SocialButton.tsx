import Link from "next/link";

const SocialButton = ({ children, href = "/" }: any): JSX.Element => {
	return (
		<Link
			href={href}
			className="flex size-8 items-center justify-center rounded-full bg-[#484848] px-2 py-2 transition hover:bg-[#6787E7]"
		>
			{children}
		</Link>
	);
};

export default SocialButton;
