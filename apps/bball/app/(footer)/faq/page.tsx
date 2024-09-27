import { Metadata } from "next";
import { faq } from "@/lib/data/faq";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";

const FAQ = (): JSX.Element => {
	return (
		<section className="container mx-auto">
			<section className="font-barlow mb-8 flex flex-col text-neutral-100 md:flex-row md:gap-14">
				<div className="md:w-5/12">
					<h1 className="my-6 text-4xl lg:text-5xl">
						Frequently Asked Questions 🤔
					</h1>
					<p className="mb-12">
						Can’t find what you’re looking for? No worries, you can always
						contact us!
					</p>
				</div>

				<div className="md:w-7/12">
					<Accordion type="single" collapsible className="w-full space-y-5">
						{faq.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="data-[state=open]:border-primary rounded-md border border-neutral-600 px-6"
							>
								<AccordionTrigger className="data-[state=open]:text-primary w-11/12 text-xl transition-all">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="font-inter w-11/12">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | FAQs",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default FAQ;
