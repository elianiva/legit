import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SuspenseBoundary } from "~/components/SuspenseBoundary";
import { globalTheme } from "~/themes/global";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			useErrorBoundary: true,
		},
	},
});

const customTheme = extendTheme(globalTheme);

export function AppProvider(props: PropsWithChildren<{}>) {
	return (
		<ChakraProvider theme={customTheme}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools position="bottom-right" />
				<SuspenseBoundary>
					<BrowserRouter>{props.children}</BrowserRouter>
				</SuspenseBoundary>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
