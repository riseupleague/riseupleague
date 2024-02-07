import SocialCard from "./socials/SocialCard";
import Instagram from "../general/icons/Instagram";
import YouTube from "../general/icons/YouTube";
import TikTok from "../general/icons/TikTok";

export default function HomeSocials(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">socials 📱</h3>
			<hr />
			<div className="my-4 grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-4">
				{socialLinks.map((social, index) => (
					<SocialCard
						link={social.link}
						text={social.text}
						icon={social.icon}
						key={index}
					/>
				))}
			</div>
		</section>
	);
}

const socialLinks = [
	{
		text: "Instagram - @riseup.bball",
		link: "https://www.instagram.com/riseup.bball/",
		icon: <Instagram />,
	},
	{
		text: "Youtube - riseup basketball media",
		link: "https://www.youtube.com/@RiseUPBasketballLeagueMedia/videos",
		icon: <YouTube />,
	},
	{
		text: "TikTok - @riseupleague",
		link: "https://www.tiktok.com/@riseupleague",
		icon: <TikTok />,
	},
];
