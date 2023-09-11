import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		fontFamily: {
			subsets: ["latin"],
			oswald: ["Oswald"],
			inter: ["Inter"],
		},
		extend: {
			fontFamily: {
				oswald: ["var(--font-oswald)"],
				inter: ["var(--font-inter)"],
			},
		},
	},
	plugins: [],
};
export default config;
