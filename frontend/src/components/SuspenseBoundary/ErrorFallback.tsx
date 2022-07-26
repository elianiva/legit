import { Text, Button } from "@fluentui/react-components";
import type { FallbackProps } from "react-error-boundary";
import { useStyles } from "./styles";

export function ErrorFallback({ resetErrorBoundary, error }: FallbackProps) {
	const styles = useStyles();
	return (
		<div className={styles.container}>
			<Text size={400} weight="semibold">
				There was an error.
			</Text>
			<Text>{error.message}</Text>
			<Button onClick={() => resetErrorBoundary()}>Try Again</Button>
		</div>
	);
}
