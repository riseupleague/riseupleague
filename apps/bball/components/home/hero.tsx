"use client";

import { Progress } from "@ui/components/progress";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SignInDialog from "../auth/SignInDialog";
import { heroSlides } from "@/lib/data/home/heroSlides";

const Hero = (): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [progress, setProgress] = useState(0); // Initialize the progress at 100%
	const [isAnimating, setIsAnimating] = useState(false);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? heroSlides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === heroSlides.length - 1;
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

	const [open, setOpen] = useState(false);

	// Function to open the dialog
	const openDialog = () => {
		setOpen(true);
	};

	const { status, data: session } = useSession();

	return (
		<section className="group relative mb-8 mt-16 h-[450px] w-full sm:h-[650px] lg:my-16">
			<div
				className="repeat-0 relative h-full w-full items-center bg-cover bg-center duration-500"
				style={{ backgroundImage: `url(${heroSlides[currentIndex].url})` }}
			>
				<div className="flex h-5/6 w-full items-end bg-opacity-80 bg-gradient-to-t from-black via-transparent px-5 pb-10 sm:h-full sm:w-1/2 sm:items-center sm:bg-gradient-to-r sm:via-black sm:pb-0">
					{isAnimating && (
						<motion.div
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-left">{heroSlides[currentIndex].title}</h1>
							<p>{heroSlides[currentIndex].description}</p>
							<div className="relative z-10 my-4">
								{heroSlides[currentIndex].link === "/register?info=true" ? (
									<>
										{!session || !session.user ? (
											<Button onClick={openDialog}>
												{heroSlides[currentIndex].cta}
											</Button>
										) : (
											<Link
												href={heroSlides[currentIndex].link}
												target="_blank"
											>
												{heroSlides[currentIndex].cta !== "" ? (
													<Button>{heroSlides[currentIndex].cta}</Button>
												) : (
													""
												)}
											</Link>
										)}
									</>
								) : (
									<Link href={heroSlides[currentIndex].link} target="_blank">
										{heroSlides[currentIndex].cta !== "" ? (
											<Button>{heroSlides[currentIndex].cta}</Button>
										) : (
											""
										)}
									</Link>
								)}
							</div>
						</motion.div>
					)}
				</div>
				<div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black px-5 pb-10 pt-20">
					<div className="flex justify-between gap-5">
						{heroSlides.map((slide, slideIndex) => (
							<div
								key={slideIndex}
								onClick={() => goToSlide(slideIndex)}
								className={`relative flex-1 cursor-pointer text-xl uppercase ${
									currentIndex === slideIndex ? "text-primary" : "text-gray-500"
								}`}
							>
								<Progress value={slideIndex === currentIndex ? progress : 0} />
								<p className="font-barlow hidden font-light sm:block">
									{slide.title}
								</p>
							</div>
						))}
					</div>
					<p className="font-barlow mt-5 block w-full sm:hidden">
						{heroSlides[currentIndex].title}
					</p>
				</div>
			</div>
			{/* Dialog component */}

			<SignInDialog open={open} onOpenChange={setOpen} />
		</section>
	);
};

export default Hero;
