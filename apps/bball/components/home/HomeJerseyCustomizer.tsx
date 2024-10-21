"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Star } from "lucide-react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@ui/components/carousel";
import { Button } from "@ui/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Create arrays for retro, classic, and original thumbnails as objects with name and url
const retroThumbnail = Array.from({ length: 3 }, (_, index) => ({
	name: `Retro ${index + 1}`,
	url: `/images/jersey/placeholders/retro/retro-${index + 1}.svg`,
}));

const classicThumbnail = [
	{
		name: "Classic 4",
		url: `/images/jersey/placeholders/classic/classic-4.svg`,
	},
	{
		name: "Classic 5",
		url: `/images/jersey/placeholders/classic/classic-5.svg`,
	},
	{
		name: "Classic 6",
		url: `/images/jersey/placeholders/classic/classic-6.svg`,
	},
];

const originalThumbnail = Array.from({ length: 3 }, (_, index) => ({
	name: `Original ${index + 1}`,
	url: `/images/jersey/placeholders/original/original-${index + 1}.svg`,
}));

// Combine all three arrays into one
const jerseyThumbnails = [
	...retroThumbnail,
	...originalThumbnail,
	...classicThumbnail,
];

const JerseyCarousel = ({ onSelect, selectedJersey }) => {
	return (
		<div className="relative">
			<Carousel className="mx-auto w-full max-w-5xl">
				<CarouselContent>
					{jerseyThumbnails.map((item, index) => {
						const isSelected = selectedJersey === index + 1;
						return (
							<CarouselItem key={index} className="basis-1/3 py-4 lg:basis-1/6">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`p-1 transition-transform duration-300 ${
										isSelected
											? "border-primary scale-105 border-4 shadow-lg"
											: "border border-gray-300"
									} rounded-lg`}
									onClick={() => onSelect(index + 1)}
								>
									{/* Display the name on top of the image */}
									<div className="mb-2 text-center">
										<h3
											className={`text-sm font-semibold transition-colors lg:text-lg ${
												isSelected ? "text-primary" : "text-gray-700"
											}`}
										>
											{item.name}
										</h3>
									</div>

									{/* Render the image */}
									<Image
										src={item.url}
										alt={`Jersey ${index + 1}`}
										width={250}
										height={150}
										className={`rounded-md transition-opacity ${
											isSelected ? "opacity-100" : "opacity-80"
										}`}
									/>
								</motion.div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r to-transparent" />
			<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent" />
			<div className="from-background pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t to-transparent p-2">
				<ChevronLeft className="text-primary h-6 w-6 animate-bounce" />
				<span className="mx-2 text-sm font-medium">Scroll to see more</span>
				<ChevronRight className="text-primary h-6 w-6 animate-bounce" />
			</div>
		</div>
	);
};

const ColorWheel = ({ color, onChange }) => {
	const canvasRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = canvas.width / 2 - 5;

		// Draw color wheel
		for (let angle = 0; angle < 360; angle++) {
			const startAngle = ((angle - 2) * Math.PI) / 180;
			const endAngle = ((angle + 2) * Math.PI) / 180;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();

			const gradient = ctx.createRadialGradient(
				centerX,
				centerY,
				0,
				centerX,
				centerY,
				radius
			);
			gradient.addColorStop(0, "white");
			gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
			ctx.fillStyle = gradient;
			ctx.fill();
		}

		// Draw center circle
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius * 0.2, 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
	}, [color]);

	const handleColorChange = (event) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		const angle = Math.atan2(y - centerY, x - centerX);
		const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
		const radius = canvas.width / 2 - 5;

		if (distance <= radius) {
			const hue = ((angle * 180) / Math.PI + 360) % 360;
			const saturation = Math.min(100, (distance / radius) * 100);
			const lightness = 50;
			onChange(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
		}
	};

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className="relative mx-auto h-48 w-48"
		>
			<canvas
				ref={canvasRef}
				width={200}
				height={200}
				className="cursor-pointer"
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={() => setIsDragging(false)}
				onMouseLeave={() => setIsDragging(false)}
				onMouseMove={(e) => isDragging && handleColorChange(e)}
				onClick={handleColorChange}
			/>
		</motion.div>
	);
};

const JerseyCustomizer = ({ selectedJersey, numberToComponent }) => {
	const [primaryColor, setPrimaryColor] = useState("#000"); // Default to a specific color

	const [secondaryColor, setSecondaryColor] = useState("#CE1141");
	const [tertiaryColor, setTertiaryColor] = useState("#fff");
	const [colors, setColors] = useState({
		primary: "black",
		secondary: "black",
		tertiary: "black",
	});
	const handleColorChange = (color, setColor, order) => {
		setColor(color);
		const styleElement = document.getElementById("dynamicStyles");
		if (styleElement && order === "primary") {
			styleElement.innerHTML = `
			.primaryColorFill {
			  fill: ${color} !important;
			}
			.primaryColorStroke {
				stroke: ${color} !important;
			  }
			  .tertiaryColorFill {
				fill: ${tertiaryColor} !important;
			  }
			  .tertiaryColorStroke {
				stroke: ${tertiaryColor} !important;
			  }

			  .secondaryColorFill {
				fill: ${secondaryColor} !important;
			  }

			  .secondaryColorStroke {
				stroke: ${secondaryColor} !important;
			  }
		`;
		} else if (styleElement && order === "secondary") {
			styleElement.innerHTML = `
				.secondaryColorFill {
					fill: ${color} !important;
				  }
	
				  .secondaryColorStroke {
					stroke: ${color} !important;
				  }
				  .primaryColorFill {
					fill: ${primaryColor} !important;
				  }
				  .primaryColorStroke {
					  stroke: ${primaryColor} !important;
					}
					.tertiaryColorFill {
					  fill: ${tertiaryColor} !important;
					}
					.tertiaryColorStroke {
					  stroke: ${tertiaryColor} !important;
					}
			`;
		} else if (styleElement && order === "tertiary") {
			styleElement.innerHTML = `
					.tertiaryColorFill {
						fill: ${color} !important;
					  }
					  .tertiaryColorStroke {
						stroke: ${color} !important;
					  }

					  .secondaryColorFill {
						fill: ${secondaryColor} !important;
					  }
		
					  .secondaryColorStroke {
						stroke: ${secondaryColor} !important;
					  }
					  .primaryColorFill {
						fill: ${primaryColor} !important;
					  }
					  .primaryColorStroke {
						  stroke: ${primaryColor} !important;
						}
				`;
		}
	};

	const primaryColors = {
		"#ffb3ba": "pastel-red",
		"#ffdfba": "pastel-orange",
		"#ffffba": "pastel-yellow",
		"#baffc9": "pastel-green",
		"#bae1ff": "pastel-blue",

		"#FF339C": "neon-pink",
		"#94FA00": "neon-lime",
		"#0DD4AB": "sea-green",
		"#02E1F3": "electric-blue",
		"#00F6B9": "bright-aqua",
		"#CA02FF": "bright-lavender-pink",

		"#58231E": "ruse-red",
		"#65704E": "olive-green",
		"#BEAA8A": "sand",
		"#0B4B4C": "moss",
		"#7F94A3": "slate-gray",

		"#0C7C99": "ocean-blue",
		"#F6B400": "sun-yellow",
		"#7F2977": "orchid-pink",
		"#82C59F": "palm-leaf-green",
		"#3E5A99": "dusk-blue",

		"#860038": "cavaliers-red",
		"#002B5C": "jazz-navy",
		"#007A33": "boston-green",
		"#552583": "lakers-photo",

		"#000000": "black",
		"#ffffff": "white",

		"#5EC2E1": "azure-blue",
		"#D7442A": "fiery-red",
		"#468950": "evergreen",
		"#CC995A": "beige",
		"#5784C5": "sky-blue",
	};

	const colorButtons = Object.entries(primaryColors).map(
		([hexValue, colorName]) => {
			return (
				<span
					key={hexValue}
					className={`font-barlow h-10 w-10 cursor-pointer rounded-full bg-[${hexValue}] relative p-4 font-bold text-white sm:h-8 sm:w-8 md:w-full lg:h-10 lg:w-10`}
					style={{ backgroundColor: `${hexValue}` }}
					onClick={() =>
						handleColorChange(hexValue, setPrimaryColor, "primary")
					}
				></span>
			);
		}
	);

	return (
		<div className="mt-8 flex flex-col gap-8 md:flex-row">
			<div className="flex-1">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex items-center justify-center rounded-lg "
				>
					<style id="dynamicStyles">
						{`.primaryColorFill {
			  fill: ${primaryColor} !important;
			}
			.primaryColorStroke {
				stroke: ${primaryColor} !important;
			  }
			  .tertiaryColorFill {
				fill: ${tertiaryColor} !important;
			  }
			  .tertiaryColorStroke {
				stroke: ${tertiaryColor} !important;
			  }

			  .secondaryColorFill {
				fill: ${secondaryColor} !important;
			  }

			  .secondaryColorStroke {
				stroke: ${secondaryColor} !important;
			  }`}
					</style>
					{numberToComponent[selectedJersey]}
				</motion.div>
			</div>
			<div className="flex-1">
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="primary">
						<AccordionTrigger>Primary Color</AccordionTrigger>
						<AccordionContent>
							<div className="mt-4 grid grid-cols-5 gap-5 sm:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10">
								{colorButtons}
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="secondary">
						<AccordionTrigger>Secondary Color</AccordionTrigger>
						<AccordionContent>
							<div className="mt-4">
								<ColorWheel
									color={colors.secondary}
									onChange={(value) => {
										handleColorChange(value, setSecondaryColor, "secondary");
										setColors({
											...colors,
											secondary: value,
										});
									}}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="tertiary">
						<AccordionTrigger>Tertiary Color</AccordionTrigger>
						<AccordionContent>
							<div className="mt-4">
								<ColorWheel
									color={colors.tertiary}
									onChange={(value) => {
										handleColorChange(value, setTertiaryColor, "tertiary");
										setColors({
											...colors,
											tertiary: value,
										});
									}}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className="mt-12 text-center">
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="mb-4 text-lg"
					>
						<strong>Act Fast!</strong> Primary colors are assigned on a
						first-come, first-served basis. Don&apos;t miss out on your
						team&apos;s signature look!
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<Button
							size="lg"
							className="bg-primary text-primary-foreground hover:bg-primary/90"
							asChild
						>
							<Link href="/register/create-team">
								<Star className="mr-2 h-5 w-5" />
								Secure Your Dream Jersey Now!
							</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default function HomeJerseyCustomizer({ numberToComponent }) {
	const [selectedJersey, setSelectedJersey] = useState(2);

	return (
		<div className="container mx-auto px-4 py-8">
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8 text-2xl font-bold"
			>
				Customize Your Basketball Jersey
			</motion.h1>
			<JerseyCarousel
				onSelect={setSelectedJersey}
				selectedJersey={selectedJersey}
			/>

			<JerseyCustomizer
				selectedJersey={selectedJersey}
				numberToComponent={numberToComponent}
			/>
		</div>
	);
}
