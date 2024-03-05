import React from "react";
import styles from "./RegisterServices.module.css"; // Import CSS module
import Link from "next/link";
import Image from "next/image";

const RegisterServices = () => {
	return (
		<section
			id={styles["services-1191"]}
			className={`${styles["cs-container"]} container mx-auto`}
		>
			<div className={styles["cs-content"]}>
				<span className={styles["cs-topper"]}>The Best Player Experience</span>
				<h2 className="font-abolition text-5xl">Why Join Rise Up League</h2>
				<p className={styles["cs-text"]}>
					At Rise Up, our primary focus is on enhancing your overall experience
					as a player.
				</p>
			</div>
			<div className={styles["cs-wrapper"]}>
				<div className={styles["cs-image"]}>
					<Image
						loading="lazy"
						decoding="async"
						src="/images/register/RegistrationRIseupLogo.jpg"
						alt="Rise Up Logo"
						width="510"
						height="193"
						aria-hidden="true"
					/>
				</div>
				<ul className={styles["cs-card-group"]}>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-trophy.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Championship & MVP Awards</h3>
							<p className={styles["cs-item-text"]}>
								Season champions earn rings (Beginner division take home
								medals), tees, and more. MVPs receive medals and a plaque.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-jersey.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Personalized Jerseys</h3>
							<p className={styles["cs-item-text"]}>
								Players receive custom jerseys and can pick from 30+ designs,
								colours, preferred number and custom name.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-stats.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>
								Full Player Profile & Team Stats
							</h3>
							<p className={styles["cs-item-text"]}>
								Accurate and live Stats to ensure the best player experience.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-highlights.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>
								Weekly Video Highlights, Photos & Graphics
							</h3>
							<p className={styles["cs-item-text"]}>
								We post full game coverage, graphics of player of the games, and
								highlights every week.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-schedule.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>Set Your Own Schedules</h3>
							<p className={styles["cs-item-text"]}>
								Once your team is registered and has a full roster, you can
								schedule your games.
							</p>
						</div>
					</li>
					<li className={styles["cs-item"]}>
						<picture className={styles["cs-picture"]}>
							<Image
								className={styles["cs-icon"]}
								src="/images/register/register-rules.svg"
								loading="lazy"
								decoding="async"
								alt="icon"
								width="33"
								height="38"
								aria-hidden="true"
							/>
						</picture>
						<div className={styles["cs-text-group"]}>
							<h3 className={styles["cs-h3"]}>
								Quality Competition & Officiating Officials
							</h3>
							<p className={styles["cs-item-text"]}>
								Compete against players of similar skill levels. Rest assured,
								all our games are officiated to prioritize player safety and
								ensure the quality of each game.
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div className="my-8 flex justify-center">
				<Link
					className="font-barlow mt-10  rounded bg-neutral-100 px-12 py-2 text-center font-semibold uppercase text-neutral-900 transition hover:bg-neutral-200"
					href="/register"
				>
					Register Now
				</Link>
			</div>
		</section>
	);
};

export default RegisterServices;
