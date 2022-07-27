import type { ComponentStyleConfig } from "@chakra-ui/react";

export const components = {
	Table: {
		sizes: {
			custom: {
				td: {
					px: "0",
					py: "2",
					fontSize: "sm",
					lineHeight: "4",
				},
			},
		},
	} as ComponentStyleConfig,
};
