import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/main.ts", // Your entry point
	output: {
		file: "./public/dist/bundle.js", // Bundle output file
		format: "iife", // Immediately Invoked Function Expression for browsers
		sourcemap: true,
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json",
		}),
	],
};
