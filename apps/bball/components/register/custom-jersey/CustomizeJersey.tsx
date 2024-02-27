"use client";

import Link from "next/link";
import { useState } from "react";

// import dynamic from "next/dynamic";
import Original2 from "@/lib/jersey-designs/original/original-2";
import Original3 from "@/lib/jersey-designs/original/original-3";
import Original5 from "@/lib/jersey-designs/original/original-5";
import Original6 from "@/lib/jersey-designs/original/original-5";
import Original7 from "@/lib/jersey-designs/original/original-6";
import Original8 from "@/lib/jersey-designs/original/original-8";

const numberToComponent = {
	2: Original2(),
	3: Original3(),
	5: Original5(),
	6: Original6(),
	7: Original7(),
	8: Original8(),
};

const CustomizeJersey = ({ edition, number, team }): JSX.Element => {
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
			<h3 className="mt-10 text-3xl font-medium uppercase ">
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
					<div className="mt-10 flex gap-5">
						<button
							className="font-barlow w-[250px] rounded bg-[red] p-4 font-bold text-black md:w-full"
							id="red"
							onClick={() =>
								handleColorChange(
									"#ff0000",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						>
							Red
						</button>
						<button
							className="font-barlow w-[250px] rounded bg-[blue] p-4 font-bold text-black md:w-full"
							id="blue"
							onClick={() =>
								handleColorChange(
									"#0000ff",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						>
							Blue
						</button>
						<button
							className="font-barlow w-[250px] rounded bg-[yellow] p-4 font-bold text-black md:w-full"
							id="yellow"
							onClick={() =>
								handleColorChange(
									"#ffff00",
									setPrimaryFillColor,
									setPrimaryStrokeColor,
									"primary"
								)
							}
						>
							Yellow
						</button>
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
};

export default CustomizeJersey;
