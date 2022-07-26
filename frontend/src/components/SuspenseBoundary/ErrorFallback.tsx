import { Text, Button } from "@fluentui/react-components";
import type { FallbackProps } from "react-error-boundary";
import { useStyles } from "./styles";

/**
 * Provides a fallback UI for when a query fails or when it's loading.
 */
export function ErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
	const styles = useStyles();
	return (
		<div className={styles.container}>
			<Text size={500} weight="semibold">
				There was an error.
			</Text>
			<Text>{error.message}</Text>
			<Button onClick={() => resetErrorBoundary()}>Try Again</Button>
		</div>
	);
}
