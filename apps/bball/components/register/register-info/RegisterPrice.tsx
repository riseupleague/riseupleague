import React from "react";
import styles from "./RegisterPrice.module.css"; // Import CSS module

const RegisterPrice = () => {
	return (
		<section id="sbsr-1100" className={styles["sbsr-1100"]}>
			<div className={`${styles["cs-container"]} container mx-auto`}>
				<div className={styles["cs-image-group"]}>
					<picture
						className={`${styles["cs-picture"]} ${styles["cs-picture1"]}`}
					>
						<source
							media="(max-width: 600px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic18.jpg"
						/>
						<source
							media="(min-width: 601px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic18.jpg"
						/>
						<img
							loading="lazy"
							decoding="async"
							src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic18.jpg"
							alt="appliance"
							width="323"
							height="447"
						/>
					</picture>
					<picture
						className={`${styles["cs-picture"]} ${styles["cs-picture2"]}`}
					>
						<source
							media="(max-width: 600px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic19.jpg"
						/>
						<source
							media="(min-width: 601px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic19.jpg"
						/>
						<img
							loading="lazy"
							decoding="async"
							src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/mechanic19.jpg"
							alt="appliance"
							width="305"
							height="441"
						/>
					</picture>
					<img
						className={styles["cs-stripes"]}
						loading="lazy"
						decoding="async"
						src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/stripes-short.svg"
						alt="stripes"
						width="548"
						height="487"
						aria-hidden="true"
					/>
					{/* <img
						className={styles["cs-graphic"]}
						loading="lazy"
						decoding="async"
						src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/eclipses.svg"
						alt="stripes"
						width="140"
						height="140"
						aria-hidden="true"
					/> */}
				</div>
				<div className={styles["cs-content"]}>
					<span className={styles["cs-topper"]}>Mission & Vision</span>
					<h2 className={styles["cs-title"]}>
						Stitch Car Mechanics Mission & Vision
					</h2>
					<p className={styles["cs-text"]}>
						Our professionals will perform diagnostic tests, fluid flush and
						fills, engine replacement, oil changes, and total vehicle overhauls.
						Busto auctor lectus vitae conubia euismod nec rhoncus parturient
						convallis parturient accumsan volutpat ligula and intege aenean
						facilisis.
					</p>
					<ul className={styles["cs-ul"]}>
						<li className={styles["cs-li"]}>
							<h3 className={styles["cs-h3"]}>Mission Statement</h3>
							<p className={styles["cs-li-text"]}>
								Our Mission is to serve our customers and always deliver the
								highest level of customer service; to develop our team and
								strive to constantly improve; and to conduct ourselves in an
								environmentally responsible manner.
							</p>
						</li>
						<li className={styles["cs-li"]}>
							<h3 className={styles["cs-h3"]}>Our Vision</h3>
							<p className={styles["cs-li-text"]}>
								To be the world’s most exciting leader in automotive business
								intelligence solutions. We will generate excitement through
								implementing pioneering ideas, problem solving & going beyond
								our customers’ expectations.
							</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default RegisterPrice;
