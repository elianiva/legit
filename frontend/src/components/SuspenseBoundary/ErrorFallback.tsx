import { Button, Stack, Text } from "@chakra-ui/react";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
	return (
		<Stack align="center" h="full" justify="center" spacing="1rem">
			<Text fontSize="2xl">There was an error.</Text>
			<Text fontSize="md">{error.message}</Text>
			<Button onClick={() => resetErrorBoundary()}>Try Again</Button>
		</Stack>
	);
}
