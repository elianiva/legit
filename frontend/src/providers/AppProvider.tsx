import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SuspenseBoundary } from "~/components/SuspenseBoundary";
import { globalTheme } from "~/themes/global";
import { http } from "~/utils/http";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			useErrorBoundary: true,
			queryFn: async (ctx) => {
				const [url] = ctx.queryKey;
				const response = await http(url as string, { method: "get" });
				return response;
			},
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
