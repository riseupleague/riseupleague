import Link from "next/link";
import { Button } from "@ui/components/button";

const InstagramRedirect = (): JSX.Element => {
	return (
		<main className="container mx-auto flex min-h-[50dvh] flex-col items-center justify-center gap-4 text-center">
			<p>You are using Instagram&apos;s in-app browser.</p>
			<p>
				Please open this link in your default browser for a better experience!
			</p>

			<Button asChild>
				<Link
					href="https://riseupleague.com"
					target="_blank"
					rel="noreferrer noopener"
				>
					Click Here
				</Link>
			</Button>
		</main>
	);
};

export default InstagramRedirect;
