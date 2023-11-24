"use client";

import Link from "next/link";
import { useState } from "react";

// import dynamic from "next/dynamic";
import Retro1 from "@/lib/jersey-designs/retro/retro-1";
import Retro2 from "@/lib/jersey-designs/retro/retro-2";
import Retro3 from "@/lib/jersey-designs/retro/retro-3";
import Retro4 from "@/lib/jersey-designs/retro/retro-4";

import Retro5 from "@/lib/jersey-designs/retro/retro-5";
import Retro6 from "@/lib/jersey-designs/retro/retro-6";
import Retro7 from "@/lib/jersey-designs/retro/retro-7";
import Retro8 from "@/lib/jersey-designs/retro/retro-8";
import Retro9 from "@/lib/jersey-designs/retro/retro-9";

const numberToComponent = {
	1: Retro1(),
	2: Retro2(),
	3: Retro3(),
	4: Retro4(),
	5: Retro5(),
	6: Retro6(),
	7: Retro7(),
	8: Retro8(),
	9: Retro9(),
};

export default function RetroJersey({ edition, number, team }) {
	const [primaryFillColor, setPrimaryFillColor] = useState("#ff0000"); // Default to red
	const [primaryStrokeColor, setPrimaryStrokeColor] = useState("#000000"); // Default to black
	const [secondaryFillColor, setSecondaryFillColor] = useState("#e66465"); // Default to a specific color
	const [secondaryStrokeColor, setSecondaryStrokeColor] = useState("#e66465"); // Default to a specific color
	const [tertiaryFillColor, setTertiaryFillColor] = useState("#f6b73c"); // Default to a specific color
	const [tertiaryStrokeColor, setTertiaryStrokeColor] = useState("#f6b73c"); // Default to a specific color

	const handleColorChange = (color, setType1, setType2, order) => {
		setType1(color);
		setType2(color);

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
				fill: ${tertiaryFillColor} !important;
			  }
			  .tertiaryColorStroke {
				stroke: ${tertiaryStrokeColor} !important;
			  }

			  .secondaryColorFill {
				fill: ${secondaryFillColor} !important;
			  }

			  .secondaryColorStroke {
				stroke: ${secondaryStrokeColor} !important;
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
					fill: ${primaryFillColor} !important;
				  }
				  .primaryColorStroke {
					  stroke: ${primaryStrokeColor} !important;
					}
					.tertiaryColorFill {
					  fill: ${tertiaryFillColor} !important;
					}
					.tertiaryColorStroke {
					  stroke: ${tertiaryStrokeColor} !important;
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
						fill: ${secondaryFillColor} !important;
					  }
		
					  .secondaryColorStroke {
						stroke: ${secondaryStrokeColor} !important;
					  }
					  .primaryColorFill {
						fill: ${primaryFillColor} !important;
					  }
					  .primaryColorStroke {
						  stroke: ${primaryStrokeColor} !important;
						}
				`;
		}
	};

	return (
		<>
			<Link
				href={`/jersey/${team._id}`}
				className="my-2 flex items-center gap-3 text-xl text-neutral-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="20"
					viewBox="0 0 15 20"
					fill="none"
				>
					<path
						d="M8.125 16.25L1.875 10L8.125 3.75"
						stroke="#ABAFB3"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Back
			</Link>
			<h3 className="mt-10  text-3xl uppercase ">
				{edition} {number}
			</h3>
			<style id="dynamicStyles"></style>
			<div className="mt-10 flex w-full flex-col gap-10 md:flex-row">
				{/* <div
					className="w-full"
					dangerouslySetInnerHTML={{ __html: numberToComponent[number] }}
				/> */}
				{numberToComponent[number]}

				<div className="w-full">
					<div className="mt-10 flex flex-wrap gap-5">
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#3498db] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#3498db",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#e74c3c] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#e74c3c",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#27ae60] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#27ae60",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#f39c12] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#f39c12",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#9b59b6] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#9b59b6",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#2ecc71] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#2ecc71",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#e67e22] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#e67e22",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#1abc9c] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#1abc9c",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#34495e] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#34495e",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
						<button
							className="font-barlow h-[25px] w-[25px] rounded-full bg-[#d35400] p-4 font-bold text-white md:w-full"
							onClick={() =>
								handleColorChange(
									"#d35400",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						></button>
					</div>

					<div className="mt-10">
						<input
							type="color"
							id="secondary"
							name="secondary"
							value={secondaryFillColor}
							onChange={(e) => {
								const newColor = e.target.value;

								const intervalId = setInterval(() => {
									handleColorChange(
										newColor,
										setSecondaryFillColor,
										setSecondaryStrokeColor,
										"secondary"
									);
								}, 500);

								// Clear the interval after 1 second to stop continuous updates
								setTimeout(() => {
									clearInterval(intervalId);
								}, 500);
							}}
						/>
					</div>

					<div className="mt-10">
						<input
							type="color"
							id="tertiary"
							name="tertiary"
							value={tertiaryFillColor}
							onChange={(e) => {
								const newColor = e.target.value;

								const intervalId = setInterval(() => {
									handleColorChange(
										newColor,
										setTertiaryFillColor,
										setTertiaryStrokeColor,
										"tertiary"
									);
								}, 1000);

								// Clear the interval after 1 second to stop continuous updates
								setTimeout(() => {
									clearInterval(intervalId);
								}, 1000);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
