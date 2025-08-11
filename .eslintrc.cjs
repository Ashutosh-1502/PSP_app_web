// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
	overrides: [
		{
			extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: path.join(__dirname, "tsconfig.json"),
			},
			rules: {
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-return": "off",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
	},
	plugins: ["@typescript-eslint", "no-relative-import-paths"],
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
	rules: {
		// ✅ Disabling "any"-related rules
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-empty-interface": "off",
		"no-relative-import-paths/no-relative-import-paths": [
			"error",
			{ allowSameFolder: false, prefix: "@", rootDir: "src" },
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-misused-promises": "off",
	},
};

module.exports = config;
