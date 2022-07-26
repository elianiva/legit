import { Spinner } from "@fluentui/react-components";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary, type ErrorBoundaryProps } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useStyles } from "./styles";

type SuspenseBoundaryProps = Pick<ErrorBoundaryProps, "resetKeys">;

function PendingFallback() {
	const styles = useStyles();
	return (
		<div className={styles.container}>
			<Spinner size="medium" />
		</div>
	);
}

export function SuspenseBoundary({ children, resetKeys }: PropsWithChildren<SuspenseBoundaryProps>) {
	const { reset } = useQueryErrorResetBoundary();
	return (
		<ErrorBoundary
			fallbackRender={(props) => <ErrorFallback {...props} />}
			onReset={() => reset()}
			resetKeys={resetKeys}
		>
			<Suspense fallback={<PendingFallback />}>{children}</Suspense>
		</ErrorBoundary>
	);
}
