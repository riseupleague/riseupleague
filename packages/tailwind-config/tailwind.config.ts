import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		fontFamily: {
			subsets: ["latin"],
			oswald: ["Oswald"],
			inter: ["Inter"],
			barlow: ["Barlow"],
		},
		colors: {
			primary: "#ff422e",
			secondary: "#202328",
			neutral: {
				100: "#fefefe",
				200: "#dfe2e6",
				300: "#abafb3",
				400: "#82878d",
				500: "#555b64",
				600: "#282d35",
				700: "#11161d",
				800: "#11161f",
				900: "#04080f",
			},
			black: colors.black,
			white: colors.white,
			gray: colors.slate,
			green: colors.emerald,
			purple: colors.violet,
			yellow: colors.amber,
			pink: colors.fuchsia,
		},
		extend: {
			fontFamily: {
				oswald: ["var(--font-oswald)"],
				inter: ["var(--font-inter)"],
				barlow: ["var(--font-barlow)"],
			},
		},
	},
	plugins: [],
};
export default config;
