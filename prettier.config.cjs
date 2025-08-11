/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
	endOfLine: "lf",
	semi: true,
	singleQuote: false,
	tabWidth: 2,
	trailingComma: "es5",
	printWidth: 120,
	arrowParens: "always",
	useTabs: true,
	bracketSpacing: true,
};

module.exports = config;
