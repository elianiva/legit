import { Text, DefaultButton, Stack } from "@fluentui/react";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
	return (
		<Stack horizontalAlign="center" verticalAlign="center">
			<Text variant="large">There was an error.</Text>
			<Text>{error.message}</Text>
			<DefaultButton onClick={() => resetErrorBoundary()}>Try Again</DefaultButton>
		</Stack>
	);
}
