"use client";

import { Button } from "@ui/components/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Users, MapPin, Layers, Flag } from "lucide-react"; // Import icons
const HomeRegister = (): JSX.Element => {
	const { data: session } = useSession();

	// useEffect(() => {
	// 	if (navigator.userAgent.includes("Instagram"))
	// 		redirect("/instagram-redirect");
	// }, []);

	return (
		<section className="relative mb-16 flex h-[600px] flex-col items-center justify-center bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent text-center">
			<div className="container mx-auto min-h-fit">
				<Image
					src="/images/tournament/tournament-of-power-banner.jpg"
					alt="Hero Image"
					className="absolute -z-10 object-cover object-center opacity-40"
					fill
				/>

				<h1 className="animate-fadeIn text-4xl font-bold text-white lg:mx-auto lg:w-[800px] lg:text-5xl lg:leading-[50px]">
					Join the Best Basketball League
				</h1>

				<p className="animate-slideUp mx-auto mb-8 max-w-[700px] text-lg font-semibold text-gray-200 lg:text-xl">
					Play competitive games, meet new people, and dominate the court.
				</p>

				<Button
					variant="register2"
					size="register2"
					asChild
					className="bg-primaryDark hover:bg-primary animate-bounce rounded-md px-6 py-3 text-lg font-bold uppercase text-white shadow-lg transition-all duration-1000 ease-in-out lg:px-10 lg:py-4 lg:text-xl"
				>
					<Link href="/register">Claim Your Spot Now</Link>
				</Button>

				<p className="animate-fadeIn mt-4 text-sm font-semibold text-gray-300 lg:text-base">
					Spots are filling fast—Join today!
				</p>

				{/* Statistics Section with Icons */}
				<div className="animate-slideUp mt-8 grid grid-cols-2 gap-4 text-white lg:mx-auto lg:w-[600px] lg:grid-cols-4">
					<div className="flex flex-col items-center">
						<Users className="text-primary mb-2 h-10 w-10" /> {/* Icon */}
						<span className="text-primary text-3xl font-bold">1,000+</span>
						<span className="text-sm font-bold text-gray-300">
							Players this season
						</span>
					</div>
					<div className="flex flex-col items-center">
						<MapPin className="text-primary mb-2 h-10 w-10" /> {/* Icon */}
						<span className="text-primary text-3xl font-bold">5</span>
						<span className="text-sm font-bold text-gray-300">
							Cities Available
						</span>
					</div>
					<div className="flex flex-col items-center">
						<Layers className="text-primary mb-2 h-10 w-10" /> {/* Icon */}
						<span className="text-primary text-3xl font-bold">10+</span>
						<span className="text-sm font-bold text-gray-300">Divisions</span>
					</div>
					<div className="flex flex-col items-center">
						<Flag className="text-primary mb-2 h-10 w-10" /> {/* Icon */}
						<span className="text-primary text-3xl font-bold">100+</span>
						<span className="text-sm font-bold text-gray-300">Teams</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeRegister;
