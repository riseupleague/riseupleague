import Link from "next/link";
import fb from "/public/images/vball/fb.png";
import ig from "/public/images/vball/Instagram.png";
import yt from "/public/images/vball/Yt.png";
import Image from "next/image";

const TopHeader = (): JSX.Element => {
	return (
		<nav>
		<div className="container mx-auto grid grid-cols-2 py-4 lg:py-4 font-barlow uppercase bg-background: #04080F border-b border-gray-200;">
			<div className="flex items-center justify-center lg:justify-start">
					<Link href="/" className="hidden hover:opacity-80 lg:inline-block hover:text-primary text-l transition-all mr-8 focus:text-primary focus:underline active:text-red-500 active:underline">RISEUP.COM</Link>
					<Link href="/" className="hidden hover:opacity-80 lg:inline-block hover:text-primary text-l transition-all mr-8 focus:text-primary focus:underline active:text-red-500 active:underline">BASKETBALL</Link>
					<Link href="/" className="hidden hover:opacity-80 lg:inline-block hover:text-primary text-l transition-all focus:text-primary focus:underline active:text-red-500 active:underline">VOLLEYBALL</Link>
			</div>
			<div className="flex items-center justify-end">
				<Link href="https://www.facebook.com/riseup.bball" className="flex size-8 items-center justify-center px-2 py-2">
					<Image src={fb} alt="fb logo"/>
				</Link>
				<Link href="https://www.instagram.com/riseup.bball/" className="flex size-8 items-center justify-center px-2 py-2">
					<Image src={ig} alt="ig logo" />
				</Link>
				<Link href="https://www.youtube.com/@RiseUPBasketballLeagueMedia/videos" className="flex size-8 items-center justify-center px-2 py-2">
					<Image src={yt} alt="yt logo" />
				</Link>
			</div>
		</div>
	</nav>
	);
};

export default TopHeader;