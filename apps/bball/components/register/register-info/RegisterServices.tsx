import React from "react";
import styles from "./RegisterServices.module.css"; // Import CSS module
import Link from "next/link";

const RegisterServices = () => {
	return (
		<section
			id={styles["services-1191"]}
			className={`${styles["cs-container"]} container mx-auto`}
		>
			<div className={styles["cs-content"]}>
				<span className={styles["cs-topper"]}>Other services</span>
				<h2 className={styles["cs-title"]}>
					We Provide Quality Auto Repair Services
				</h2>
				<p className={styles["cs-text"]}>
					Facilisis condimentum viverra scelerisque ac morbi sit sed. Turpis
					sagittis in blandit eleifend tortor ullamcorper eu placerat. Et orci
					felis volutpat, etiam vitae egestas volutpat pulvinar.
				</p>
			</div>
			<div className={styles["cs-wrapper"]}>
				<picture className={styles["cs-image"]}>
					<source
						media="(max-width: 600px)"
						srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/nice-car.png"
					/>
					<source
						media="(min-width: 601px)"
						srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/nice-car.png"
					/>
					<img
						loading="lazy"
						decoding="async"
						src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/nice-car.png"
						alt="car"
						width="510"
						height="193"
						aria-hidden="true"
					/>
				</picture>
				<ul className={styles["cs-card-group"]}>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/engineering%201%20red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Check Engine Light</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/brake-red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Brake Repair Service</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/air-conditioner-red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>AC Repair Service</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/motor%201%20red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Oil Filter Change</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/alloy-wheel-red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Changing Wheel</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<img
								className={styles["cs-icon"]}
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/contamination-red.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Emissions Repair</h3>
							<p className={styles["cs-item-text"]}>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
					</li>
				</ul>
			</div>
			<Link
				href="/register"
				className="font-barlow mt-10 block rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
			>
				Register Now
			</Link>
		</section>
	);
};

export default RegisterServices;
