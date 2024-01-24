import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";

const faqsData = [
	{
		question: "How do I register for the recreational basketball league?",
		answer:
			"To register for the Rise Up league, create a user or sign in, and fill out the registration form. Make sure to provide all the required information, including your contact details and any team preferences.",
	},
	{
		question: "What is the registration deadline for the upcoming season?",
		answer:
			"The registration deadline for the upcoming season is typically two weeks before the league begins. Be sure to check our website or contact us for the exact date and time.",
	},
	{
		question:
			"Can I join the league as an individual player, or do I need to be part of a team?",
		answer:
			"You can join the league as an individual player, and we'll do our best to place you on a team. If you already have a team or friends you'd like to play with, you can register as a team as well.",
	},
	// {
	// 	question: "What is the age group for the recreational basketball league?",
	// 	answer:
	// 		"Our league is open to players of all ages, but we typically have age divisions to ensure fair competition. These divisions may include youth, adults, and seniors, among others.",
	// },
	{
		question: "When and where are the games and practices held?",
		answer:
			"Games and practices (warm-ups) are usually scheduled on weekends and weekday evenings. The locations vary but are typically local gyms or community centers. We'll provide a detailed schedule before the season starts.",
	},
	{
		question: "What equipment do I need to participate in the league?",
		answer:
			"You'll need appropriate basketball attire, including basketball shoes, and a water bottle. We'll provide the game balls, but you may want to bring your own for practice sessions.",
	},
	{
		question:
			"Is there a fee to participate in the recreational basketball league?",
		answer:
			"Yes, there is a registration fee to cover league expenses, including court rentals, referees, and equipment. The exact fee will be provided during the registration process.",
	},
	{
		question: "How long does the basketball league season last?",
		answer:
			"The duration of the season can vary, but it typically runs for about 8 to 12 weeks, including regular season games and playoffs. Specific dates will be announced at the beginning of each season.",
	},
	{
		question: "Where can we pick up our jerseys before our first game?",
		answer:
			"Your jerseys will be given to you and your team ~20 minutes before your first game. Please find a volunteer at the scorers table and they will direct you to where you can find your jerseys.",
	},
	// Add more questions and answers as needed
];

export default function FaqSection(): JSX.Element {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<Accordion type="single" collapsible className="w-full">
				{faqsData.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
