import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
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
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools position="bottom-right" />
				<SuspenseBoundary>
					<BrowserRouter>{props.children}</BrowserRouter>
				</SuspenseBoundary>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
