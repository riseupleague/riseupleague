const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"../../packages/ui/components/**/*.{ts,tsx}",
	],
	theme: {
		fontFamily: {
			subsets: ["latin"],
			oswald: ["Oswald"],
			inter: ["Inter"],
			barlow: ["Barlow"],
			abolition: ["Abolition"],
		},
		colors: {
			primary: "#ff422e",
			primaryDark: "#e8341c", // A slightly darker shade of your primary color
			secondary: "#202328",
			neutral: {
				50: "#fafbfc",
				100: "#fefefe",
				200: "#dfe2e6",
				300: "#abafb3",
				350: "#798394",
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
		container: {
			padding: "16px",
		},
		extend: {
			fontFamily: {
				oswald: ["var(--font-oswald)"],
				inter: ["var(--font-inter)"],
				barlow: ["var(--font-barlow)"],
				abolition: ["var(--font-abolition)"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
