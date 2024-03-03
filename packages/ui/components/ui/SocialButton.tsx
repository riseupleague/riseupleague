import Link from "next/link";

const SocialButton = ({ children, href='/' }): JSX.Element => {
	return (
        <Link href="/" className="flex justify-center items-center size-8 rounded-full bg-[#484848] transition hover:bg-[#6787E7] px-2 py-2">
			{children}
        </Link>
	);
};

export default SocialButton;
