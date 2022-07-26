import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
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

const useStyles = makeStyles({
	app: {
		height: "100%",
	},
});

export function AppProvider(props: PropsWithChildren<{}>) {
	const styles = useStyles();
	return (
		<FluentProvider className={styles.app} theme={webLightTheme}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools />
				<SuspenseBoundary>
					<BrowserRouter>{props.children}</BrowserRouter>
				</SuspenseBoundary>
			</QueryClientProvider>
		</FluentProvider>
	);
}
