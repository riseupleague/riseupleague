import SocialCard from "./socials/SocialCard";
import Instagram from "../general/icons/Instagram";
import YouTube from "../general/icons/YouTube";

export default function Socials(): JSX.Element {
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
	];

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h2 className="py-2.5 text-3xl uppercase">socials 📱</h2>
			<hr className="border-neutral-600 -mx-2" />
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
