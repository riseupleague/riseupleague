import Link from "next/link";
import fb from "/public/images/vball/fb.png";
import ig from "/public/images/vball/Instagram.png";
import yt from "/public/images/vball/Yt.png";
import Image from "next/image";

const TopHeader = (): JSX.Element => {
	return (
		<nav>
			<div className="font-barlow bg-background: #04080F border-gray-200; container mx-auto grid grid-cols-2 border-b py-4 uppercase lg:py-4">
				<div className="flex items-center justify-center lg:justify-start">
					<Link
						href="/"
						className="hover:text-primary text-l focus:text-primary mr-8 hidden transition-all hover:opacity-80 focus:underline active:text-red-500 active:underline lg:inline-block"
					>
						RISEUP.COM
					</Link>
					<Link
						href="/"
						className="hover:text-primary text-l focus:text-primary mr-8 hidden transition-all hover:opacity-80 focus:underline active:text-red-500 active:underline lg:inline-block"
					>
						BASKETBALL
					</Link>
					<Link
						href="/"
						className="hover:text-primary text-l focus:text-primary hidden transition-all hover:opacity-80 focus:underline active:text-red-500 active:underline lg:inline-block"
					>
						VOLLEYBALL
					</Link>
				</div>
				<div className="flex items-center justify-end">
					<Link
						href="https://www.facebook.com/riseup.bball"
						className="flex size-8 items-center justify-center px-2 py-2"
					>
						<Image src={fb} alt="fb logo" />
					</Link>
					<Link
						href="https://www.instagram.com/riseup.bball/"
						className="flex size-8 items-center justify-center px-2 py-2"
					>
						<Image src={ig} alt="ig logo" />
					</Link>
					<Link
						href="https://www.youtube.com/@RiseUPBasketballLeagueMedia/videos"
						className="flex size-8 items-center justify-center px-2 py-2"
					>
						<Image src={yt} alt="yt logo" />
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default TopHeader;
