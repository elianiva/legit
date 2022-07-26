import { Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary, type ErrorBoundaryProps } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

type SuspenseBoundaryProps = Pick<ErrorBoundaryProps, "resetKeys">;

function PendingFallback() {
	return (
		<Stack horizontalAlign="center" verticalAlign="center">
			<Spinner size={SpinnerSize.medium} />
		</Stack>
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
