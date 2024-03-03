import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import Image from "next/image";
import logo from "../../bball/public/images/vball/riseup_volleyball.png"
import vballImg from "../../bball/public/images/vball/img.png"
import fb from "../../bball/public/images/vball/fb.png"
import ig from "../../bball/public/images/vball/Instagram.png"
import twitter from "../../bball/public/images/vball/t.png"
import yt from "../../bball/public/images/vball/Yt.png"
import Link from "next/link";
import SocialButton from "@ui/components/SocialButton";

const VballNewsLetter = (): JSX.Element => {
	return (
		<section className="container mx-auto flex h-dvh items-center">

			<div className="w-full md:w-1/2 md:h-3/4 md:mb-[100px] space-y-[36px] px-[60px] bg-white">		
				<Image src={logo} alt="Rise Up Logo"/>

				<h1 className="text-[61px] font-medium leading-[73px] text-left text-black w-[461px] h-[146px] top-[165px] left-[70px]">
	 				OUR NEW WEBSITE IS ON THE WAY.
				</h1>

				<p className="text-[24px] font-normal leading-[36px] text-left text-black w-[461px] h-[36px] top-[335px] left-[70px]">
					Sign up to be the first to know when we launch!
				</p>

				<Input type="text" placeholder="Enter your email" className="text-[14px] font-normal leading-[21px] text-left text-[#111827] top-[421px] left-[70px] rounded-[6px] p-[16px] pl-[20px] pr-[20px]"/>

				<Button className="w-full bg-[#555B64] text-white" asChild>
					<Link href="/">Notify Me</Link>
				</Button>
				
				<div className="flex gap-4 pb-4 mb-16">
					<SocialButton href="https://www.facebook.com/riseup.bball">
						<Image src={fb} alt="fb logo"/>
					</SocialButton>
					<SocialButton>
						<Image src={twitter} alt="twitter logo"/>
					</SocialButton>
					<SocialButton href="https://www.instagram.com/riseup.vball/">
						<Image src={ig} alt="ig logo"/>
					</SocialButton>
					<SocialButton href="https://www.youtube.com/@RiseUPBasketballLeagueMedia">
						<Image src={yt} alt="yt logo"/>
					</SocialButton>
				</div>
			</div>

			<div className="hidden md:block w-full md:w-1/2">
				<Image src={vballImg} alt="Cover" />
			</div>

		</section>
	);
};

export default VballNewsLetter;
