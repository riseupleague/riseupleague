import styles from "./RegisterCards.module.css"; // Import CSS module
import Image from "next/image";

const RegisterCards = () => {
	return (
		<section
			id={styles["services-1644"]}
			className={`${styles["services-1644"]} container mx-auto`}
		>
			<div className={`${styles["cs-container"]} cs-container`}>
				<div className={`${styles["cs-content"]} cs-content`}>
					{/* <span className={`${styles["cs-topper"]} cs-topper`}>
						Our Services
					</span> */}
					<h2 className="font-abolition text-5xl">Skill Divisions </h2>
					<p className={`${styles["cs-text"]} cs-text`}>
						Explore our divisions to find the perfect fit for you. See which one
						aligns best with your skills and preferences.
					</p>
				</div>
				<ul className={`${styles["cs-card-group"]} cs-card-group`}>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div
							className={`${styles["cs-image-group"]} cs-image-group flex justify-center`}
						>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex text-center`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Beginner</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								<span className="block">
									Looking to play organized ball for the first time? Then this
									level is for you.
								</span>
								<span className="block">
									**This division is for beginners only! You will be moved up a
									level based on your skill level.
								</span>
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div
							className={`${styles["cs-image-group"]} cs-image-group flex justify-center gap-2`}
						>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex text-center`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Intermediate </h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Perfect for players who has a basic knowledge of the sport and
								ready to improve their game.
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div
							className={`${styles["cs-image-group"]} cs-image-group flex justify-center gap-2`}
						>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterStar.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex text-center`}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Great</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Advanced level for dedicated players aiming to improve their
								game.
							</p>
						</div>
					</li>
					<li className={`${styles["cs-item"]} cs-item`}>
						<div
							className={`${styles["cs-image-group"]} cs-image-group flex justify-center`}
						>
							<Image
								className={`${styles["cs-icon"]} cs-icon`}
								loading="lazy"
								decoding="async"
								src="/images/register/RegisterCrown.svg"
								alt="icon"
								width="48"
								height="48"
								aria-hidden="true"
							/>
						</div>
						<div className={`${styles["cs-flex"]} cs-flex text-center `}>
							<h2 className={`${styles["cs-h2"]} cs-h2`}>Elite</h2>
							<p className={`${styles["cs-item-text"]} cs-item-text`}>
								Reserved for players that demands exceptional skills and intense
								competition. This division offers opportunities for elite-level
								training and exposure.
							</p>
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default RegisterCards;
