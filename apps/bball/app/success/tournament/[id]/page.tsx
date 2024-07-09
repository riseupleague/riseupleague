import Link from "next/link";
import React from "react";

const TournamentSuccessPage = () => {
	return (
		<div className="h-screen ">
			<div className=" p-6  md:mx-auto">
				<svg
					viewBox="0 0 24 24"
					className="mx-auto my-6 h-16 w-16 text-green-600"
				>
					<path
						fill="currentColor"
						d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
					></path>
				</svg>
				<div className="text-center">
					<h1 className="mb-10 text-3xl md:text-5xl">
						Tournament Registration Successful 🎉
					</h1>
					<p className="mb-4">
						Your registration for Rise Up Basketball has been confirmed
						successfully. We are thrilled to have you on board for this
						tournament! Stay tuned for updates, news and more. If you have any
						questions, please don’t hesitate to send an email at
						riseupbballleague@gmail.com
					</p>
					<div className="py-10 text-center">
						<Link
							href="/user"
							className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500"
						>
							GO TO USER
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TournamentSuccessPage;
