import Image from "next/image";

export default function Hero(): JSX.Element {
	return (
		<section className="mb-8">
			<figure>
				<Image
					src="/images/home/hero.jpg"
					alt="Rise Up Hero Image"
					width={200}
					height={100}
					className="w-full"
				/>
			</figure>
			<div className="container mx-auto px-4">
				<h1 className="font-barlow mb-6 text-5xl font-medium uppercase leading-tight">
					register now for season 4
				</h1>
				<p className="font-barlow font-light text-neutral-200">
					This season is the best season yet, so don’t miss out!
				</p>
			</div>
		</section>
	);
}
