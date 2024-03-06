import Image from "next/image";
import logo from "../../bball/public/images/vball/riseup_volleyball.png";
import vballImg from "../../bball/public/images/vball/img.png";
import fb from "../../bball/public/images/vball/fb.png";
import ig from "../../bball/public/images/vball/Instagram.png";
import yt from "../../bball/public/images/vball/Yt.png";
import SocialButton from "@/components/SocialButton";
import NewsletterForm from "@/components/NewsletterForm";

const VballNewsLetter = async (): Promise<JSX.Element> => {
	console.log("test");

	return (
		<section className="container mx-auto flex h-dvh items-center">
			<div className="flex w-full flex-col justify-center space-y-5 bg-white px-4 sm:px-10 md:h-3/4 md:w-1/2 lg:space-y-9 lg:px-[60px]">
				<Image src={logo} alt="Rise Up Logo" />

				<h1 className="text-left text-[40px] font-medium leading-[50px] text-black lg:text-[61px] lg:leading-[73px] xl:w-5/6">
					OUR NEW WEBSITE IS ON THE WAY.
				</h1>

				<p className="text-left text-2xl font-normal leading-9 text-black">
					Sign up to be the first to know when we launch!
				</p>

				<NewsletterForm />

				<div className="mb-16 flex gap-4 pb-4">
					<SocialButton href="https://www.facebook.com/riseup.bball">
						<Image src={fb} alt="fb logo" />
					</SocialButton>
					<SocialButton href="https://www.instagram.com/riseup.vball/">
						<Image src={ig} alt="ig logo" />
					</SocialButton>
					<SocialButton href="https://www.youtube.com/@RiseUPBasketballLeagueMedia">
						<Image src={yt} alt="yt logo" />
					</SocialButton>
				</div>
			</div>

			<div className="hidden w-full md:block md:w-1/2">
				<Image src={vballImg} alt="Volleyball Image" className="max-h-dvh" />
			</div>
		</section>
	);
};

export default VballNewsLetter;
