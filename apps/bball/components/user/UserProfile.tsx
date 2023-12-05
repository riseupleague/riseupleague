"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";

export default function UserProfile({ session, user }): JSX.Element {
	const [selectedSection, setSelectedSection] = useState("overview");
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const [playerJerseyName, setPlayerJerseyName] = useState("");
	const [playerJerseyNumber, setPlayerJerseyNumber] = useState("");
	const [playerJerseySize, setPlayerJerseySize] = useState("");
	const [playerShortSize, setPlayerShortSize] = useState("");
	const [playerInstagram, setPlayerInstagram] = useState("");

	const [playerFormObject, setPlayerFormObject] = useState({
		instagram: "",
		jerseyName: "",
		jerseyNumber: "",
		jerseySize: "",
		shortSize: "",
	});

	const [jerseyNumberError, setJerseyNumberError] = useState("");

	const handleChosenPlayer = (player) => {
		const chosenPlayerFormObject = {
			instagram: playerInstagram || player?.instagram || "",
			jerseyName: playerJerseyName || player?.jerseyName || "",
			jerseyNumber: playerJerseyNumber || player?.jerseyNumber || "",
			jerseySize: playerJerseySize || player?.jerseySize || "",
			shortSize: playerShortSize || player?.shortSize || "",
		};
		setPlayerFormObject(chosenPlayerFormObject);
	};

	const handlePlayerInputChange = (field, value) => {
		setPlayerFormObject((prev) => ({ ...prev, [field]: value }));
	};

	const handleEditPlayer = async (id: string) => {
		const player = user.basketball.find((player) => player._id === id);
		const jerseyNumberExists = player.team.players.some((teammate) => {
			return teammate.jerseyNumber.toString() === playerFormObject.jerseyNumber;
		});

		if (jerseyNumberExists) {
			setJerseyNumberError(
				"Jersey number is already taken. Please choose a different number."
			);
			setIsLoader(false);
			return;
		} else {
			setJerseyNumberError("");
		}
		setIsLoader(true);

		const res = await fetch("/api/update-player", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...playerFormObject, playerId: id }),
		});

		if (res.ok) {
			const { player } = await res.json();
			console.log(player);
			setPlayerJerseyName(player.jerseyName);
			setPlayerJerseyNumber(player.jerseyNumber);
			setPlayerJerseySize(player.jerseySize);
			setPlayerShortSize(player.shortSize);
			setPlayerInstagram(player.instagram);
			const chosenPlayerFormObject = {
				instagram: player?.instagram || "",
				jerseyName: player?.jerseyName || "",
				jerseyNumber: player?.jerseyNumber || "",
				jerseySize: player?.jerseySize || "",
				shortSize: player?.shortSize || "",
			};

			setPlayerFormObject(chosenPlayerFormObject);
			setIsLoader(false);
		}
	};
	console.log(playerFormObject);

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 640); // Adjust the threshold as needed
		};

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Call handleResize on chosen mount
		handleResize();

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const handleNavClick = (sectionId) => {
		setSelectedSection(sectionId);
	};

	const profileNav = [
		{
			id: "overview",
			label: "Overview",
			component: (
				<>
					{user.basketball.length > 0 ? (
						<div className="flex w-full flex-col gap-10 ">
							{user.basketball.map((player) => {
								const jerseyEdition = player.team.jerseyEdition;
								let edition; // Assuming team.jerseyEdition is a string like "retro-1", "original-1", or "classic-1"
								if (jerseyEdition) {
									edition = jerseyEdition.split("-")[0];
								}

								// Dynamic import of the component
								const DynamicComponent = dynamic(
									() =>
										import(`@/lib/jersey-designs/${edition}/${jerseyEdition}`),
									{
										loading: () => <p>Loading...</p>, // Component to show while loading
										ssr: false, // Set to false if you want to disable server-side rendering for this component
									}
								);
								return (
									<div
										key={player._id}
										className="flex w-full flex-col gap-10  lg:flex-row"
									>
										<ul className=" w-full   border-neutral-600 bg-neutral-700 lg:w-1/2">
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Season:</span>
												<span>{player.season.seasonName}</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Division:</span>
												<span>{player.division?.divisionName}</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Location:</span>
												<span>{player.division?.location}</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Date and Time:</span>
												<span>
													{player.division?.day} between{" "}
													{player.division?.startTime} and{" "}
													{player.division?.endTime}
												</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Team:</span>
												<span>{player.team.teamName}</span>
											</li>
											{player.jerseyName && player.jerseyName !== "" && (
												<li className="flex flex-col justify-between border-b border-t border-neutral-600 p-4">
													<div className="flex justify-between">
														<span>Custom Jersey Name:</span>
														<span className="uppercase">
															{playerJerseyName !== ""
																? playerJerseyName
																: player.jerseyName}
														</span>
													</div>
												</li>
											)}
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Instagram:</span>
												<span>
													{playerInstagram !== ""
														? playerInstagram
														: player.instagram}
												</span>
											</li>
											<li className="border-b border-t border-neutral-600 p-4">
												<div className="flex justify-between ">
													<span>Jersey Number:</span>
													<span>
														{playerJerseyNumber !== ""
															? playerJerseyNumber
															: player.jerseyNumber}
													</span>
												</div>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Jersey Edition:</span>
												<span>{player.team.jerseyEdition}</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Jersey Top:</span>
												<span>
													{playerJerseySize !== ""
														? playerJerseySize
														: player.jerseySize}
												</span>
											</li>
											<li className="flex justify-between border-b border-t border-neutral-600 p-4">
												<span>Jersey Bottom:</span>
												<span>
													{playerShortSize !== ""
														? playerShortSize
														: player.shortSize}
												</span>
											</li>
											<li className="flex flex-col justify-end  border-b border-t border-neutral-600 p-4">
												<Sheet>
													<SheetTrigger asChild>
														{isLoader ? (
															<Button type="submit">
																<Loader2 className="mr-2 h-4 w-4 animate-spin" />
															</Button>
														) : (
															<Button
																onClick={() => handleChosenPlayer(player)}
															>
																Edit Player
															</Button>
														)}
													</SheetTrigger>
													<SheetContent
														side={isSmallScreen ? "bottom" : "right"} // Use dynamic side based on screen size
														className={`w-full bg-neutral-900 ${
															isSmallScreen ? "h-[85%]" : ""
														}`}
													>
														<SheetHeader>
															<SheetTitle className="font-barlow text-2xl uppercase">
																Edit Player
															</SheetTitle>
														</SheetHeader>
														<SheetDescription>
															<div className="mt-10 flex flex-col gap-4">
																{player.jerseyName &&
																	player.jerseyName !== "" && (
																		<div className="flex flex-col gap-3">
																			<Label
																				htmlFor="jerseyName"
																				className="uppercase"
																			>
																				Custom Jersey Name
																			</Label>
																			<Input
																				className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
																				value={playerFormObject.jerseyName}
																				onChange={(e) =>
																					handlePlayerInputChange(
																						"jerseyName",
																						e.target.value
																					)
																				}
																				id="jerseyName"
																			/>
																		</div>
																	)}
																<div className="flex flex-col gap-3">
																	<Label
																		htmlFor="jerseyNumber"
																		className="uppercase"
																	>
																		Jersey Number
																	</Label>
																	<Input
																		className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
																		value={playerFormObject?.jerseyNumber}
																		onChange={(e) =>
																			handlePlayerInputChange(
																				"jerseyNumber",
																				e.target.value
																			)
																		}
																		id="jerseyNumber"
																	/>
																</div>
																<div className="flex flex-col gap-3">
																	<Label className="uppercase">
																		{" "}
																		Jersey Size
																	</Label>
																	<select
																		onChange={(e) =>
																			handlePlayerInputChange(
																				"jerseySize",
																				e.target.value
																			)
																		}
																		id="jerseySize"
																		value={playerFormObject?.jerseySize}
																		className="rounded border border-neutral-600 bg-neutral-900 p-2"
																	>
																		<option value="SM">SM</option>
																		<option value="MD">MD</option>
																		<option value="LG">LG</option>
																		<option value="XL">XL</option>
																		<option value="XXL">XXL</option>
																		<option value="XXXL">XXXL</option>
																		<option value="XXXXL">XXXXL</option>
																	</select>
																</div>
																<div className="flex flex-col gap-3">
																	<Label
																		htmlFor="shortSize"
																		className="uppercase"
																	>
																		Short Size
																	</Label>

																	<select
																		onChange={(e) =>
																			handlePlayerInputChange(
																				"shortSize",
																				e.target.value
																			)
																		}
																		id="shortSize"
																		value={playerFormObject?.shortSize}
																		className="rounded border border-neutral-600 bg-neutral-900 p-2"
																	>
																		<option value="SM">SM</option>
																		<option value="MD">MD</option>
																		<option value="LG">LG</option>
																		<option value="XL">XL</option>
																		<option value="XXL">XXL</option>
																		<option value="XXXL">XXXL</option>
																		<option value="XXXXL">XXXXL</option>
																	</select>
																</div>
																<div className="flex flex-col gap-3">
																	<Label
																		htmlFor="shortSize"
																		className="uppercase"
																	>
																		Instagram
																	</Label>
																	<Input
																		className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
																		value={playerFormObject?.instagram}
																		onChange={(e) =>
																			handlePlayerInputChange(
																				"instagram",
																				e.target.value
																			)
																		}
																		id="instagram"
																	/>
																</div>
															</div>
														</SheetDescription>
														<SheetFooter className="mt-10 flex gap-2">
															<SheetClose asChild>
																<Button
																	onClick={() => handleEditPlayer(player._id)}
																>
																	Submit
																</Button>
															</SheetClose>
														</SheetFooter>
													</SheetContent>
												</Sheet>
												<p className="text-primary  mt-2 text-sm">
													{jerseyNumberError}
												</p>
											</li>
										</ul>
										{jerseyEdition && jerseyEdition !== "" ? (
											<div className="w-full border-neutral-600 bg-neutral-700 lg:w-1/2">
												<style id="styleElement">
													{`.primaryColorFill {
								  			fill: ${player.team.primaryColor} !important;
											}
								.primaryColorStroke {
									stroke: ${player.team.primaryColor} !important;
								  }
								  .tertiaryColorFill {
									fill: ${player.team.tertiaryColor} !important;
								  }
								  .tertiaryColorStroke {
									stroke: ${player.team.tertiaryColor} !important;
								  }
					
								  .secondaryColorFill {
									fill: ${player.team.secondaryColor} !important;
								  }
					
								  .secondaryColorStroke {
									stroke: ${player.secondaryColor} !important;
								  }

								  .jerseyDiv {
									background-color: rgb(17 22 29 / var(--tw-bg-opacity));
								  }
							
								`}
												</style>
												<div className="flex flex-col">
													<h3 className="mt-10 flex items-center justify-center gap-2 text-center">
														{player.team.jerseyEdition}{" "}
														<Link
															className="text-sm underline"
															href={`/jersey/${player.team._id}`}
														>
															Edit
														</Link>
													</h3>
													<DynamicComponent />
													<div className=" m-4 flex justify-between rounded border border-neutral-600 p-4">
														<div className="font-barlow flex items-center gap-2 text-sm">
															<div
																className={`font-barlow h-2 w-2  rounded-full bg-[${player.team.primaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
																style={{
																	backgroundColor: `${player.team.primaryColor}`,
																}}
															></div>
															Primary
														</div>
														<div className="font-barlow flex items-center gap-2 text-sm">
															<div
																className={`font-barlow h-2 w-2  rounded-full bg-[${player.team.secondaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
																style={{
																	backgroundColor: `${player.team.secondaryColor}`,
																}}
															></div>
															Secondary
														</div>
														<div className="font-barlow flex items-center gap-2 text-sm">
															<div
																className={`font-barlow h-2 w-2  rounded-full bg-[${player.team.tertiaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
																style={{
																	backgroundColor: `${player.team.tertiaryColor}`,
																}}
															></div>
															Tertiary
														</div>
													</div>
												</div>
											</div>
										) : (
											<>
												<div className="flex h-96 flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
													<div>
														<h3 className=" text-2xl font-semibold uppercase ">
															Team Jersey
														</h3>
														<Separator
															orientation="horizontal"
															className="mb-3 mt-1 bg-white"
														/>{" "}
														<p>
															Customize your team jersey. You decide your own
															colors and designs!
														</p>
													</div>
													<Link
														className="w-full"
														href={`/jersey/${player.team._id}`}
													>
														<Button className="font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
															Continue
														</Button>
													</Link>
												</div>
											</>
										)}
									</div>
								);
							})}
						</div>
					) : (
						<div className="flex h-96 flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
							<div>
								<h3 className=" text-2xl font-semibold uppercase ">
									Register Now
								</h3>
								<Separator
									orientation="horizontal"
									className="mb-3 mt-1 bg-white"
								/>{" "}
								<p>
									WINTER REGISTRATION NOW OPEN! Early Bird starting at $200+ per
									player!
								</p>
							</div>
							<Link className="w-full" href={`/register`}>
								<Button className="font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
									Continue
								</Button>
							</Link>
						</div>
					)}
				</>
			),
		},
		{
			id: "stats",
			label: "Stats",
			component: (
				<div className="font-barlow font-semibold uppercase ">
					No Statistics To Show.
				</div>
			),
		},
		{
			id: "previousGames",
			label: "Previous",
			// component: <PreviousGames player={player} />,
			component: (
				<div className="flex w-full flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px] lg:w-1/2">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							Team Schedule
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>You decide on what time your team will play in. </p>{" "}
					</div>
					<Button
						disabled
						className="font-barlow mt-16 rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Coming Soon
					</Button>
				</div>
			),
		},
	];

	// Find the currently selected section in the playerNav array
	const selectedNavItem = profileNav.find(
		(navItem) => navItem.id === selectedSection
	);

	return (
		<div className="flex flex-col gap-10 lg:flex-row">
			<div className="flex h-96 w-full flex-col border border-neutral-600 bg-neutral-700 p-5 lg:w-1/4">
				<h2 className="mb-10 text-center">{session.user.name}</h2>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<Label htmlFor="username" className="uppercase">
							Name
							<Sheet>
								<SheetTrigger asChild>
									{isLoader ? (
										<span className="h-[50px] w-[200px]">
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										</span>
									) : (
										<span>Edit Profile</span>
									)}
								</SheetTrigger>
								<SheetContent
									side={isSmallScreen ? "bottom" : "right"} // Use dynamic side based on screen size
									className={`w-full bg-neutral-900 ${
										isSmallScreen ? "h-[85%]" : ""
									}`}
								>
									<SheetHeader>
										<SheetTitle className="font-barlow text-2xl uppercase">
											Edit Profile
										</SheetTitle>
									</SheetHeader>
									<SheetDescription></SheetDescription>
									<SheetFooter className="mt-10 flex gap-2">
										<SheetClose asChild>
											<Button>Submit</Button>
										</SheetClose>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</Label>
						<Input
							className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
							value={session.user.name}
							disabled
							id="username"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<Label htmlFor="email" className="uppercase">
							Email
						</Label>
						<Input
							className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
							value={session.user.email}
							disabled
							id="email"
						/>
					</div>
				</div>
			</div>
			<div className="w-full lg:w-3/4">
				<ul className="no-scrollbar mb-10 flex overflow-x-auto border-b  border-neutral-600 lg:gap-3">
					{profileNav.map((navItem) => (
						<li
							className={`font-barlow flex-1 cursor-pointer  p-6 text-center text-sm font-semibold uppercase lg:text-lg ${
								selectedSection === navItem.id
									? "text-primary border-primary border-b-2"
									: "border-white text-white text-opacity-50"
							}`}
							key={navItem.id}
							onClick={() => handleNavClick(navItem.id)}
						>
							{navItem.label}
						</li>
					))}
				</ul>

				{selectedNavItem && selectedNavItem.component}
			</div>
		</div>
	);
}
