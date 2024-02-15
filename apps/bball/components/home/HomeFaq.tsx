import { faq } from "@/lib/data/faq";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/components/accordion";

const HomeFaq = (): JSX.Element => {
	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">FAQs 🤔</h3>
			<hr />
			<Accordion type="single" collapsible className="w-full">
				{faq.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
};

export default HomeFaq;
