"use client";
import React, { useState } from "react";
import styles from "./RegisterQuestions.module.css"; // Import CSS module

const RegisterQuestions = () => {
	const [open, setOpen] = useState(0);

	const handleClick = (index) => {
		setOpen(index);
	};
	const faqItems = [
		{
			question: "Do you have experience with car like mine?",
			answer:
				"In the U.S., the terms lawyer and attorney are often used interchangeably...",
		},
		{
			question: "What is your plan cancellation policy?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		},
		{
			question: "What professional certifications you have?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		},
		{
			question: "What professional certifications you have?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		},
		{
			question: "How much air pressure should I put my tires?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		},
	];
	return (
		<section
			id={styles["faq-1108"]}
			className={`${styles["faq-1108"]} container mx-auto`}
		>
			<div className={[styles["cs-container"], "cs-container"].join(" ")}>
				<div className={[styles["cs-content"], "cs-content"].join(" ")}>
					<span className={[styles["cs-topper"], "cs-topper"].join(" ")}>
						FAQ’s
					</span>
					<h2 className={[styles["cs-title"], "cs-title"].join(" ")}>
						Frequently Asked Questions
					</h2>
					<picture className={[styles["cs-picture"], "cs-picture"].join(" ")}>
						{/* Mobile Image */}
						<source
							media="(max-width: 600px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/mechanic23.jpg"
						/>
						{/* Tablet and above Image */}
						<source
							media="(min-width: 601px)"
							srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/mechanic23.jpg"
						/>
						<img
							loading="lazy"
							decoding="async"
							src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/mechanic23.jpg"
							alt="appliance"
							width="522"
							height="400"
						/>
					</picture>
				</div>
				<div className={[styles["cs-flex-group"], "cs-flex-group"].join(" ")}>
					<ul className={[styles["cs-faq-group"], "cs-faq-group"].join(" ")}>
						{/* Active class added as default */}

						{faqItems.map((item, index) => (
							<li
								key={index}
								className={`${styles["cs-faq-item"]} cs-faq-item ${open === index ? styles["active"] : ""}`}
							>
								<button
									onClick={() => handleClick(index)}
									className={[styles["cs-button"], "cs-button"].join(" ")}
								>
									<span
										className={[
											styles["cs-button-text"],
											"cs-button-text",
										].join(" ")}
									>
										{item.question}
									</span>
								</button>
								<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
									{item.answer}
								</p>
							</li>
						))}

						{/* <li
							className={[
								styles["cs-faq-item"],
								"cs-faq-item",
								styles.active,
							].join(" ")}
						>
							<button className={[styles["cs-button"], "cs-button"].join(" ")}>
								<span
									className={[styles["cs-button-text"], "cs-button-text"].join(
										" "
									)}
								>
									Do you have experience with car like mine?
								</span>
							</button>
							<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
								In the U.S., the terms lawyer and attorney are often used
								interchangeably. A lawyer provides legal services such as giving
								legal advice, writing legal documents and providing policy
								counsel to governments. An attorney, on top of these things also
								holds a state or regional license to represent clients in a law
								court.
							</p>
						</li>
						<li className={[styles["cs-faq-item"], "cs-faq-item"].join(" ")}>
							<button className={[styles["cs-button"], "cs-button"].join(" ")}>
								<span
									className={[styles["cs-button-text"], "cs-button-text"].join(
										" "
									)}
								>
									What is your plan cancellation policy?
								</span>
							</button>
							<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
								convallis nunc neque, bibendum pulvinar vitae commodo velit.
								Proin diam tortor sed malesuada nunc, habitant. Dignissim ipsum
								porta enim, magna urna, quam.
							</p>
						</li>
						<li className={[styles["cs-faq-item"], "cs-faq-item"].join(" ")}>
							<button className={[styles["cs-button"], "cs-button"].join(" ")}>
								<span
									className={[styles["cs-button-text"], "cs-button-text"].join(
										" "
									)}
								>
									What professional certifications you have?
								</span>
							</button>
							<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
								convallis nunc neque, bibendum pulvinar vitae commodo velit.
								Proin diam tortor sed malesuada nunc, habitant. Dignissim ipsum
								porta enim, magna urna, quam.
							</p>
						</li>
						<li className={[styles["cs-faq-item"], "cs-faq-item"].join(" ")}>
							<button className={[styles["cs-button"], "cs-button"].join(" ")}>
								<span
									className={[styles["cs-button-text"], "cs-button-text"].join(
										" "
									)}
								>
									What professional certifications you have?
								</span>
							</button>
							<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
								convallis nunc neque, bibendum pulvinar vitae commodo velit.
								Proin diam tortor sed malesuada nunc, habitant. Dignissim ipsum
								porta enim, magna urna, quam.
							</p>
						</li>
						<li className={[styles["cs-faq-item"], "cs-faq-item"].join(" ")}>
							<button className={[styles["cs-button"], "cs-button"].join(" ")}>
								<span
									className={[styles["cs-button-text"], "cs-button-text"].join(
										" "
									)}
								>
									How much air pressure should I put my tires?
								</span>
							</button>
							<p className={[styles["cs-item-p"], "cs-item-p"].join(" ")}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
								convallis nunc neque, bibendum pulvinar vitae commodo velit.
								Proin diam tortor sed malesuada nunc, habitant. Dignissim ipsum
								porta enim, magna urna, quam.
							</p>
						</li> */}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default RegisterQuestions;
