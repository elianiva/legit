import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SuspenseBoundary } from "~/components/SuspenseBoundary";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			useErrorBoundary: true,
		},
	},
});

export function AppProvider(props: PropsWithChildren<{}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<SuspenseBoundary>
				<BrowserRouter>{props.children}</BrowserRouter>
			</SuspenseBoundary>
		</QueryClientProvider>
	);
}
