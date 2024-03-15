"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Progress } from "@ui/components/progress";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SignInDialog from "../auth/SignInDialog";
import { heroSlides } from "@/lib/data/home/heroSlides";
import Image from "next/image";

const Hero = (): JSX.Element => {
	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};
	const { status, data: session } = useSession();

	// State to track the active slide index
	const [activeSlide, setActiveSlide] = useState(0);

	var settings = {
		afterChange: (index) => {
			// Update the active slide index when the slide changes
			setActiveSlide(index);
		},
		customPaging: function (i) {
			const isActive = i === activeSlide;

			return (
				<a>
					<div
						className={`relative flex-1 cursor-pointer text-xl uppercase ${
							isActive ? "text-primary" : "text-gray-500"
						}`}
					>
						<div
							className={`${isActive ? "bg-primary" : "bg-secondary"} relative h-2 w-full overflow-hidden rounded-full`}
						/>
						<p className="font-barlow  text-center  ">{heroSlides[i].title}</p>
					</div>
				</a>
			);
		},
		dots: true,
		dotsClass: "!grid gap-4 grid-cols-4 mt-6 mb-16",
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true, // Enable auto-play
		autoplaySpeed: 3000, // Set auto-play speed in milliseconds
	};
	return (
		<section className="group relative my-16  h-[450px] w-full sm:h-[650px] lg:my-16">
			<Slider {...settings}>
				{heroSlides.map((slide, index) => {
					return (
						<div
							key={index}
							className="repeat-0 relative h-full w-full items-center bg-cover bg-center duration-500"
						>
							<div
								// style={{ backgroundImage: `url(${slide.url})` }}
								className="flex h-full  w-full items-end bg-opacity-80 bg-gradient-to-t from-black via-transparent px-5 pb-10   sm:items-center sm:bg-gradient-to-r sm:via-black sm:pb-0"
							>
								<Image
									src={slide.url}
									alt={slide.title}
									layout="fill"
									objectFit="cover"
									className="absolute inset-0 -z-10 h-full bg-gradient-to-b opacity-50"
								/>

								<div className="flex  h-[450px] flex-col justify-center sm:h-[650px]">
									<h1 className="text-left">{slide.title}</h1>
									<p>{slide.description}</p>
									<div className="relative z-10 my-4">
										{slide.link === "/register?info=true" ? (
											<>
												{!session || !session.user ? (
													<Button onClick={openDialog}>{slide.cta}</Button>
												) : (
													<Link href={slide.link} target="_blank">
														{slide.cta !== "" ? (
															<Button>{slide.cta}</Button>
														) : (
															""
														)}
													</Link>
												)}
											</>
										) : (
											<Link href={slide.link} target="_blank">
												{slide.cta !== "" ? <Button>{slide.cta}</Button> : ""}
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>

			<SignInDialog open={open} onOpenChange={setOpen} />
		</section>
	);
};

export default Hero;
