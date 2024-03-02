import React from "react";
import styles from "./RegisterCTABanner.module.css"; // Import CSS module
import Link from "next/link";
import Image from "next/image";

const RegisterCTABanner = () => {
	return (
		<section
			id={styles["cta-1693"]}
			className={`${styles["cta-1693"]} container mx-auto`}
		>
			<div className={`${styles["cs-container"]} cs-container`}>
				<div className={`${styles["cs-content"]} cs-content`}>
					<h2 className={`${styles["cs-title"]} cs-title`}>
						Have Doubts? Get Your Queries Solved by Our Experts
					</h2>

					<Link
						href="/register"
						className="font-barlow mt-10 block rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Register Now
					</Link>
				</div>
			</div>
			<div className={`${styles["cs-wrapper"]} cs-wrapper`}>
				<Image
					className={`${styles["cs-graphic"]} ${styles["cs-graphic-1"]} cs-graphic cs-graphic-1`}
					src="/images/register/register-cta-logo.svg"
					alt="logo"
					height="372"
					width="372"
					loading="lazy"
					decoding="async"
				/>

				<Image
					className={`${styles["cs-graphic"]} ${styles["cs-graphic-2"]} cs-graphic cs-graphic-2`}
					src="/images/register/register-cta-logo.svg"
					alt="logo"
					height="372"
					width="372"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</section>
	);
};

export default RegisterCTABanner;
