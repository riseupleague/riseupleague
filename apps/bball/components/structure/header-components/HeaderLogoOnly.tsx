import React from "react";
import Image from "next/image";
import Link from "next/link";
const HeaderLogoOnly = () => {
	return (
		<header className=" bg-neutral-900">
			<nav>
				<div className="container mx-auto grid grid-cols-3 py-4 lg:py-8">
					<div className="flex items-center justify-center lg:justify-start">
						<figure className="flex justify-center">
							<Link
								href="/"
								className="hidden transition hover:opacity-80 lg:inline-block"
							>
								<Image
									alt="Rise Up Logo"
									src="/images/riseup-logo.png"
									width={200}
									height={100}
									priority
								/>
							</Link>
							<Link href="/" className="transition hover:opacity-80 lg:hidden">
								<Image
									alt="Rise Up Logo"
									src="/images/logo.png"
									width={75}
									height={75}
									priority
								/>
							</Link>
						</figure>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default HeaderLogoOnly;
