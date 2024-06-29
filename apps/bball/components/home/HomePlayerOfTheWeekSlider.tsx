"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerOfTheGameCard from "../general/PlayerOfTheGameCard";

const HomePlayerOfTheWeekSlider = ({ playerOfTheGames }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
		],
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	return (
		<div>
			<Slider {...settings}>
				{playerOfTheGames?.map((player, index) => (
					<PlayerOfTheGameCard player={player} key={index} />
				))}
			</Slider>
		</div>
	);
};

export default HomePlayerOfTheWeekSlider;
