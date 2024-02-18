"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { useSession } from "next-auth/react";
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

const ComparePopup = ({ player }) => {
	const [isLoader, setIsLoader] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [playerOne, setPlayerOne] = useState(player.playerName);
	const [playerTwo, setPlayerTwo] = useState(false);
	const [listOfPlayerTwos, setListOfPlayerTwos] = useState([]);

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
	return (
		<div className="my-10 w-full text-center">
			{/* <Sheet>
				<SheetTrigger asChild>
					{isLoader ? (
						<Button className="hover: border border-white  bg-neutral-900 text-white transition duration-300 ease-in-out hover:bg-white hover:text-black ">
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						</Button>
					) : (
						<Button className="hover: border border-white  bg-neutral-900 text-white transition duration-300 ease-in-out hover:bg-white hover:text-black ">
							Compare Player
						</Button>
					)}
				</SheetTrigger>
				<SheetContent
					side={isSmallScreen ? "bottom" : "right"} // Use dynamic side based on screen size
					className={`w-full bg-neutral-900 ${isSmallScreen ? "h-[85%]" : ""}`}
				>
					<SheetHeader>
						<SheetTitle className="font-barlow text-2xl uppercase">
							Compare Player
						</SheetTitle>
					</SheetHeader>
					<SheetDescription>
                    <div
						style={{ backgroundColor: "#18181A" }}
						className="rounded p-4"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="text-lg font-bold uppercase">Player Comparison</h2>
						<p className="mb-4 mt-0">Select two players to compare</p>
						<div className="player-one flex flex-col">
							<span>Player 1</span>
							<span>{playerOne}</span>
						</div>
						<div className="player-two mb-5 mt-3 flex flex-col">
							<span>Player 2</span>
							{playerTwo && (
								<div>
									<button className="mr-3" onClick={() => setPlayerTwo(false)}>
										x
									</button>
									<span>{playerTwo?.playerName}</span>
								</div>
							)}
							{!playerTwo && (
								<>
									<input
										type="text"
										placeholder="Type first 3 letters of name"
										onChange={handleSearchPlayerTwo}
										style={{ backgroundColor: "#18181A" }}
										className="mt-2 border border-white"
									/>
									<ul className="mt-3">
										{listOfPlayerTwos?.map((player) => (
											<li key={player.id}>
												<button onClick={() => setPlayerTwo(player)}>
													{player.playerName}
												</button>
											</li>
										))}
									</ul>
								</>
							)}
						</div>
						{playerTwo && (
							<Link
								href={`/compare/players?playerOne=${player._id}&playerTwo=${playerTwo._id}`}
								className="mx-auto w-full rounded border border-white px-4
                py-2 font-bold text-white"
							>
								Compare Players
							</Link>
						)}
					</div>

                    </SheetDescription>
					<SheetFooter className="mt-10 flex gap-2">
						<SheetClose asChild>
							<Link href={"/"}>Submit</Link>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet> */}
		</div>
	);
};

export default ComparePopup;
