import Link from "next/link";

export default function Header(): JSX.Element {
	return (
		<header className="bg-gray-800">
			<nav className="font-oswald container mx-auto flex justify-between bg-gray-800 py-5 text-gray-300">
				<Link className="hover:opacity-80" href="/">
					Home
				</Link>
				<Link className="hover:opacity-80" href="/register-info">
					Register Info
				</Link>
				<Link className="hover:opacity-80" href="/games">
					Games
				</Link>
				<Link className="hover:opacity-80" href="/edit-all">
					Edit All
				</Link>
			</nav>
		</header>
	);
}
