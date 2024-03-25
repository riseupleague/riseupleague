"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { convertMilitaryToRegularTime } from "@/utils/convertMilitaryToRegularTime";
import { Card, CardDescription, CardHeader } from "@ui/components/card";
import { useToast } from "@ui/components/use-toast";
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

const UserPlayerInfo = ({ player }) => {
	const { toast } = useToast();
	const [playerName, setPlayerName] = useState(player.playerName);

	const [playerJerseyName, setPlayerJerseyName] = useState(player.jerseyName);
	const [playerJerseyNumber, setPlayerJerseyNumber] = useState(
		player.jerseyNumber
	);
	const [playerJerseySize, setPlayerJerseySize] = useState(player.jerseySize);
	const [playerShortSize, setPlayerShortSize] = useState(player.shortSize);
	const [playerInstagram, setPlayerInstagram] = useState(player.instagram);
	const [isLoader, setIsLoader] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [playerFormObject, setPlayerFormObject] = useState({
		playerName: "",
		instagram: "",
		jerseyName: "",
		jerseyNumber: "",
		jerseySize: "",
		shortSize: "",
	});

	const [jerseyNumberError, setJerseyNumberError] = useState("");

	const handleChosenPlayer = (player) => {
		const chosenPlayerFormObject = {
			playerName: playerName || player?.playerName || "",

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

	const handleEditPlayer = async () => {
		const jerseyNumberExists = player.team?.players.some((teammate) => {
			return (
				teammate.jerseyNumber?.toString() === playerFormObject.jerseyNumber
			);
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
			body: JSON.stringify({ ...playerFormObject, playerId: player._id }),
		});

		if (res.ok) {
			const { newPlayer } = await res.json();

			setPlayerName(newPlayer.playerName);
			setPlayerJerseyName(newPlayer.jerseyName);
			setPlayerJerseyNumber(newPlayer.jerseyNumber);
			setPlayerJerseySize(newPlayer.jerseySize);
			setPlayerShortSize(newPlayer.shortSize);
			setPlayerInstagram(newPlayer.instagram);
			const chosenPlayerFormObject = {
				playerName: newPlayer?.playerName || "",
				instagram: newPlayer?.instagram || "",
				jerseyName: newPlayer?.jerseyName || "",
				jerseyNumber: newPlayer?.jerseyNumber || "",
				jerseySize: newPlayer?.jerseySize || "",
				shortSize: newPlayer?.shortSize || "",
			};

			setPlayerFormObject(chosenPlayerFormObject);
			setIsLoader(false);

			toast({
				variant: "success",
				title: "Success!",
				description: "Your have successfully updated your player information.",
			});
		}
	};

	const jerseyEdition = player.team?.jerseyEdition;
	let edition; // Assuming team.jerseyEdition is a string like "retro-1", "original-1", or "classic-1"
	if (jerseyEdition) edition = jerseyEdition.split("-")[0];

	// Dynamic import of the component
	const DynamicComponent = dynamic(
		() => import(`@/lib/jersey-designs/${edition}/${jerseyEdition}`),
		{
			loading: () => <div>Loading...</div>, // Component to show while loading
			ssr: false, // Set to false if you want to disable server-side rendering for this component
		}
	);

	const customizeJersey = player.register || player.freeAgent;

	return (
		<Card className="relative flex cursor-pointer flex-col justify-center border-0 bg-transparent">
			<CardHeader>
				<CardDescription className="font-barlow flex w-full flex-col-reverse gap-5 text-center font-normal uppercase lg:flex-row">
					<ul className=" h-full w-full border-neutral-600 bg-neutral-700 lg:w-1/2">
						{player.freeAgent && (
							<p className="my-4">Thank you for joining as a free agent!</p>
						)}
						<li className="flex justify-between border-b border-t border-neutral-600 p-4">
							<span>Player Name:</span>
							<span>{playerName}</span>
						</li>
						<li className="flex justify-between border-b border-t border-neutral-600 p-4">
							<span>Instagram:</span>
							<span>
								{playerInstagram !== "" ? playerInstagram : player.instagram}
							</span>
						</li>

						{!player.freeAgent && (
							<>
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
										{convertMilitaryToRegularTime(player.division?.startTime)}{" "}
										and {convertMilitaryToRegularTime(player.division?.endTime)}
									</span>
								</li>
								<li className="flex justify-between border-b border-t border-neutral-600 p-4">
									<span>Team:</span>
									<span>{player.team?.teamName}</span>
								</li>
								<li className="flex justify-between border-b border-t border-neutral-600 p-4">
									<span>Team Code:</span>
									<span>{player.team?.teamCode}</span>
								</li>
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
									<span>{player.team?.jerseyEdition}</span>
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
							</>
						)}

						{player.freeAgent && (
							<p className="text-md my-4 p-4 text-start">
								Jersey information coming soon!
							</p>
						)}

						<li className="flex flex-col justify-end  border-b border-t border-neutral-600 p-4">
							<Sheet>
								<SheetTrigger asChild>
									{isLoader ? (
										<Button type="submit">
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										</Button>
									) : (
										<Button onClick={() => handleChosenPlayer(player)}>
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
										<div className="mt-4 flex flex-col gap-4">
											<p className="text-sm text-neutral-500">
												Please note that there will be a deadline (TBD) to
												change your custom jersey information. After this
												deadline, we will not be able to change it. Stay tuned
												to our socials to be notified!
											</p>
											<div className="flex flex-col gap-3">
												<Label htmlFor="shortSize" className="uppercase">
													Player Name
												</Label>
												<Input
													className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
													value={playerFormObject?.playerName}
													onChange={(e) =>
														handlePlayerInputChange(
															"playerName",
															e.target.value
														)
													}
													id="playerName"
												/>
											</div>
											<div className="flex flex-col gap-3">
												<Label htmlFor="shortSize" className="uppercase">
													Instagram
												</Label>
												<Input
													className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
													value={playerFormObject?.instagram}
													onChange={(e) =>
														handlePlayerInputChange("instagram", e.target.value)
													}
													id="instagram"
												/>
											</div>

											{customizeJersey && (
												<>
													<div className="flex flex-col gap-3">
														<Label htmlFor="jerseyName" className="uppercase">
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

													<div className="flex flex-col gap-3">
														<Label htmlFor="jerseyNumber" className="uppercase">
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
														<Label className="uppercase"> Jersey Size</Label>
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
														<Label htmlFor="shortSize" className="uppercase">
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
												</>
											)}
										</div>
									</SheetDescription>
									<SheetFooter className="mt-10 flex gap-2">
										<SheetClose asChild>
											<Button onClick={handleEditPlayer}>Submit</Button>
										</SheetClose>
									</SheetFooter>
								</SheetContent>
							</Sheet>
							<p className="text-primary  mt-2 text-sm">{jerseyNumberError}</p>
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
									stroke: ${player.team.secondaryColor} !important;
								  }

								  .jerseyDiv {
									background-color: rgb(17 22 29 / var(--tw-bg-opacity));
								  }
							
								`}
							</style>
							<div className="flex flex-col">
								<h3 className="mt-10 flex items-center justify-center gap-2 text-center">
									{player.team.jerseyEdition}{" "}
									{/* {player.register && (
										<Link
											className="text-sm underline"
											href={`/jersey/${player.team._id}`}
										>
											Edit
										</Link>
									)} */}
									<Link
										className="text-sm underline"
										href={`/jersey/${player.team._id}`}
									>
										Edit
									</Link>
								</h3>
								<DynamicComponent />
								{player.team.primaryColor && (
									<div className=" m-4 flex justify-between rounded border border-neutral-600 p-4">
										<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
											<div
												className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.primaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
												style={{
													backgroundColor: `${player.team.primaryColor}`,
												}}
											></div>
											Primary
										</div>
										<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
											<div
												className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.secondaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
												style={{
													backgroundColor: `${player.team.secondaryColor}`,
												}}
											></div>
											Secondary
										</div>
										<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
											<div
												className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.tertiaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
												style={{
													backgroundColor: `${player.team.tertiaryColor}`,
												}}
											></div>
											Tertiary
										</div>
									</div>
								)}
							</div>
						</div>
					) : (
						<>
							{player.team && (
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
											Customize your team jersey. You decide your own colors and
											designs!
										</p>
									</div>
									<Link
										className="font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
										href={`/jersey/${player.team?._id}`}
									>
										Continue
									</Link>
								</div>
							)}
						</>
					)}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default UserPlayerInfo;
