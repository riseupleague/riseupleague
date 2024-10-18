"use client";

import React, { useState } from "react";

import { Card, CardContent } from "@ui/components/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@ui/components/carousel";
const videos = [
	{ id: 1, title: "Video 1" },
	{ id: 2, title: "Video 2" },
	{ id: 3, title: "Video 3" },
	{ id: 4, title: "Video 4" },
	{ id: 5, title: "Video 5" },
	{ id: 6, title: "Video 6" },
	{ id: 7, title: "Video 7" },
	{ id: 8, title: "Video 8" },
	{ id: 9, title: "Video 9" },
	{ id: 10, title: "Video 10" },
];

export default function YoutubePlaylistViewer() {
	const [mainVideo, setMainVideo] = useState(videos[0]);

	return (
		<div className="bg-background w-full p-2 sm:p-4 md:p-6 lg:w-2/3">
			<h3 className="my-2 text-xl font-bold sm:my-4 sm:text-2xl">
				Latest Videos
			</h3>
			<div className="space-y-4 sm:space-y-6">
				<div className="aspect-video w-full">
					<iframe
						className="h-full w-full rounded-lg"
						src={`https://www.youtube.com/embed?listType=playlist&list=UU0nLmJcwp_7FzXT_rFV_fsg&index=${mainVideo.id}`}
						title={mainVideo.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-1">
						{videos.map((video) => (
							<CarouselItem key={video.id} className="basis-1/2 md:basis-1/4">
								<div className="p-0.5">
									<Card>
										<CardContent className="flex aspect-video items-center justify-center p-0">
											<div
												className={`relative aspect-video w-full overflow-hidden rounded-lg ${
													video.id === mainVideo.id ? "ring-primary ring-2" : ""
												}`}
											>
												<iframe
													className="h-full w-full"
													src={`https://www.youtube.com/embed?listType=playlist&list=UU0nLmJcwp_7FzXT_rFV_fsg&index=${video.id}&controls=0`}
													title={video.title}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												></iframe>
												<button
													className="focus:ring-primary absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2"
													onClick={() => setMainVideo(video)}
												>
													<span className="text-xs font-medium text-white sm:text-sm">
														{video.title}
													</span>
												</button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden sm:flex" />
					<CarouselNext className="hidden sm:flex" />
				</Carousel>
			</div>
		</div>
	);
}
