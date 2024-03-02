import styles from "./RegisterQuestions.module.css"; // Import CSS module
import Image from "next/image";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
const RegisterQuestions = () => {
	const faqItems = [
		{
			question: "Season Length",
			answer:
				"8 weeks, consisting of 7 regular-season games and 1 quarter-final game guaranteed.",
		},
		{
			question: "Playoffs",
			answer:
				"Semi-final and final games are played depending if your team wins or loses",
		},
		{
			question: "Game Format",
			answer: "Two 20 min halves with a 2 minute half-time",
		},
		{
			question: "Price",
			answer:
				"The registration fee for participation in the league, which may vary depending on factors such as early registration discounts, league amenities, and location.",
		},
		{
			question: "Custom Jerseys",
			answer:
				"Players can choose from 30 different jersey designs and customize the primar, secondary, and tertiary colors. Note*: Primary colors are first come first serve.",
		},
		{
			question: "Team Sizes",
			answer:
				"The number of players allowed on each team, typically ranging from 9 to 12 players per team. The minimum players required in a roster is 9.",
		},
		{
			question: "Refund Policy",
			answer:
				"The league's policy regarding refunds for registration fees, which may vary based on factors such as the timing of withdrawal, league cancellation, or other unforeseen circumstances.",
		},
	];

	return (
		<section
			id={styles["faq-1108"]}
			className={`${styles["faq-1108"]} container mx-auto`}
		>
			<div>
				<div className="flex flex-col">
					<h2 className="font-abolition mb-10 text-5xl">
						More Info about this season{" "}
					</h2>
					<div className="flex w-full flex-col gap-10 md:flex-row">
						<Image
							className={`${styles["cs-icon"]} cs-icon`}
							loading="lazy"
							decoding="async"
							src="/images/register/RegisterQuestion.jpg"
							alt="icon"
							width="400"
							height="200"
							aria-hidden="true"
						/>

						<Accordion type="single" collapsible className="w-full">
							{faqItems.map((item, index) => (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger className="font-barlow text-xl md:text-3xl">
										{" "}
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="text-md font-barlow md:text-xl">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterQuestions;
