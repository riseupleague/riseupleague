import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import Image from "next/image";
import logo from "../../bball/public/images/vball/riseup_volleyball.png";
import vballImg from "../../bball/public/images/vball/img.png";
import fb from "../../bball/public/images/vball/fb.png";
import ig from "../../bball/public/images/vball/Instagram.png";
import yt from "../../bball/public/images/vball/Yt.png";
import Link from "next/link";
import SocialButton from "@ui/components/SocialButton";

const VballNewsLetter = (): JSX.Element => {
	return (
		<section className="container mx-auto flex h-dvh items-center">
			<div className="w-full space-y-[28px] bg-white px-[16px] sm:px-[40px] md:h-3/4 md:w-1/2 lg:mb-[100px] lg:space-y-[36px] lg:px-[60px]">
				<Image src={logo} alt="Rise Up Logo" />

				<h1 className="text-left text-[40px] font-medium leading-[50px] text-black lg:w-3/4 lg:text-[61px] lg:leading-[73px]">
					OUR NEW WEBSITE IS ON THE WAY.
				</h1>

				<p className="text-left text-[24px] font-normal leading-[36px] text-black">
					Sign up to be the first to know when we launch!
				</p>

				<Input
					type="text"
					placeholder="Enter your email"
					className="rounded-[6px] px-[20px] py-[16px] text-left text-[14px] font-normal leading-[21px] text-[#111827]"
				/>

				<Button className="w-full bg-[#555B64] text-white" asChild>
					<Link href="/">Notify Me</Link>
				</Button>

				<div className="mb-16 flex gap-4 pb-4">
					<SocialButton href="https://www.facebook.com/riseup.bball">
						<Image src={fb} alt="fb logo" />
					</SocialButton>
					{/* <SocialButton>
						<Image src={twitter} alt="twitter logo" />
					</SocialButton> */}
					<SocialButton href="https://www.instagram.com/riseup.vball/">
						<Image src={ig} alt="ig logo" />
					</SocialButton>
					<SocialButton href="https://www.youtube.com/@RiseUPBasketballLeagueMedia">
						<Image src={yt} alt="yt logo" />
					</SocialButton>
				</div>
			</div>

			<div className="hidden w-full md:block md:w-1/2">
				<Image src={vballImg} alt="Cover" />
			</div>
		</section>
	);
};

export default VballNewsLetter;
