import type { StyleObjectOrFn } from "@chakra-ui/react";
import { colours } from "./colour";
import { components } from "./components";
import { fonts } from "./font";

export const globalTheme = {
	styles: {
		global: {
			"html, body, #root": {
				height: "full",
			} as StyleObjectOrFn,
			body: {
				position: "relative",
				overflow: "hidden",
				backgroundImage: "/assets/background.jpg",
				backgroundPosition: "bottom",
				backgroundSize: "cover",
				backdropFilter: "blur(2.5rem)",
			} as StyleObjectOrFn,
			"body::before": {
				content: '""',
				position: "absolute",
				inset: 0,
				backgroundColor: "rgba(255, 255, 255, 0.8)",
			} as StyleObjectOrFn,
			"#root": {
				position: "relative",
				zIndex: 1,
			} as StyleObjectOrFn,
		},
	},
	components,
	...colours,
	...fonts,
};
