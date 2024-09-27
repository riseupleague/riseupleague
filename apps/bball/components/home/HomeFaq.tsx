import { faq } from "@/lib/data/faq";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";
import { Button } from "@ui/components/button";
import Link from "next/link";

const HomeFaq = (): JSX.Element => {
	const shortFaq = faq.slice(0, 3);

	return (
		<section className="font-barlow mb-16 flex flex-col text-neutral-100 md:flex-row md:gap-14 lg:mb-24">
			<div className="md:w-5/12">
				<h2 className="my-6 text-4xl lg:text-5xl">
					Frequently Asked Questions 🤔
				</h2>
				<p className="mb-12">
					Can’t find what you’re looking for? No worries, you can always contact
					us!
				</p>
				<Button variant="register2" size="register2" className="mb-4" asChild>
					<Link href="/faq">View Full FAQs</Link>
				</Button>
			</div>

			<div className="md:w-7/12">
				<Accordion type="single" collapsible className="w-full space-y-5">
					{shortFaq.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="data-[state=open]:border-primary hover:border-primary rounded-md border border-neutral-600 px-6 transition-all"
						>
							<AccordionTrigger className="data-[state=open]:text-primary w-11/12 text-xl">
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
	);
};

export default HomeFaq;
