// import dynamic from "next/dynamic";
import Retro1 from "@/lib/jersey-designs/retro/retro-1";
import Retro2 from "@/lib/jersey-designs/retro/retro-2";
import Retro3 from "@/lib/jersey-designs/retro/retro-3";
import Original1 from "@/lib/jersey-designs/original/original-1";
import Original2 from "@/lib/jersey-designs/original/original-2";
import Original3 from "@/lib/jersey-designs/original/original-3";
import Classic4 from "@/lib/jersey-designs/classic/classic-4";
import Classic5 from "@/lib/jersey-designs/classic/classic-5";
import Classic6 from "@/lib/jersey-designs/classic/classic-6";
import HomeJerseyCustomizer from "./HomeJerseyCustomizer";

const HomeJersey = async (): Promise<JSX.Element> => {
	const numberToComponent = {
		1: Retro1(),
		2: Retro2(),
		3: Retro3(),
		4: Original1(),
		5: Original2(),
		6: Original3(),
		7: Classic4(),
		8: Classic5(),
		9: Classic6(),
	};

	return <HomeJerseyCustomizer numberToComponent={numberToComponent} />;
};

export default HomeJersey;
