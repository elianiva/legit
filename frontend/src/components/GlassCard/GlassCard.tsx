import { Box, BoxProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export function GlassCard(props: PropsWithChildren<BoxProps>) {
	return (
		<Box
			bgGradient="linear(to-br, whiteAlpha.800 60%, whiteAlpha.600)"
			border="1px solid"
			borderColor="gray.200"
			px={6}
			py={4}
			rounded="lg"
			{...props}
		>
			{props.children}
		</Box>
	);
}
