import SocialCard from "./socials/SocialCard";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const HomeSocials = (): JSX.Element => {
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
};

const socialLinks = [
	{
		text: "Instagram - @riseup.bball",
		link: "https://www.instagram.com/riseup.bball/",
		icon: <FaInstagram className="size-6" />,
	},
	{
		text: "Instagram (Brampton) - @riseup.brampton",
		link: "https://www.instagram.com/riseup.brampton/",
		icon: <FaInstagram className="size-6" />,
	},
	{
		text: "Instagram (Vaughan) - @riseup.vaughan",
		link: "https://www.instagram.com/riseup.vaughan/",
		icon: <FaInstagram className="size-6" />,
	},
	{
		text: "Instagram (Markham) - @riseup.markham",
		link: "https://www.instagram.com/riseup.markham/",
		icon: <FaInstagram className="size-6" />,
	},
	{
		text: "Instagram (Niagara) - @riseup.niagara",
		link: "https://www.instagram.com/riseup.niagara/",
		icon: <FaInstagram className="size-6" />,
	},
	{
		text: "Youtube - riseup basketball media",
		link: "https://www.youtube.com/@RiseUPBasketballLeagueMedia/videos",
		icon: <FaYoutube className="size-6" />,
	},
	{
		text: "TikTok - @riseupleague",
		link: "https://www.tiktok.com/@riseupleague",
		icon: <FaTiktok className="size-6" />,
	},
];

export default HomeSocials;
