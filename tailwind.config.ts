import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		// './src/components/**/*.{js,ts,jsx,tsx,mdx}',
		// './src/app/**/*.{js,ts,jsx,tsx,mdx}',
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1920px",
			"4xl": "2560px",
		},
		extend: {
			fontFamily: {
				montserrat: ["var(--font-montserrat)"],
				lexend: ["var(--font-lexend)"],
				avenirNext: ["var(--font-avenirNext)"],
			},
			animation: {
				blink: "blink 1.4s infinite both;",
				"scale-up": "scaleUp 500ms infinite alternate",
				"spin-slow": "spin 4s linear infinite",
				popup: "popup 500ms var(--popup-delay, 0ms) linear 1",
				skeleton: "skeletonWave 1.6s linear 0.5s infinite",
				"spinner-ease-spin": "spinnerSpin 0.8s ease infinite",
				"spinner-linear-spin": "spinnerSpin 0.8s linear infinite",
			},
			backgroundImage: {
				skeleton: "`linear-gradient(90deg,transparent,#ecebeb,transparent)`",
				"skeleton-dark": "`linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`",
			},
			keyframes: {
				blink: {
					"0%": {
						opacity: "0.2",
					},
					"20%": {
						opacity: "1",
					},
					"100%": {
						opacity: "0.2",
					},
				},
				scaleUp: {
					"0%": {
						transform: "scale(0)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				popup: {
					"0%": {
						transform: "scale(0)",
					},
					"50%": {
						transform: "scale(1.3)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				skeletonWave: {
					"0%": {
						transform: "translateX(-100%)",
					},
					"50%": {
						transform: "translateX(100%)",
					},
					"100%": {
						transform: "translateX(100%)",
					},
				},
				spinnerSpin: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
			},
			content: {
				underline: 'url("/public/underline.svg")',
			},
			boxShadow: {
				profilePic: "0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card-foreground))",
					foreground: "hsl(var(--card))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover-foreground))",
					foreground: "hsl(var(--popover))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary-foreground))",
					foreground: "hsl(var(--primary))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary-foreground))",
					foreground: "hsl(var(--secondary))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted-foreground))",
					foreground: "hsl(var(--muted))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent-foreground))",
					foreground: "hsl(var(--accent))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive-foreground))",
					foreground: "hsl(var(--destructive))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/container-queries"),
		plugin(function ({ addVariant }) {
			// required this to prevent any style on readOnly input elements
			addVariant("not-read-only", "&:not(:read-only)");
		}),
		require("tailwindcss-animate"),
	],
} satisfies Config;
