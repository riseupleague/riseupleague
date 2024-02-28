import React from "react";
import styles from "./RegisterCards.module.css"; // Import CSS module

const RegisterCards = () => {
	return (
		<section
			id={styles["services-1644"]}
			className={`${styles["services-1644"]} container mx-auto`}
		>
			<div className={`${styles["cs-container"]} cs-container`}>
				<div className={`${styles["cs-content"]} cs-content`}>
					<span className={`${styles["cs-topper"]} cs-topper`}>
						Our Services
					</span>
					<h2 className={`${styles["cs-title"]} cs-title`}>
						What We Provide To Our Customer
					</h2>
					<p className={`${styles["cs-text"]} cs-text`}>
						Designed to maintain your current colour, blend out a growing root
						or balance your blonde while providing full and demi-permanent
						coverage.
					</p>
				</div>
				<ul className={`${styles["cs-card-group"]} cs-card-group`}>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div className={`${styles["cs-image-group"]} cs-image-group`}>
							<img
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/checkmark-circle-gold.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>100% Success Rate</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								We provide some of the finest quality, most responsive and
								reliable, and cost effective services and solutions.
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div className={`${styles["cs-image-group"]} cs-image-group`}>
							<img
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/dashboard-gold.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>
								Expert Legal Services
							</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Fortune 500 companies to smaller and medium-sized companies to
								help manage risks to as low as reasonably practical.
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div className={`${styles["cs-image-group"]} cs-image-group`}>
							<img
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/Lifebuoy-gold.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Business Strategy</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Highly experienced staff of more than 100 professionals
								averaging 29+ years in industry and hands-on knowledge.
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div className={`${styles["cs-image-group"]} cs-image-group`}>
							<img
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/Like-gold.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Highly Recommend</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Highly experienced staff of more than 100 professionals
								averaging 29+ years in industry and hands-on knowledge.
							</p>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default RegisterCards;
