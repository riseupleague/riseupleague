"use client";
import { Progress } from "@ui/components/progress";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { motion } from "framer-motion";
export default function Hero(): JSX.Element {
	const slides = [
		{
			url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
			text: "Why do we use it?",
		},
		{
			url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
			text: "What is Lorem Ipsum?",
		},
		{
			url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
			text: "Where does it come from?",
		},

		{
			url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
			text: "Where can I get some?",
		},
		{
			url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
			text: "Lorem Ipsum?",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [progress, setProgress] = useState(0); // Initialize the progress at 100%
	const [isAnimating, setIsAnimating] = useState(false);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};

	// Autoplay Configuration
	const autoplayDelay = 5000; // Delay between slide changes in milliseconds
	useEffect(() => {
		// Autoplay Configuration
		const autoplayInterval = setInterval(() => {
			nextSlide();
		}, autoplayDelay);

		// Update progress bar based on autoplay delay
		let progressValue = 0;
		const progressInterval = setInterval(() => {
			progressValue += (100 / autoplayDelay) * 100;
			setProgress(progressValue);
		}, 100);

		// Trigger animation
		setIsAnimating(true);

		// Clear the animation flag after a short delay (adjust the duration as needed)
		const animationDuration = autoplayDelay; // milliseconds
		const animationTimeout = setTimeout(() => {
			setIsAnimating(false);
		}, animationDuration);

		// Clear both intervals when the component unmounts
		return () => {
			clearInterval(autoplayInterval);
			clearInterval(progressInterval);
			clearTimeout(animationTimeout);
		};
	}, [currentIndex, autoplayDelay]);

	return (
		<section className="group relative  mb-8  mt-16 h-[450px] w-full  sm:h-[650px] lg:my-16 ">
			<figure
				className="relative   h-full  w-full items-center bg-cover bg-center duration-500"
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
			>
				<div className="flex h-5/6 w-full items-end bg-gradient-to-t from-black via-transparent px-5 pb-10 sm:h-full sm:w-1/2 sm:items-center sm:bg-gradient-to-r sm:via-black sm:pb-0">
					{isAnimating && (
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="font-barlow mb-6 text-3xl font-medium uppercase leading-tight sm:text-5xl">
								{slides[currentIndex].text}
							</h1>
							<p className="font-barlow font-light text-neutral-200">
								This season is the best season yet, so don’t miss out!
							</p>
							<div className="my-4">
								<Link href="/register">
									<Button>Register Now</Button>
								</Link>
							</div>
						</motion.div>
					)}
				</div>
				<div className="absolute bottom-0  w-full bg-gradient-to-t from-black via-black px-5 pb-10 pt-20">
					<div className="flex justify-between gap-5">
						{slides.map((slide, slideIndex) => (
							<div
								key={slideIndex}
								onClick={() => goToSlide(slideIndex)}
								className={`relative flex-1 cursor-pointer  text-xl  uppercase ${
									currentIndex === slideIndex ? "text-primary" : "text-gray-500"
								}`}
							>
								<Progress value={slideIndex === currentIndex ? progress : 0} />
								<p className="font-barlow hidden font-light sm:block">
									{slide.text}
								</p>
							</div>
						))}
					</div>
					<p className="font-barlow mt-5 block w-full sm:hidden">
						{" "}
						{slides[currentIndex].text}
					</p>
				</div>
			</figure>
		</section>
	);
}