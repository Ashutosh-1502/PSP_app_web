/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	output: "standalone",

	/**
	 * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
	 * out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	// i18n: {
	// 	locales: ["en"],
	// 	defaultLocale: "en",
	// },

	images: {
		domains: [],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "randomuser.me",
				port: "",
				pathname: "/api/portraits/**",
			},
			{
				protocol: "https",
				hostname: "cloudflare-ipfs.com",
				port: "",
				pathname: "/ipfs/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/u/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "flagcdn.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "s3.amazonaws.com",
				pathname: "/redqteam.com/isomorphic-furyroad/public/**",
			},
		],
	},
};

export default config;
