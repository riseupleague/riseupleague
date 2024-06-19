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
							src="/images/register/registerPrice1.jpg"
							alt="appliance"
							width="323"
							height="447"
						/>
					</div>
					<div className={`${styles["cs-picture"]} ${styles["cs-picture2"]}`}>
						<Image
							loading="lazy"
							decoding="async"
							src="/images/register/registerPrice2.jpg"
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
								Early Bird Price: $235 + Tax Per player OR sign up as a team for
								only $2200 tax included.
							</h3>
							<p className={styles["cs-li-text"]}>
								Early Bird Opens: June 17, 2024 at 9:00 PM
							</p>
							<p className={styles["cs-li-text"]}>
								Early Bird Closes: July 4, 2024 at 11:59 PM
							</p>
						</li>
						<li className={styles["cs-li"]}>
							<div className="mt-5">
								<p className="text-xl uppercase">Price Breakdown:</p>
								<p className="my-2">Gym Fee: $80 / eight to nine weeks</p>
								<p className="my-2">Uniforms: $50</p>
								<p className="my-2">Media: $55</p>
								<p className="my-2">Referees: $40</p>
								<p className="my-2">Stats/Game Videos/Graphics: $55</p>
								<p className="my-2">
									Regular Price Total: ${80 + 50 + 55 + 40 + 55}
								</p>
							</div>
						</li>
						{/* <li className={styles["cs-li"]}>
							<p className={styles["cs-li-text"]}>
								Instalment will be six payments of $50 + tax
							</p>
						</li> */}
					</ul>
					<p className="font-sm my-4">
						<span className="font-semibold">Registration Fee Allocation:</span>{" "}
						Upon immediate payment, $50
						<span className="text-sm"> + tax</span> will be allocated towards
						the jersey order, and another $50
						<span className="text-sm"> + tax</span> will be designated for gym
						fees. Please note that there will be no refunds for this
						transaction.
					</p>
					<Link
						href="/register"
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
