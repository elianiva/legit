import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"~": resolve("src"),
		},
	},
	plugins: [
		react(),
		icons({
			compiler: "jsx",
			jsx: "react",
		}),
		// https://github.com/pd4d10/vite-plugin-svgr#options
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		svgr(),
	],
});
