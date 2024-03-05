import React from "react";
import styles from "./RegisterPrice.module.css"; // Import CSS module
import Image from "next/image";
import Link from "next/link";

const RegisterPrice = () => {
	return (
		<section id={styles["sbsr-1100"]} className={styles["sbsr-1100"]}>
			<div className={`${styles["cs-container"]} container mx-auto`}>
				<div className={styles["cs-image-group"]}>
					<div className={`${styles["cs-picture"]} ${styles["cs-picture1"]}`}>
						<Image
							loading="lazy"
							decoding="async"
							src="/images/register/RegisterPrice1.jpg"
							alt="appliance"
							width="323"
							height="447"
						/>
					</div>
					<div className={`${styles["cs-picture"]} ${styles["cs-picture2"]}`}>
						<Image
							loading="lazy"
							decoding="async"
							src="/images/register/RegisterPrice2.jpg"
							alt="appliance"
							width="323"
							height="447"
						/>
					</div>

					<Image
						className={styles["cs-stripes"]}
						loading="lazy"
						decoding="async"
						src="/images/register/RegisterPriceStripes.svg"
						alt="appliance"
						width="548"
						height="487"
					/>
				</div>
				<div className={styles["cs-content"]}>
					{/* <span className={styles["cs-topper"]}>Mission & Vision</span> */}
					<h2 className="font-abolition text-5xl">Register Now</h2>
					<p className={styles["cs-text"]}>
						Play in the league with the best player experience!
					</p>
					<ul className={styles["cs-ul"]}>
						<li className={styles["cs-li"]}>
							<h3 className={styles["cs-h3"]}>
								Early Bird Price: $210 + Tax Per player OR sign up as a team for
								only $2000 tax included.
							</h3>
							<p className={styles["cs-li-text"]}>
								Early Bird Opens: Feb 23, 2024 at 9:00 PM
							</p>
							<p className={styles["cs-li-text"]}>
								Early Bird Closes: Mar. 8, 2024 at 11:59 PM
							</p>
						</li>
						<li className={styles["cs-li"]}>
							<p className={styles["cs-li-text"]}>
								Regular Price is $235 + tax per player.{" "}
							</p>
						</li>
					</ul>
					<Link
						href="/register?info=true"
						className="font-barlow mt-10 block rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
					>
						Register Now
					</Link>
				</div>
			</div>
		</section>
	);
};

export default RegisterPrice;
