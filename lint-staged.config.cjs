/** @type {import("lint-staged").Configuration} */
module.exports = {
	// this will check Typescript files
	"**/*.(ts|tsx)": () => "npx tsc --noEmit",

	// This will lint and format TypeScript and
	//JavaScript files
	"**/*.(ts|tsx|js|jsx)": (filenames) => [
		`npx eslint --resolve-plugins-relative-to ${filenames.map((file) => `"${file}"`).join(" ")}`,
		`npx prettier --write ${filenames.map((file) => `"${file}"`).join(" ")}`,
	],

	// This will format CSS, Markdown & JSON files
	"**/*.(css|scss|md|json)": (filenames) => [`npx prettier --write ${filenames.join(" ")}`],
};
