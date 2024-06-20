"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayerOfTheGameCard from "../general/PlayerOfTheGameCard";

const HomePlayerOfTheWeekSlider = ({ playerOfTheGames }) => {
	console.log(playerOfTheGames);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 600, // Adjust the breakpoint value as needed (e.g., for tablets)
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 768, // Adjust the breakpoint value as needed (e.g., for tablets)
				settings: {
					slidesToShow: 2,
				},
			},
		],
		arrows: false,
		autoplay: true, // Enable auto-play
		autoplaySpeed: 2000, // Set auto-play speed in milliseconds
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
