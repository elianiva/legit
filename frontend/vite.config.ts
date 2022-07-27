import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";

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
	],
});
