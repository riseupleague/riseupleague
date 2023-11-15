import ContactUs from "@/components/home/contact-us";

export default function ContactUsPage(): JSX.Element {
	return (
		<section className="container mx-auto min-h-[100dvh]">
			<h1 className="font-barlow mb-16 mt-8 text-center text-5xl font-medium uppercase">
				contact us
			</h1>

			<ContactUs />
		</section>
	);
}
