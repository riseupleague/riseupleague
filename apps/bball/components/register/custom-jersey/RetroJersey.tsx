"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Button } from "@ui/components/button";

interface FormErrors {
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
}

export default function RetroJersey({
	edition,
	number,
	team,
	numberToComponent,
}) {
	const [primaryColor, setPrimaryColor] = useState(
		`${team.primaryColor && team.primaryColor !== "" ? team.primaryColor : ""}`
	); // Default to a specific color

	const oldPrimaryColor =
		team.primaryColor && team.primaryColor !== "" ? team.primaryColor : "";
	const [secondaryColor, setSecondaryColor] = useState(
		`${
			team.secondaryColor && team.secondaryColor !== ""
				? team.secondaryColor
				: ""
		}`
	);
	const [tertiaryColor, setTertiaryColor] = useState(
		`${
			team.tertiaryColor && team.tertiaryColor !== "" ? team.tertiaryColor : ""
		}`
	);

	useEffect(() => {
		if (team.primaryColor && team.primaryColor !== "") {
			const styleElement = document.getElementById("dynamicStyles");

			styleElement.innerHTML = `
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
	
				  .secondaryColorFill {
					fill: ${secondaryColor} !important;
				  }
	
				  .secondaryColorStroke {
					stroke: ${secondaryColor} !important;
				  }
			`;
		}
	}, []);

	const [formErrors, setFormErrors] = useState<FormErrors>({});

	const validateForm = (): FormErrors => {
		const errors: FormErrors = {};
		if (!primaryColor) {
			errors.primaryColor = "Primary color is required";
		}

		if (!secondaryColor) {
			errors.secondaryColor = "Secondary color is required";
		}

		if (!tertiaryColor) {
			errors.tertiaryColor = "Tertiary color is required";
		}

		const isColorInTeam = team.division.teamColors.includes(primaryColor);

		if (isColorInTeam) {
			errors.tertiaryColor =
				"Primary color is already selected by another team";
		}

		return errors;
	};

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

	const handleTeamColorUpdate = async (event: React.FormEvent) => {
		event.preventDefault();
		const errors = validateForm();
		console.log(errors);
		console.log(Object.keys(errors).length);
		if (Object.keys(errors).length === 0) {
			console.log("hello");
			const formObject = {
				teamId: team._id,
				divisionId: team.division._id,
				jerseyEdition: `${edition}-${number}`,
				primaryColor,
				secondaryColor,
				tertiaryColor,
				oldPrimaryColor,
			};
			const res = await fetch("/api/update-team-color", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formObject),
			});
		} else {
			console.log("hi");

			setFormErrors(errors);
		}
	};
	console.log("team:", team);

	const colors = {
		"#3498db": "Blue",
		"#e74c3c": "Red",
		"#27ae60": "Green",
		"#f39c12": "Orange",
		"#9b59b6": "Purple",
		"#2ecc71": "Turquoise",
		"#e67e22": "Carrot",
		"#1abc9c": "Turquoise",
		"#34495e": "Wet Asphalt",
		"#d35400": "Pumpkin",
	};

	const colorButtons = Object.entries(colors).map(([hexValue, colorName]) => {
		const isColorInTeam = team.division.teamColors.includes(hexValue);

		return (
			<span
				key={hexValue}
				className={`font-barlow h-10 w-10 rounded-full bg-[${hexValue}] relative p-4 font-bold text-white sm:h-8 sm:w-8 md:w-full lg:h-10 lg:w-10`}
				onClick={() => handleColorChange(hexValue, setPrimaryColor, "primary")}
			>
				{/* Add the red X as a pseudo-element */}
				{isColorInTeam && (
					// Add the red X as a pseudo-element
					<span className="absolute inset-0 -top-1 flex items-center justify-center text-5xl text-[red]">
						X
					</span>
				)}
			</span>
		);
	});

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

				<form onSubmit={handleTeamColorUpdate} className="w-full">
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1" className="border-0">
							<AccordionTrigger className="font-barlow rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl">
								Primary Color
							</AccordionTrigger>{" "}
							<AccordionContent>
								<div className="mt-10 grid grid-cols-5 gap-5 sm:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10">
									{colorButtons}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<div className="flex  items-center">
						<label className="font-barlow flex w-full items-center justify-between rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl">
							Secondary Color
							<input
								type="color"
								id="secondary"
								name="secondary"
								value={secondaryColor}
								onChange={(e) => {
									const newColor = e.target.value;
									handleColorChange(newColor, setSecondaryColor, "secondary");
								}}
							/>
						</label>
					</div>

					<div className="mt-2 flex  items-center">
						<label className="font-barlow flex w-full items-center justify-between rounded-md bg-neutral-700 px-[16px] py-[26px] text-2xl">
							Tertiary Color
							<input
								type="color"
								id="tertiary"
								name="tertiary"
								value={tertiaryColor}
								onChange={(e) => {
									const newColor = e.target.value;

									const intervalId = setInterval(() => {
										handleColorChange(newColor, setTertiaryColor, "tertiary");
									}, 1000);

									// Clear the interval after 1 second to stop continuous updates
									setTimeout(() => {
										clearInterval(intervalId);
									}, 1000);
								}}
							/>
						</label>
					</div>
					<div className="mt-20 flex w-full justify-end">
						<Button type="submit">Continue</Button>
					</div>

					{formErrors.primaryColor && (
						<p className="text-primary  rounded-md p-2">
							{formErrors.primaryColor}
						</p>
					)}
					{formErrors.secondaryColor && (
						<p className="text-primary  rounded-md p-2">
							{formErrors.secondaryColor}
						</p>
					)}
					{formErrors.tertiaryColor && (
						<p className="text-primary  rounded-md p-2">
							{formErrors.tertiaryColor}
						</p>
					)}
				</form>
			</div>
		</>
	);
}
