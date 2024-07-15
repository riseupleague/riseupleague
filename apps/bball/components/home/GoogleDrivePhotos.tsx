import { Button } from "@ui/components/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";

const GoogleDrivePhotos = async () => {
	const session = await getServerSession();

	return (
		<div className="relative h-[250px] ">
			<div className="absolute inset-0">
				<Image
					src="/images/home/photos.jpg"
					alt="google drive photos"
					className="h-full w-full object-cover object-center"
					fill
				/>
				<div className="absolute inset-0 bg-black opacity-35"></div>
			</div>
			<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
				<h2 className="mb-4 mt-10 flex flex-col gap-3 text-xl font-bold leading-tight lg:gap-5 lg:text-5xl">
					<p className="text-xl lg:text-3xl">
						We upload your game photos every week! Dont forget to tag us!
					</p>
				</h2>

				<Button variant="default" asChild>
					<Link
						target="_blank"
						href={
							"https://drive.google.com/drive/u/1/folders/1bGVX8fo7WJwfx2IOEp_ZgEfHb21qsdx-"
						}
					>
						Check Photos
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default GoogleDrivePhotos;
