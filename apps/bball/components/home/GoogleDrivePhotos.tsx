import { Button } from "@ui/components/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GoogleDrivePhotos = async () => {
	return (
		<section className="relative mb-16 flex h-[250px] flex-col items-center justify-center lg:mb-24">
			<Image
				src="/images/home/photos.jpg"
				alt="Google Drive Photos Image"
				className="absolute object-cover object-center opacity-30"
				fill
			/>

			<div className="z-10 flex h-full flex-col items-center justify-center text-center">
				<h3 className="mb-4 mt-10 flex max-w-4xl flex-col gap-3 text-lg font-bold leading-tight lg:gap-5 lg:text-3xl">
					We upload your game photos every week! Dont forget to tag us!
				</h3>

				<Button variant="register2" size="register2" asChild>
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
		</section>
	);
};

export default GoogleDrivePhotos;
