"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { Dialog, DialogContent } from "@ui/components/dialog";
import { Trophy, Users } from "lucide-react";
import Link from "next/link";
import { promoBannerAction } from "@/actions/promoBannerAction";

export default function Component({ cookieSetter }: any) {
	const [isOpen, setIsOpen] = useState(false);
	const [cookieResult, setCookieResult] = useState(null);
	const cookieResultRef = useRef(null);

	const memoizedEffect = useCallback(() => {
		const setCookie = async () => await promoBannerAction();
		const timer = setTimeout(() => setIsOpen(true), 1000);

		setCookie().then((result) => {
			cookieResultRef.current = result;
			setCookieResult(result);
		});

		return () => clearTimeout(timer);
	}, []);

	useEffect(memoizedEffect, []);

	return (
		<div>
			{cookieResult && (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogContent className="overflow-hidden p-0 sm:max-w-[425px]">
						<Card className="w-full border-0">
							<CardContent className="p-0">
								<div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
									<div className="flex flex-col items-center space-y-4 text-center">
										<Trophy className="h-12 w-12 animate-bounce text-white" />
										<div>
											<h2 className="text-2xl font-bold text-white">
												Team Captains Special!
											</h2>
											<p className="text-white/90">
												Create your team now and score big savings
											</p>
										</div>
										<div className="rounded-lg bg-white/10 p-2">
											<span className="text-3xl font-bold text-white">
												50% OFF
											</span>
										</div>
										<Button
											asChild
											className="bg-white text-red-600 transition-colors duration-300 hover:bg-orange-100 hover:text-red-700"
										>
											<Link href="/register/create-team">
												<Users className="mr-2 h-4 w-4" /> Create Your Team
											</Link>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
